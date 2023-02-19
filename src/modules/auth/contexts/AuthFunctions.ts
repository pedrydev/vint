import AuthState from './AuthState';

export default interface AuthFunctions {
  login: (data: AuthState) => void;
  logout: () => void;
}
