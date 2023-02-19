import { useContext } from 'react';
import { AuthStateContext } from '../contexts/AuthContext';

export default function useAuth() {
  return useContext(AuthStateContext);
}
