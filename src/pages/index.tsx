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
import FormPageAvailability from '../components/FormPageAvailability';
import { Text } from '@theme-ui/components';

type Service = Interpreter<FormContext, FormStateSchema, FormEvent>;

export const ServiceContext = createContext<Service>({} as Service);

export default () => {
  const [current, , service] = useMachine(formMachine, { immediate: true });

  return (
    <ServiceContext.Provider value={service}>
      {
        // this is an object literal that acts as a switch for pages
        ({
          home: (
            <FormPageLayout
              title="Home"
              description="this is a test description"
            />
          ),
          info: <FormPageInfo />,
          skills: <FormPageSkills />,
          availability: <FormPageAvailability />,
          /**
           * Present the whole form for the user to review before final
           * submission
           **/
          validation: (
            <FormPageLayout
              title="Validation"
              description="this is a test description"
            >
              <Text sx={{ fontFamily: 'mono' }}>
                <pre>{JSON.stringify(current.context, null, 2)}</pre>
              </Text>
            </FormPageLayout>
          ),
          /** Display a confirmation message, return home and wipe the data */
          confirmation: (
            <FormPageLayout
              title="Confirmation"
              description="this is a test description"
            />
          ),
          default: null,
        } as Record<string, React.ReactNode>)[
          (current.value as string) || 'default'
        ]
      }
    </ServiceContext.Provider>
  );
};
