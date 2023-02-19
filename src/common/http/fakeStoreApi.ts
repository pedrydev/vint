import HttpClient from './HttpClient';

const fakeStoreClient = new HttpClient({
  url: 'https://fakestoreapi.com',
});

export default fakeStoreClient;
