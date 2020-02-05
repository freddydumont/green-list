import * as yup from 'yup';
import FormPageLayout from './FormPageLayout';
import { Form, FormField, FormInputChoice } from './FormComponents';
import { Divider } from '@theme-ui/components';
import { Flex } from 'theme-ui';
import FormNavButton from './FormNavButton';
import { useContext } from 'react';
import { useService } from '@xstate/react';
import { ServiceContext } from '../pages';

export const userSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  dateOfBirth: yup.date().required(),
  gender: yup
    .mixed<'male' | 'female'>()
    .oneOf(['male', 'female'])
    .required(),
  location: yup.string().required(),
  phone: yup.string().required(),
  contactPreference: yup
    .array(
      yup.mixed<'email' | 'phone' | 'text'>().oneOf(['email', 'phone', 'text'])
    )
    .required(),
});

export type User = yup.InferType<typeof userSchema>;

const FormPageInfo = () => {
  const service = useContext(ServiceContext);
  const [, send] = useService(service);

  const onSubmit = (data: User) => {
    send({
      type: 'NEXT',
      data: {
        user: data,
      },
    });
  };

  return (
    <FormPageLayout
      title="Contact information"
      description="The information you provide here will allow us to identify and contact you."
    >
      <Form<User> onSubmit={onSubmit} validationSchema={userSchema}>
        <FormField label="First Name" name="firstName" />
        <FormField label="Last Name" name="lastName" />
        <FormField label="Email" name="email" type="email" />
        <FormField label="Date of birth" name="dateOfBirth" type="date" />

        <FormInputChoice
          type="radio"
          label="Gender"
          name="gender"
          options={[
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ]}
        />

        <FormField label="City" name="location" />
        <FormField label="Phone number" name="phone" type="tel" />

        <FormInputChoice
          type="checkbox"
          label="Contact preferences"
          name="contactPreference"
          options={[
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' },
            { label: 'Text', value: 'text' },
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

export default FormPageInfo;
