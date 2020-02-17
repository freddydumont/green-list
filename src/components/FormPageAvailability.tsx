import FormPageLayout from './FormPageLayout';
import { Text } from '@theme-ui/components';
import { useContext } from 'react';
import { useService } from '@xstate/react';
import { ServiceContext } from '../pages';

const FormPageAvailability = () => {
  const service = useContext(ServiceContext);
  const [state] = useService(service);

  return (
    <FormPageLayout
      title="Availabilities"
      description="If you'd like to make yourself available for certain periods, you can choose them below."
    >
      <Text sx={{ fontFamily: 'mono' }}>
        <pre>{JSON.stringify(state.context, null, 2)}</pre>
      </Text>
    </FormPageLayout>
  );
};

export default FormPageAvailability;
