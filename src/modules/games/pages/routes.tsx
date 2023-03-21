import { lazy } from 'react';
import RouteConfig from '@/routing/RouteConfig';

const Index = lazy(() => import('./Index'));
const Details = lazy(() => import('./Details'));
const List = lazy(() => import('./List'));

const config: RouteConfig[] = [
  {
    element: <Index />,
    path: 'games',
    children: [
      {
        element: <List />,
        index: true,
      },
      {
        element: <Details />,
        path: ':id',
      },
    ],
  },
];

export default config;
