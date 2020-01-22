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
      page = <FormPage title="Info" description="this is a test description" />;
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
