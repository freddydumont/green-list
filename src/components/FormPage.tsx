import { Styled } from 'theme-ui';
import { Box } from '@theme-ui/components';
import FormNavButton from './NextButton';

interface Props {
  title: string;
  description: string;
}

/**
 * Basic layout for each form page
 */
const FormPage = ({ title, description }: Props) => {
  return (
    <>
      <Styled.h1>{title}</Styled.h1>
      <Styled.p>{description}</Styled.p>
      <Box
        sx={{
          position: 'absolute',
          bottom: 2,
          right: 2,
          paddingBottom: 'inherit',
          paddingRight: 'inherit',
        }}
      >
        <FormNavButton />
      </Box>
    </>
  );
};

export default FormPage;
