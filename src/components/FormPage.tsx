import { Styled } from 'theme-ui';
import { Flex } from '@theme-ui/components';
import FormNavButton from './NextButton';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
}

/**
 * Basic layout for each form page
 */
const FormPage = ({ title, description, children }: Props) => {
  return (
    <>
      <Styled.h1>{title}</Styled.h1>
      <Styled.p>{description}</Styled.p>
      {children}
      <Flex
        sx={{
          justifyContent: 'flex-end',
        }}
      >
        <FormNavButton />
      </Flex>
    </>
  );
};

export default FormPage;
