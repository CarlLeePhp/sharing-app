import { Interest } from './Interest';

export interface Member {
  id: number;
  email: string;
  userName: string;
  street: string;
  city: string;
  gender: boolean;
  interests: Interest[];
  photoUrl: string;
  photoPublicId: string;
}
