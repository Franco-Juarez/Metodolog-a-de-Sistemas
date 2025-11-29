import { Publication } from './Publication.Class';

export class Lost extends Publication {
  constructor(
    id: string,
    createdAt: string,
    description: string,
    isActive: boolean,
    locationId: string,
    creatorUserId: string,
    petId: string
  ) {
    super(
      id,
      createdAt,
      description,
      isActive,
      locationId,
      creatorUserId,
      petId
    );
    this.publicationType = 'lost';
  }
}
