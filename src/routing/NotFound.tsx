import { Result, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import useSetHelp from '@/common/feedback/useSetHelp';

export default function NotFound() {
  const { t } = useTranslation('routes');
  const setHelp = useSetHelp();
  setHelp(<Typography.Paragraph>{t('404help')}</Typography.Paragraph>);

  return <Result status='404' title={t('404')} />;
}
