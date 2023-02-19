import { useToggle } from 'ahooks';
import {
  App,
  Avatar,
  Badge,
  Button,
  Divider,
  Dropdown,
  FloatButton,
  Layout,
  Menu,
  Space,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { cloneElement, Suspense, useRef } from 'react';
import type { ReactElement, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AiOutlineBarChart,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineQuestion,
  AiOutlineUser,
  AiOutlineYoutube,
} from 'react-icons/ai';
import { Outlet } from 'react-router-dom';
import useAuth from '@/modules/auth/hooks/useAuth';
import useAuthFunctions from '@/modules/auth/hooks/useAuthFunctions';
import ChangeLanguage from '@/common/display/ChangeLanguage';
import AppSpin from '@/common/feedback/AppSpin';
import { SetHelpContext } from '@/common/feedback/HelpContext';
import Link from '@/common/navigation/Link';
import useNavigate from '@/common/navigation/useNavigate';

export default function AppLayout() {
  const [collapse, { toggle }] = useToggle(true);
  const {
    token: { colorBgContainer, borderRadiusLG, boxShadowSecondary, colorBgElevated },
  } = theme.useToken();
  const { user } = useAuth();
  const { logout } = useAuthFunctions();
  const { t } = useTranslation('appLayout');
  const { t: tCommon } = useTranslation('common');
  const { t: tRoutes } = useTranslation('routes');
  const navigate = useNavigate();
  const helpNode = useRef<ReactNode | null>(null);
  const { modal } = App.useApp();

  return (
    <Layout className='min-h-screen'>
      <Layout.Sider collapsed={collapse} collapsible onCollapse={toggle}>
        <div>
          <div className='flex items-center justify-center h-[64px]'>
            <Avatar src='https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg' />
          </div>
          <Menu
            className='h-full'
            items={[
              {
                icon: <AiOutlineHome />,
                label: tRoutes('home'),
                key: '1',
                onClick: () => navigate(''),
              },
              {
                icon: <AiOutlineYoutube />,
                label: tRoutes('movies'),
                key: 2,
                onClick: () => navigate('movies'),
              },
              {
                icon: <AiOutlineBarChart />,
                label: tRoutes('chart'),
                key: 3,
                onClick: () => navigate('chart'),
              },
            ]}
            mode='inline'
            theme='dark'
          />
        </div>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ backgroundColor: colorBgContainer }}>
          <div className='flex items-center h-full justify-between'>
            <Typography.Title level={3}>{import.meta.env.VITE_APP_NAME}</Typography.Title>
            <Space size='small'>
              <Tooltip title={t('notifications')}>
                <Badge count={6} overflowCount={5}>
                  <Link to='notifications'>
                    <Button icon={<AiOutlineBell />} shape='circle' type='text' />
                  </Link>
                </Badge>
              </Tooltip>
              <Tooltip title={tCommon('help')}>
                <Button
                  icon={<AiOutlineQuestion />}
                  onClick={() =>
                    modal.info({
                      title: tCommon('help'),
                      content: helpNode.current,
                    })
                  }
                  shape='circle'
                  type='text'
                />
              </Tooltip>
              <ChangeLanguage />
              <Dropdown
                arrow
                dropdownRender={(menu) => (
                  <div
                    style={{
                      backgroundColor: colorBgElevated,
                      borderRadius: borderRadiusLG,
                      boxShadow: boxShadowSecondary,
                    }}
                  >
                    <div className='flex justify-center p-xs'>
                      <Typography.Title level={5}>{user.name}</Typography.Title>
                    </div>
                    <Divider style={{ margin: '0' }} />
                    {cloneElement(menu as ReactElement, { style: { boxShadow: 'none' } })}
                  </div>
                )}
                menu={{
                  items: [
                    {
                      key: '1',
                      icon: <AiOutlineLogout />,
                      label: t('logout'),
                      onClick: logout,
                    },
                  ],
                }}
                trigger={['click']}
                placement='bottomRight'
              >
                <Tooltip title={t('account')}>
                  <Button icon={<AiOutlineUser />} shape='circle' type='text' />
                </Tooltip>
              </Dropdown>
            </Space>
          </div>
        </Layout.Header>
        <Layout.Content className='p-lg'>
          <SetHelpContext.Provider value={(node: ReactNode) => (helpNode.current = node)}>
            <Suspense fallback={<AppSpin.Block />}>
              <Outlet />
            </Suspense>
          </SetHelpContext.Provider>
          <FloatButton.BackTop type='primary' />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
