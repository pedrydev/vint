import { lazy } from 'react';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import AuthProvider from '@/modules/auth/AuthProvider';
import NotFound from './NotFound';
import RedirectToLocale from './RedirectToLocale';
import type RouteConfig from './RouteConfig';
import RouteError from './RouteError';

const AppLayout = lazy(() => import('@/layout/AppLayout'));

type NamedRouteObject = RouteObject & {
  name?: string;
};

const routeConfigs = import.meta.glob('../modules/**/pages/**/routes.tsx', {
  eager: true,
  import: 'default',
});
const routeObjects: NamedRouteObject[] = [];

const keys: string[] = [];
const configKeys = Object.keys(routeConfigs);
configKeys.forEach((path) => keys.push(path));
keys.sort((a, b) => a.split('/').length - b.split('/').length); // To add parents first

keys.forEach((path) => {
  // eslint-disable-next-line security/detect-object-injection
  for (const routeConfig of routeConfigs[path] as RouteConfig[]) {
    const config: RouteConfig = {
      // eslint-disable-next-line security/detect-object-injection
      ...routeConfig,
      errorElement: <RouteError />,
    };
    if (config.parent) {
      const parent = routeObjects.filter((r) => r.name === config.parent)[0];
      if (parent.children) {
        parent.children.push(config);
      } else {
        parent.children = [config];
      }
    } else {
      // @ts-ignore
      routeObjects.push(config);
    }
  }
});

routeObjects.push({
  element: <NotFound />,
  path: '*',
});

const router = createBrowserRouter([
  {
    path: '/:locale',
    element: <AuthProvider />,
    children: [
      {
        path: '',
        element: <AppLayout />,
        children: routeObjects,
      },
    ],
  },
  {
    path: '/*',
    element: <RedirectToLocale />,
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
