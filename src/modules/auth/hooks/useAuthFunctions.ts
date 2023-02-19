import { useContext } from 'react';
import { AuthFunctionsContext } from '../contexts/AuthContext';

export default function useAuthFunctions() {
  return useContext(AuthFunctionsContext);
}
