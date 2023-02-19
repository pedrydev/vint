import { Result } from 'antd';
import { useTranslation } from 'react-i18next';

export default function RouteError() {
  const { t } = useTranslation('routes');
  return <Result status='500' title={t('500')} />;
}
