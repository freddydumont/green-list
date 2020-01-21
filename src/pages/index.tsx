import { Styled } from 'theme-ui';
import { useMachine } from '@xstate/react';
import { formMachine } from '../formMachine';
import NextButton from '../components/NextButton';

export default () => {
  const [current, , service] = useMachine(formMachine, { immediate: true });

  const NextPage = ({ title }: { title: string }) => (
    <>
      <Styled.h1>{title}</Styled.h1>
      <NextButton service={service} />
    </>
  );

  switch (current.value) {
    case 'welcome':
      return <NextPage title="Welcome" />;
    case 'info':
      return <NextPage title="Info" />;
    case 'skills':
      return <NextPage title="Skills" />;
    case 'availability':
      return <NextPage title="Availability" />;
    case 'validation':
      return <NextPage title="Validation" />;
    case 'confirmation':
      return <NextPage title="Confirmation" />;

    default:
      return null;
  }
};
