import { useContext } from 'react';
import { useService } from '@xstate/react';
import { ServiceContext } from '../pages';

/** wrapper for useContext and useService */
function useFormService() {
  const service = useContext(ServiceContext);
  return useService(service);
}

export { useFormService };
