import { useMachine } from '@xstate/react';
import {
  formMachine,
  FormContext,
  FormStateSchema,
  FormEvent,
} from '../formMachine';
import FormPage from '../components/FormPage';
import { createContext } from 'react';
import { Interpreter } from 'xstate';
import {
  Box,
  Flex,
  Label,
  Input,
  Checkbox,
  Radio,
  Field,
} from '@theme-ui/components';

type Service = Interpreter<FormContext, FormStateSchema, FormEvent>;

export const ServiceContext = createContext<Service>({} as Service);

export default () => {
  const [current, , service] = useMachine(formMachine, { immediate: true });

  let page = null;

  switch (current.value) {
    case 'home':
      page = <FormPage title="Home" description="this is a test description" />;
      break;

    case 'info':
      page = (
        <FormPage
          title="Contact information"
          description="These informations will allow us to identify and contact you."
        >
          <Flex
            as="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              flexDirection: 'column',
            }}
          >
            <Field label="First Name" name="first_name" mb={3} />
            <Field label="Last Name" name="last_name" mb={3} />

            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" mb={3} />

            <Label htmlFor="date_of_birth">Date of birth</Label>
            <Input type="date" name="date_of_birth" mb={3} />

            <Flex mb={3}>
              <Label>
                <Radio name="sex" value="male" /> Male
              </Label>
              <Label>
                <Radio name="sex" value="female" /> Female
              </Label>
            </Flex>

            <Field label="City" name="location" mb={3} />

            <Label htmlFor="phone">Phone number</Label>
            <Input type="tel" name="phone" mb={3} />

            <Box mb={3}>
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
        </FormPage>
      );
      break;

    case 'skills':
      page = (
        <FormPage title="Skills" description="this is a test description" />
      );
      break;
    case 'availability':
      page = (
        <FormPage
          title="Availability"
          description="this is a test description"
        />
      );
      break;
    case 'validation':
      page = (
        <FormPage title="Validation" description="this is a test description" />
      );
      break;
    case 'confirmation':
      page = (
        <FormPage
          title="Confirmation"
          description="this is a test description"
        />
      );
      break;

    default:
      page = null;
      break;
  }

  return (
    <ServiceContext.Provider value={service}>{page}</ServiceContext.Provider>
  );
};
