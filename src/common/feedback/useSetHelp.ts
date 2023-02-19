import { useContext } from 'react';
import { SetHelpContext } from './HelpContext';

export default function useSetHelp() {
  return useContext(SetHelpContext);
}
