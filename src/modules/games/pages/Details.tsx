import { Space, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import NavigationBar from '@/common/layout/NavigationTag';
import useGame from '../hooks/useGame';

export default function Details() {
  const { id } = useParams();
  const game = useGame(id as string);
  const { add } = NavigationBar.useNavigationTags();
  const { t } = useTranslation('games');

  useEffect(() => {
    add({
      closeable: true,
      label: game.title,
      url: 'games/' + game.id,
    });
  }, []);

  return (
    <Space direction='horizontal' size='small'>
      <Typography.Text>
        {t('title')}: {game?.title}
      </Typography.Text>
      <Typography.Text>
        {t('createdBy')}: {game?.creator}
      </Typography.Text>
    </Space>
  );
}
