import { Styled } from 'theme-ui';
import { Text, Divider } from '@theme-ui/components';
import { ReactNode } from 'react';

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
}

/**
 * Basic layout for each form page
 */
const FormPageLayout = ({ title, description, children }: Props) => {
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
    </>
  );
};

export default FormPageLayout;
