import { useQuery } from '@tanstack/react-query';
import FakeStoreService from '../services/FakeStoreService';

export default function useProducts() {
  const { data, isLoading } = useQuery(['products'], FakeStoreService.getProducts);
  return { data, isLoading };
}
