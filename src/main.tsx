import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import ReactQuery from './providers/ReactQuery';
import I18n from './providers/I18n';
import AppSpin from './common/feedback/AppSpin';
import Antd from './providers/Antd';
import Routes from './routing/Routes';
import './styles/scroll-bar.css';
import 'antd/dist/reset.css';
import './styles/antd-overrides.css';
import './styles/tailwind.css';
import './styles/index.css';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ReactQuery>
      <Suspense fallback={<AppSpin.Screen />}>
        <I18n>
          <Antd>
            <Routes />
          </Antd>
        </I18n>
      </Suspense>
    </ReactQuery>
  </StrictMode>
);
