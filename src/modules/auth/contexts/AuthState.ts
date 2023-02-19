import Tokens from '../models/Tokens';
import User from '../models/User';

export default interface AuthState {
  tokens: Tokens;
  user: User;
}
