import { useState } from 'react';
import AuthState from './contexts/AuthState';
import AuthFunctions from './contexts/AuthFunctions';
import { AuthFunctionsContext, AuthStateContext } from './contexts/AuthContext';
import SignIn from './components/SignIn';
import { Outlet } from 'react-router-dom';

export default function AuthProvider() {
  const [state, setState] = useState<AuthState>(null);
  const functions: AuthFunctions = {
    login: setState,
    logout: () => setState(null),
  };

  return (
    <AuthFunctionsContext.Provider value={functions}>
      <AuthStateContext.Provider value={state}>
        {state ? <Outlet /> : <SignIn />}
      </AuthStateContext.Provider>
    </AuthFunctionsContext.Provider>
  );
}
