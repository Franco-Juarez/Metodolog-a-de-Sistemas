import { Lost } from './Lost.Class';
import { Adoption } from './Adoption.Class';
import { Found } from './Found.Class';
import { Sighted } from './Sighted.Class';

import { IPublication, PublicationType } from './Publication.interface';
import { User } from '../User.Class';
import { Location } from '../Location.Class';
import { Pet } from '../pets/Pet.Class';

export interface DataCreatePublication {
    id: string;
    createdAt: string;
    description: string;
    isActive: boolean;
    publicationType: PublicationType;
    locationId: string;
    creatorUserId: string;
    petId: string;
}

//factory method
export class PublicationFactory {
    public static createPublication(data: DataCreatePublication): IPublication {
        switch (data.publicationType) {
            case 'lost':
                return new Lost(
                    data.id,
                    data.createdAt,
                    data.description,
                    data.isActive,
                    data.locationId,
                    data.creatorUserId,
                    data.petId
                );
            
            case 'found':
                return new Found(
                    data.id,
                    data.createdAt,
                    data.description,
                    data.isActive,
                    data.locationId,
                    data.creatorUserId,
                    data.petId
                );
            
            case 'sighted':
                return new Sighted(
                    data.id,
                    data.createdAt,
                    data.description,
                    data.isActive,
                    data.locationId,
                    data.creatorUserId,
                    data.petId
                );
            case 'adoption':
                return new Adoption(
                    data.id,
                    data.createdAt,
                    data.description,
                    data.isActive,
                    data.locationId,
                    data.creatorUserId,
                    data.petId
                );
            default:
                throw new Error(`Tipo de publicacion desconocido: ${data.publicationType}`);
        }
        }
    }