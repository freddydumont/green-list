import { useMachine } from '@xstate/react';
import { createContext } from 'react';
import { Interpreter } from 'xstate';
import {
  formMachine,
  FormContext,
  FormStateSchema,
  FormEvent,
} from '../formMachine';
import FormPageLayout from '../components/FormPageLayout';
import FormPageInfo from '../components/FormPageInfo';
import FormPageSkills from '../components/FormPageSkills';

type Service = Interpreter<FormContext, FormStateSchema, FormEvent>;

export const ServiceContext = createContext<Service>({} as Service);

export default () => {
  const [current, , service] = useMachine(formMachine, { immediate: true });

  let page = null;

  switch (current.value) {
    case 'home':
      // page = (
      //   <FormPageLayout title="Home" description="this is a test description" />
      // );
      page = <FormPageSkills />;
      break;

    case 'info':
      page = <FormPageInfo />;
      break;

    case 'skills':
      page = <FormPageSkills />;
      break;
    case 'availability':
      page = (
        <FormPageLayout
          title="Availability"
          description="this is a test description"
        />
      );
      break;
    case 'validation':
      page = (
        <FormPageLayout
          title="Validation"
          description="this is a test description"
        />
      );
      break;
    case 'confirmation':
      page = (
        <FormPageLayout
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
