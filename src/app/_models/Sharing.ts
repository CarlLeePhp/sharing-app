import { Category } from './Category';

export interface Sharing {
  id: number;
  status: number;
  productDescription: string;
  portionDescription: string;
  portionPrice: number;
  portionQty: number;
  deadline: Date;
  howToShare: string;
  availableQty: number;
  keepQty: number;
  savedDate: Date;
  publishedDate: Date;
  achievedDate: Date;
  photoUrl: string;
  photoPublicId: string;

  appUserId: number;
  appUserName: string;
  appUserEmail: string;
  category: Category;
  categoryId: number;
}
