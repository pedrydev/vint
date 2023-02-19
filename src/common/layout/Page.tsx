import { Breadcrumb, Space, Typography } from 'antd';
import { Suspense } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';
import AppSpin from '../feedback/AppSpin';
import useSetHelp from '../feedback/useSetHelp';
import Link from '../navigation/Link';

export interface BreadcrumItem {
  key: string;
  href: string;
  label: string;
}

export interface PageProps {
  breadcrumbs?: BreadcrumItem[];
  title: string;
  help: ReactNode;
}

export default function Page({ breadcrumbs, children, help, title }: PropsWithChildren<PageProps>) {
  const setHelp = useSetHelp();
  setHelp(help);

  return (
    <div className='space-y-lg'>
      <Space direction='vertical' size='small'>
        <Typography.Title level={4}>{title}</Typography.Title>
        {breadcrumbs && (
          <Breadcrumb>
            {breadcrumbs.map((b) => (
              <Breadcrumb.Item key={b.key}>
                <Link to={b.href}>{b.label}</Link>
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
      </Space>
      <Suspense fallback={<AppSpin.Block />}>{children}</Suspense>
    </div>
  );
}
