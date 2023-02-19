import AuthState from '../contexts/AuthState';

export default class AuthService {
  static login(username: string, password: string): Promise<AuthState> {
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (username !== 'admin' || password !== 'admin') reject(new Error());
        resolve({
          user: { claims: [], name: 'Pedro' },
          tokens: { accessToken: '123', refreshToken: '456' },
        });
      }, 2000)
    );
  }
}
