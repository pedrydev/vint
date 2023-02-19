import { App, Button, Input, Space, Typography } from 'antd';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import ChangeLanguage from '@/common/display/ChangeLanguage';
import useAuthFunctions from '../hooks/useAuthFunctions';
import useSignIn from '../hooks/useSignIn';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthFunctions();
  const { signIn, isLoading } = useSignIn();
  const { t } = useTranslation('signin');
  const { notification } = App.useApp();

  const handleSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    ev.stopPropagation();
    signIn({ username, password })
      .then(login)
      .catch(() => {
        notification.error({
          message: t('invalid-credentials'),
          placement: 'bottomRight',
        });
      });
  };

  return (
    <div className='h-screen flex justify-center bg-gray-50'>
      <form
        className='bg-white flex flex-col mt-16 p-lg shadow-lg rounded-lg h-fit'
        onSubmit={handleSubmit}
      >
        <Space direction='vertical' size='middle'>
          <div className='flex items-center justify-between space-x-md'>
            <Typography.Title className='h-inherit' level={4}>
              {t('title')}
            </Typography.Title>
            <ChangeLanguage />
          </div>
          <Input
            onChange={(ev) => setUsername(ev.target.value)}
            placeholder={t('username')}
            required
            value={username}
          />
          <Input
            onChange={(ev) => setPassword(ev.target.value)}
            placeholder={t('password')}
            required
            type='password'
            value={password}
          />
          <div className='flex justify-center'>
            <Button htmlType='submit' loading={isLoading} type='primary'>
              Login
            </Button>
          </div>
        </Space>
      </form>
    </div>
  );
}
