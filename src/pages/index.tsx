import { Styled } from 'theme-ui';
import { useMachine } from '@xstate/react';
import { formMachine } from '../formMachine';
import NextButton from '../components/NextButton';
import { Box } from '@theme-ui/components';

export default () => {
  const [current, , service] = useMachine(formMachine, { immediate: true });

  const Page = ({ title }: { title: string }) => (
    <>
      <Styled.h1>{title}</Styled.h1>
      <Box
        sx={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          paddingBottom: 'inherit',
          paddingRight: 'inherit',
        }}
      >
        <NextButton service={service} />
      </Box>
    </>
  );

  switch (current.value) {
    case 'home':
      return <Page title="Home" />;
    case 'info':
      return <Page title="Info" />;
    case 'skills':
      return <Page title="Skills" />;
    case 'availability':
      return <Page title="Availability" />;
    case 'validation':
      return <Page title="Validation" />;
    case 'confirmation':
      return <Page title="Confirmation" />;

    default:
      return null;
  }
};
