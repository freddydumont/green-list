import * as yup from 'yup';
import FormPageLayout from './FormPageLayout';
import { useContext } from 'react';
import { useService } from '@xstate/react';
import { ServiceContext } from '../pages';
import { FormInputChoice, Form } from './FormComponents';
import { Divider } from '@theme-ui/components';
import { Flex } from 'theme-ui';
import FormNavButton from './FormNavButton';

type Availabilities =
  | 'seasonal'
  | 'betweenCourses'
  | 'courses'
  | 'dayZero'
  | 'remote';

const availabilities: Availabilities[] = [
  'seasonal',
  'betweenCourses',
  'courses',
  'dayZero',
  'remote',
];

export const availabilitySchema = yup.object().shape({
  availability: yup
    .array(yup.mixed<Availabilities>().oneOf(availabilities))
    .required(),
});

export type Availability = yup.InferType<typeof availabilitySchema>;

const FormPageAvailability = () => {
  const service = useContext(ServiceContext);
  const [, send] = useService(service);

  const onSubmit = (data: Availability) => {
    send({
      type: 'NEXT',
      data: {
        // there's a single field in this form, so we don't need the object
        // to wrap in the data
        availability: data.availability,
      },
    });
  };

  return (
    <FormPageLayout
      title="Availabilities"
      description="If you'd like to make yourself available for specific periods, you can choose them below."
    >
      <Form<Availability>
        onSubmit={onSubmit}
        validationSchema={availabilitySchema}
      >
        <FormInputChoice
          type="checkbox"
          label="Availabilities"
          name="availability"
          options={[
            { label: 'Seasonal work periods', value: 'seasonal' },
            { label: 'Between courses', value: 'betweenCourses' },
            { label: '10 day and 3 day courses', value: 'courses' },
            { label: 'Day 0', value: 'dayZero' },
            // could be displayed only for relevant skill categories
            { label: 'Remotely', value: 'remote' },
          ]}
        />

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

export default FormPageAvailability;
