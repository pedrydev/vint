import Rating from './Rating';

export default interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: Rating;
}
