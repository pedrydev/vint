import 'react-i18next';
import appLayout from '../public/locales/en/appLayout.json';
import common from '../public/locales/en/common.json';
import home from '../public/locales/en/home.json';
import notifications from '../public/locales/en/notifications.json';
import routes from '../public/locales/en/routes.json';
import signin from '../public/locales/en/signin.json';
import translation from '../public/locales/en/translation.json';

// * Investigate why safe typing doesn't work (https://react.i18next.com/latest/typescript)
declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      appLayout: typeof appLayout;
      common: typeof common;
      home: typeof home;
      notifications: typeof notifications;
      routes: typeof routes;
      signin: typeof signin;
      translation: typeof translation;
    };
  }
}
