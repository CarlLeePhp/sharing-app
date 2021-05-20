import { Category } from './Category';

export interface Interest {
  id: number;
  appUserId: number;
  categoryId: number;
  category: Category;
}
