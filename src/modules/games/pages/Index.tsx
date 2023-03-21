import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import AppSpin from '@/common/feedback/AppSpin';
import NavigationBar from '@/common/layout/NavigationTag';
import Page from '@/common/layout/Page';

export default function Index() {
  const { t } = useTranslation('games');
  const { t: tRoutes } = useTranslation('routes');

  return (
    <Page help={t('help')} title={tRoutes('games')}>
      <NavigationBar.Provider
        initItems={[
          {
            closeable: false,
            label: t('all'),
            url: 'games',
          },
        ]}
      >
        <div className='space-y-lg'>
          <NavigationBar.Panel />
          <Suspense fallback={<AppSpin.Block />}>
            <Outlet />
          </Suspense>
        </div>
      </NavigationBar.Provider>
    </Page>
  );
}
