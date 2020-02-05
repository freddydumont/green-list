import FormPageLayout from './FormPageLayout';
import { Text } from '@theme-ui/components';
import { useContext } from 'react';
import { useService } from '@xstate/react';
import { ServiceContext } from '../pages';

const FormPageInfo = () => {
  const service = useContext(ServiceContext);
  const [state] = useService(service);

  return (
    <FormPageLayout title="Skills" description="temp description">
      <Text sx={{ fontFamily: 'mono' }}>
        <pre>{JSON.stringify(state.context, null, 2)}</pre>
      </Text>
    </FormPageLayout>
  );
};

export default FormPageInfo;
