import { Button, Card, List } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import NavigationBar from '@/common/layout/NavigationTag';
import useGames from '../hooks/useGames';
import Game from '../models/Game';
import useNavigate from '@/common/navigation/useNavigate';

export default function GameList() {
  const { data, isLoading } = useGames();
  const navigate = useNavigate();

  return (
    <Card size='small'>
      <List
        dataSource={data}
        rowKey='id'
        loading={isLoading}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta description={item.creator} title={item.title} />
            <Button
              icon={<AiOutlineEye />}
              onClick={() => navigate('games/' + item.id)}
              shape='circle'
              type='text'
            />
          </List.Item>
        )}
        size='small'
      />
    </Card>
  );
}
