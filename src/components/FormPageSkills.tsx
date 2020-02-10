import * as yup from 'yup';
import FormPageLayout from './FormPageLayout';
import { Text } from '@theme-ui/components';
import { useContext } from 'react';
import { useService } from '@xstate/react';
import { ServiceContext } from '../pages';
import isEqual from 'lodash/isEqual';

type Categories = 'kitchen' | 'maintenance' | 'technology' | 'accounting';
type SelectedSkills = Partial<{ [K in Categories]: Record<string, boolean> }>;

export const skillSchema = yup.object().shape({
  categories: yup.array(
    yup
      .mixed<Categories>()
      .oneOf(['kitchen', 'maintenance', 'technology', 'accounting'])
  ),
  skills: yup
    .mixed<SelectedSkills>()
    .test('skills', 'custom error message', function(
      this: yup.TestContext,
      skills: SelectedSkills
    ): boolean {
      // This is the whole form object that comes to the validation
      const formData = this?.options?.context as Skills;

      // TODO: validate when no category is selected
      // validation depends on the shape returned by react-hook-form
      // eg. no field at all vs `field: something`

      // the skills object should contain only and exactly the keys
      // that are selected in categories
      return isEqual(Object.keys(skills), formData.categories);

      // TODO: add validation for skills categories objects?
    }),
  other: yup.string().notRequired(),
  consent: yup.boolean(),
});

export type Skills = yup.InferType<typeof skillSchema>;

const FormPageSkills = () => {
  const service = useContext(ServiceContext);
  const [state] = useService(service);

  return (
    <FormPageLayout
      title="Interests and skills"
      description="Start by choosing your areas of interests"
    >
      <Text sx={{ fontFamily: 'mono' }}>
        <pre>{JSON.stringify(state.context, null, 2)}</pre>
      </Text>
    </FormPageLayout>
  );
};

export default FormPageSkills;
