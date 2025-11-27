import { User } from "../User.Class";
import { Location } from "../Location.Class";

export type PublicationType= 'lost' | 'found' | 'sighted' | 'adoption';

export interface IPublication {
  id: string;
  createdAt: string;
  description: string;
  isActive: boolean;
  publicationType: PublicationType;
  locationId: string;
  creatorUserId: string;
  petId: string;
}