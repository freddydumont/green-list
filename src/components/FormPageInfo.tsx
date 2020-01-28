import FormPageLayout from './FormPageLayout';
import {
  Flex,
  Box,
  Field,
  Label,
  Input,
  Radio,
  Checkbox,
} from '@theme-ui/components';

const FormPageInfo = () => {
  return (
    <FormPageLayout
      title="Contact information"
      description="The information you provide here will allow us to identify and contact you."
    >
      <Flex
        as="form"
        onSubmit={(e) => e.preventDefault()}
        sx={{
          flexDirection: 'column',
        }}
      >
        <Field label="First Name" name="first_name" />
        <Field label="Last Name" name="last_name" />

        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" />

        <Label htmlFor="date_of_birth">Date of birth</Label>
        <Input type="date" name="date_of_birth" />

        <Box mb={4}>
          <Label>Gender</Label>
          <Label>
            <Radio name="gender" value="male" /> Male
          </Label>
          <Label>
            <Radio name="gender" value="female" /> Female
          </Label>
        </Box>

        <Field label="City" name="location" />

        <Label htmlFor="phone">Phone number</Label>
        <Input type="tel" name="phone" />

        <Box mb={4}>
          <Label>Contact preferences</Label>
          <Label>
            <Checkbox name="contact_preference" value="email" />
            Email
          </Label>
          <Label>
            <Checkbox name="contact_preference" value="phone" />
            Phone
          </Label>
          <Label>
            <Checkbox name="contact_preference" value="text" />
            Text
          </Label>
        </Box>
      </Flex>
    </FormPageLayout>
  );
};

export default FormPageInfo;
