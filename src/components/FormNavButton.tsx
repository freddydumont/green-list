import { Button } from '@theme-ui/components';
import { useFormService } from '../hooks/useFormService';

/**
 * Button subscribing to the form state that returns the appropriate value
 * for the current state.
 */
const FormNavButton = () => {
  const [current, send] = useFormService();

  const next = <Button variant="form" as="input" type="submit" value="Next" />;

  const previous = (
    <Button variant="outline" mr={2} onClick={() => send({ type: 'PREVIOUS' })}>
      Previous
    </Button>
  );

  switch (current.value) {
    case 'home':
      return (
        <>
          <Button
            variant="form"
            onClick={() => send({ type: 'START', lang: 'en' })}
          >
            Continue in English
          </Button>
          <Button
            variant="form"
            onClick={() => send({ type: 'START', lang: 'fr' })}
          >
            Continuer en français
          </Button>
        </>
      );

    case 'info':
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
          <Button variant="form" onClick={() => send({ type: 'SUBMIT' })}>
            Submit
          </Button>
        </>
      );

    case 'confirmation':
      return null;

    default:
      return null;
  }
};

export default FormNavButton;
