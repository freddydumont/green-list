import * as yup from 'yup';
import FormPageLayout from './FormPageLayout';
import { Text } from '@theme-ui/components';
import { useContext } from 'react';
import { useService } from '@xstate/react';
import { ServiceContext } from '../pages';

type Availabilities =
  | 'seasonal'
  | 'betweenCourses'
  | 'courses'
  | 'dayZero'
  | 'remote';

export const availabilitySchema = yup.object().shape({
  availability: yup
    .array(
      yup
        .mixed<Availabilities>()
        .oneOf(['seasonal', 'betweenCourses', 'courses', 'dayZero', 'remote'])
    )
    .required(),
});

export type Availability = yup.InferType<typeof availabilitySchema>;

const FormPageAvailability = () => {
  const service = useContext(ServiceContext);
  const [state] = useService(service);

  return (
    <FormPageLayout
      title="Availabilities"
      description="If you'd like to make yourself available for certain periods, you can choose them below."
    >
      <Text sx={{ fontFamily: 'mono' }}>
        <pre>{JSON.stringify(state.context, null, 2)}</pre>
      </Text>
    </FormPageLayout>
  );
};

export default FormPageAvailability;
