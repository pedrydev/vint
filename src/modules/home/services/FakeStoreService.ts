import fakeStoreClient from '@/common/http/fakeStoreApi';
import Product from '../models/Product';

export default class FakeStoreService {
  static getProducts(): Promise<Product[]> {
    return fakeStoreClient.get({ url: 'products' });
  }
}
