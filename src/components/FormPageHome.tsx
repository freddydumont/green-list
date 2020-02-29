import { Button, Text, Box } from '@theme-ui/components';
import { useFormService } from '../hooks/useFormService';
import { Styled } from 'theme-ui';

const FormPageHome = () => {
  const [, send] = useFormService();

  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Styled.h1>Dhamma Suttama</Styled.h1>
      <Text
        as="p"
        sx={{
          fontSize: 2,
        }}
      >
        Formulaire sur vos intérêts et disponibilités pour le service
      </Text>
      <Text
        as="p"
        sx={{
          fontSize: 2,
        }}
      >
        Service interest and availability form
      </Text>
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
    </Box>
  );
};

export default FormPageHome;
