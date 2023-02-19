import { Bar } from '@ant-design/plots';
import type { BarConfig } from '@ant-design/plots';
import { Card, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import Page from '@/common/layout/Page';

const config: BarConfig = {
  data: [
    { country: 'USA', value: 101496168 },
    { country: 'China', value: 98873697 },
    { country: 'India', value: 44684658 },
    { country: 'France', value: 38475606 },
    { country: 'Germany', value: 37986750 },
    { country: 'Brazil', value: 36960888 },
    { country: 'Japan', value: 33040963 },
    { country: 'Republic of Korea', value: 30408656 },
    { country: 'Italy', value: 25509067 },
    { country: 'UK', value: 24341615 },
  ],
  legend: {
    position: 'top',
  },
  seriesField: 'country',
  xField: 'value',
  yField: 'country',
};

export default function Chart() {
  const { t } = useTranslation('chart');
  const { t: tRoutes } = useTranslation('routes');

  return (
    <Page
      help={t('help')}
      title={t('help')}
      breadcrumbs={[
        { href: '', key: 'home', label: tRoutes('home') },
        { href: 'chart', key: 'chart', label: tRoutes('chart') },
      ]}
    >
      <Card size='small'>
        <Typography.Title level={4}>
          {t('chartTitle')} - {config.data.map((obj) => obj.value).reduce((a, b) => a + b)}
        </Typography.Title>
        <Bar {...config} />
      </Card>
    </Page>
  );
}
