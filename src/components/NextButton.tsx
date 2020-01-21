import { Button } from '@theme-ui/components';
import { useService } from '@xstate/react';
import { Interpreter } from 'xstate';
import { FormEvent, FormContext, FormStateSchema } from '../formMachine';

interface Props {
  /** xstate service */
  service: Interpreter<FormContext, FormStateSchema, FormEvent>;
}

/**
 * Button subscribing to the form state that returns the appropriate value
 * for the current state.
 */
const NextButton = ({ service }: Props) => {
  const [current, send] = useService(service);

  const next = <Button onClick={() => send({ type: 'NEXT' })}>Next</Button>;

  const previous = (
    <Button onClick={() => send({ type: 'PREVIOUS' })}>Previous</Button>
  );

  switch (current.value) {
    case 'welcome':
      return (
        <>
          <Button onClick={() => send({ type: 'START', lang: 'en' })}>
            Continue in English
          </Button>
          <Button onClick={() => send({ type: 'START', lang: 'en' })}>
            Continuer en français
          </Button>
        </>
      );

    case 'info':
      return next;

    case 'skills':
    case 'availability':
      return (
        <>
          {previous}
          {next}
        </>
      );

    case 'validation':
      return (
        <>
          {previous}
          <Button onClick={() => send({ type: 'SUBMIT' })}>Submit</Button>
        </>
      );

    case 'confirmation':
      return null;

    default:
      return null;
  }
};

export default NextButton;
