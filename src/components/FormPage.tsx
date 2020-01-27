import { Styled } from 'theme-ui';
import { Flex, Text, Divider } from '@theme-ui/components';
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
      <Text
        as="p"
        sx={{
          fontSize: 2,
        }}
      >
        {description}
      </Text>
      <Divider mx={0} mb={4} />
      {children}
      <Divider mx={0} mt={0} mb={4} />
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