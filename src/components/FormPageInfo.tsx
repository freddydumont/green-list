import FormPageLayout from './FormPageLayout';
import { Form, FormField, FormInputChoice } from './FormComponents';
import { User } from '../formMachine';

const FormPageInfo = () => {
  const onSubmit = (data: User) => {
    console.log(data);
  };

  return (
    <FormPageLayout
      title="Contact information"
      description="The information you provide here will allow us to identify and contact you."
    >
      <Form onSubmit={onSubmit}>
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
