import { createContext } from 'react';
import AuthFunctions from './AuthFunctions';
import AuthState from './AuthState';

export const AuthStateContext = createContext<AuthState>(null!);

// @ts-ignore
export const AuthFunctionsContext = createContext<AuthFunctions>();
