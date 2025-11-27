import { v4 as uuidv4 } from 'uuid';
import { IPublication, PublicationType } from './Publication.interface';
import { PublicationFactory, DataCreatePublication } from './Publication.Factory';

export class PublicationBuilder {
    private data: Partial<DataCreatePublication> = {
        isActive: true,
    };
    
    constructor(type: PublicationType) {
        this.data.publicationType = type;
    }

public withDescription(description: string): PublicationBuilder {
    this.data.description = description;
    return this;
}

public withLocationId(locationId: string): PublicationBuilder {
    this.data.locationId = locationId;
    return this;
}

public withCreatorUserId(creatorUserId: string): PublicationBuilder {
    this.data.creatorUserId = creatorUserId;
    return this;
}

public withPetId(petId: string): PublicationBuilder {
    this.data.petId = petId;
    return this;
}

public withId(id: string): PublicationBuilder {
    this.data.id = id;
    return this;
}

public build(): IPublication {
    if (!this.data.creatorUserId) throw new Error('El usuario creador es obligatorio');
    if (!this.data.description) throw new Error('La description es obligatoria');
    if (!this.data.locationId) throw new Error('La ubicación es obligatoria');    
    if (!this.data.petId) throw new Error('La mascota es obligatoria');
    if (!this.data.publicationType) throw new Error('El tipo de publicación es obligatorio');

    const finalData: DataCreatePublication = {
        id: this.data.id || uuidv4(),
        createdAt: this.data.createdAt || new Date().toISOString(),
        isActive: this.data.isActive ?? true,
        description: this.data.description,
        publicationType: this.data.publicationType,
        locationId: this.data.locationId,
        creatorUserId: this.data.creatorUserId,
        petId: this.data.petId,
    };

    return PublicationFactory.createPublication(finalData);
}
}
