import { Button, Card, List, Typography } from 'antd';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import Page from '@/common/layout/Page';

const fakeNotifications = [1, 2, 3, 4, 5].map((n) => ({
  key: n,
  label: `Notification ${n}`,
}));

export default function Notifications() {
  const { t } = useTranslation('routes');
  const { t: tPage } = useTranslation('notifications');
  const [notifications, setNotifications] = useState(fakeNotifications);

  return (
    <Page
      breadcrumbs={[
        { href: '', key: 'home', label: t('home') },
        { href: 'notifications', key: 'notifications', label: t('notifications') },
      ]}
      title={t('notifications')}
      help={<Typography.Paragraph>{tPage('help')}</Typography.Paragraph>}
    >
      <Card size='small'>
        <List
          dataSource={notifications}
          size='small'
          renderItem={(item) => (
            <List.Item
              actions={[
                <Button
                  danger
                  icon={<AiOutlineDelete />}
                  onClick={() => setNotifications((n) => n.filter((n2) => n2.key !== item.key))}
                  shape='circle'
                  type='text'
                />,
              ]}
            >
              <List.Item.Meta title={item.label} />
            </List.Item>
          )}
        />
      </Card>
    </Page>
  );
}
