import { Lost } from './Lost.Class';
import { Adoption } from './Adoption.Class';
import { Found } from './Found.Class';
import { Sighted } from './Sighted.Class';
import { IPublication, PublicationType } from './Publication.interface';

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
                return new Lost(data);
            
            case 'found':
                return new Found(data);
            
            case 'sighted':
                return new Sighted(data);

            case 'adoption':
                return new Adoption(data);

            default:
                throw new Error(`Tipo de publicacion desconocido: ${data.publicationType}`);
        }
        }
    }