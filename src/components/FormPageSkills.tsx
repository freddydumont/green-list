import * as yup from 'yup';
import FormPageLayout from './FormPageLayout';
import { Divider, Flex, Label, Checkbox } from '@theme-ui/components';
// import { useContext } from 'react';
// import { useService } from '@xstate/react';
// import { ServiceContext } from '../pages';
import isEqual from 'lodash/isEqual';
import {
  Form,
  FormInputChoice,
  FormField,
  FormInputChoiceBox,
} from './FormComponents';
import FormNavButton from './FormNavButton';
import { useFormContext, Controller } from 'react-hook-form';

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
    .notRequired()
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
  // const service = useContext(ServiceContext);
  // const [state, send] = useService(service);

  const onSubmit = (data: Skills) => {
    console.log(JSON.stringify(data, null, 2));

    // send({
    //   type: 'NEXT',
    //   data: {
    //     skills: data,
    //   },
    // });
  };

  return (
    <FormPageLayout
      title="Interests and skills"
      description="Choose your areas of interests in Dhamma service and select your skills if applicable"
    >
      <Form<Skills> onSubmit={onSubmit}>
        {/* validationSchema={skillSchema} */}
        <FormInputChoice
          type="checkbox"
          label="Areas of interest"
          name="categories"
          options={[
            { label: 'Kitchen', value: 'kitchen' },
            { label: 'Maintenance', value: 'maintenance' },
            { label: 'Technology', value: 'technology' },
            { label: 'Accounting', value: 'accouting' },
          ]}
        />

        <ConditionalCheckboxes />

        <FormField label="Other skills" name="other" />

        <FormInputChoice
          type="checkbox"
          name="consent"
          options={[
            {
              label: 'I consent to being contacted by committees',
            },
          ]}
        />

        <input type="submit" />

        <Divider mx={0} mt={0} mb={4} />
        <Flex
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <FormNavButton />
        </Flex>
      </Form>
    </FormPageLayout>
  );
};

const skillsData = {
  kitchen: [
    'question 1',
    'question 2',
    'question 3',
    'question 4',
    'question 5',
    'question 6',
    'question 7',
    'question 8',
  ],
  maintenance: [
    'painting',
    'plumbing',
    'carpentry',
    'electricity',
    'architecture',
    'etc',
  ],
  technology: ['sysadmin', 'software development', 'tech support', 'etc'],
  accounting: ['accounting', 'bookkeeping', 'etc'],
};

const ConditionalCheckboxes = () => {
  const { watch, control, register } = useFormContext<Skills>();

  if (watch('categories')?.includes('kitchen')) {
    return (
      <Controller
        as={FormInputChoiceBox}
        name="skills.kitchen"
        label="Kitchen questions"
        control={control}
      >
        {skillsData.kitchen.map((question, i) => (
          <Label key={question}>
            <Checkbox name={`skills.kitchen[${question}]`} ref={register} />
            {question}
          </Label>
        ))}
      </Controller>
    );
  }

  return null;
};

export default FormPageSkills;
