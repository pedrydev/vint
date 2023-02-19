import { createContext } from 'react';
import type { ReactNode } from 'react';

// @ts-ignore
export const SetHelpContext = createContext<(node: ReactNode) => void>();
