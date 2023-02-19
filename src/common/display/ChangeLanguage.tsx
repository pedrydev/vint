import { Avatar, Button, Dropdown, Space, Tooltip, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { MdTranslate } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChangeLanguage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLangChange = (lang: string) => {
    if (i18n.language !== lang) {
      window.localStorage.setItem('lang', lang);
      const oldLang = i18n.language;
      i18n.changeLanguage(lang);
      navigate(location.pathname.replace(oldLang, lang));
    }
  };

  return (
    <Dropdown
      arrow
      menu={{
        activeKey: i18n.language,
        items: [
          {
            key: 'en',
            label: (
              <Space size='small'>
                <Avatar src='https://flagcdn.com/us.svg' />
                <Typography.Text>{t('english')}</Typography.Text>
              </Space>
            ),
            onClick: () => handleLangChange('en'),
          },
          {
            key: 'es',
            label: (
              <Space size='small'>
                <Avatar src='https://flagcdn.com/es.svg' />
                <Typography.Text>{t('spanish')}</Typography.Text>
              </Space>
            ),
            onClick: () => handleLangChange('es'),
          },
        ],
      }}
      trigger={['click']}
      placement='bottomRight'
    >
      <Tooltip title={t('changeLanguage')}>
        <Button icon={<MdTranslate />} shape='circle' type='text' />
      </Tooltip>
    </Dropdown>
  );
}
