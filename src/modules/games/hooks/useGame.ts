import { useQuery } from '@tanstack/react-query';
import Game from '../models/Game';
import GameService from '../services/GameService';

export default function useGame(id: string) {
  const { data } = useQuery({
    queryKey: ['games', id],
    queryFn: () => GameService.getOne(id),
    suspense: true,
  });
  return data as Game;
}
