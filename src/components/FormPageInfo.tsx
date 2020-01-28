import * as yup from 'yup';
import FormPageLayout from './FormPageLayout';
import { Form, FormField, FormInputChoice } from './FormComponents';

const userSchema = yup.object().shape({
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
  const onSubmit = (data: User) => {
    console.log(data);
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

        <input type="submit" />
      </Form>
    </FormPageLayout>
  );
};

export default FormPageInfo;
