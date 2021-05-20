import { Sharing } from './Sharing';

export interface Joining {
  id: number;
  sharing: Sharing;
  sharingId: number;
  joinUserId: number;
  joinQty: number;
  status: number;
}
