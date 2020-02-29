import { Button } from '@theme-ui/components';
import FormPageLayout from './FormPageLayout';
import { useFormService } from '../hooks/useFormService';

const FormPageHome = () => {
  const [, send] = useFormService();

  return (
    <FormPageLayout title="Home" description="this is a test description">
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
    </FormPageLayout>
  );
};

export default FormPageHome;
