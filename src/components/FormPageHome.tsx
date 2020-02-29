import { Button, Text, Box } from '@theme-ui/components';
import { useFormService } from '../hooks/useFormService';
import { Styled } from 'theme-ui';
import { ReactNode } from 'react';

const Paragraph = ({ children }: { children: ReactNode }) => (
  <Text
    as="p"
    sx={{
      fontSize: 2,
      mb: 2,
    }}
  >
    {children}
  </Text>
);

const FormPageHome = () => {
  const [, send] = useFormService();

  return (
    <Box
      sx={{
        textAlign: 'center',
      }}
    >
      <Styled.h1>Dhamma Suttama</Styled.h1>
      <Box
        sx={{
          mx: 'auto',
          my: 5,
          maxWidth: '600px',
        }}
      >
        <Text
          as="h2"
          sx={{
            fontSize: 3,
            mb: 3,
          }}
        >
          Formulaire sur vos intérêts et disponibilités pour le service
        </Text>
        <Paragraph>
          Remplir ce formulaire nous permettra de connaître vos intérêts,
          compétences et disponibilités pour le service.
        </Paragraph>
        <Paragraph>
          Selon vos préférences, nous pourrons vous contacter pour combler les
          besoins immédiats du centre, ou dans le cadre d'un projet pour lequel
          vos compétences seraient utiles.
        </Paragraph>
        <Paragraph>
          Le formulaire est divisé en 3 étapes et prend quelques minutes à
          remplir.
        </Paragraph>

        <Button
          mt={4}
          variant="form"
          mr={0}
          onClick={() => send({ type: 'START', lang: 'fr' })}
        >
          Continuer en français
        </Button>
      </Box>

      <Box
        sx={{
          mx: 'auto',
          my: 5,
          maxWidth: '600px',
        }}
      >
        <Text
          as="h2"
          sx={{
            fontSize: 3,
            mb: 3,
          }}
        >
          Service interest and availability form
        </Text>
        <Paragraph>
          Filling out this form will inform us of your interests, skills and
          availability for the service.
        </Paragraph>
        <Paragraph>
          Depending on your preferences, we may contact you to meet the centre's
          immediate needs, or for a project for which your skills would be
          useful.
        </Paragraph>
        <Paragraph>
          The form is divided into 3 steps and takes a few minutes to complete.
        </Paragraph>
        <Button
          mt={4}
          variant="form"
          onClick={() => send({ type: 'START', lang: 'en' })}
        >
          Continue in English
        </Button>
      </Box>
    </Box>
  );
};

export default FormPageHome;
