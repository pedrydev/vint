import { lazy } from 'react';
import type RouteConfig from '@/routing/RouteConfig';

const Chart = lazy(async () => import('./Chart'));
const Index = lazy(async () => import('./Index'));
const Movies = lazy(async () => import('./Movies'));
const Notifications = lazy(async () => import('./Notifications'));

const config: RouteConfig[] = [
  {
    name: 'Home',
    element: <Index />,
    index: true,
  },
  {
    name: 'Chart',
    element: <Chart />,
    path: 'chart',
  },
  {
    name: 'Notifications',
    element: <Notifications />,
    path: 'notifications',
  },
  {
    name: 'Movies',
    element: <Movies />,
    path: 'movies',
  },
];

export default config;
