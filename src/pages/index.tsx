import { Styled } from 'theme-ui';
import { Button } from '@theme-ui/components';
import { useMachine } from '@xstate/react';
import { formMachine } from '../formMachine';

export default () => {
  const [current, send] = useMachine(formMachine);

  switch (current.value) {
    case 'welcome':
      return (
        <>
          <Styled.h1>Welcome</Styled.h1>
          <Button onClick={() => send({ type: 'START', lang: 'en' })}>
            Continue in English
          </Button>
          <Button onClick={() => send({ type: 'START', lang: 'en' })}>
            Continuer en français
          </Button>
        </>
      );

    case 'info':
      return <Styled.h1>Info</Styled.h1>;

    default:
      return null;
  }
};
