import { useQuery } from '@tanstack/react-query';
import GameService from '../services/GameService';

export default function useGames() {
  const { data, isLoading } = useQuery({ queryKey: ['games'], queryFn: GameService.getAll });
  return { data, isLoading };
}
