import { useMutation } from '@tanstack/react-query';
import AuthState from '../contexts/AuthState';
import AuthService from '../services/AuthService';

export default function useSignIn() {
  const { mutateAsync, isLoading } = useMutation<
    AuthState,
    Error,
    { username: string; password: string }
  >(({ username, password }) => AuthService.login(username, password));
  return { signIn: mutateAsync, isLoading };
}
