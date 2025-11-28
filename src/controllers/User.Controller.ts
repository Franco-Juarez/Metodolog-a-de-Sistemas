import { Request, Response } from 'express';
import { PublicationBuilder } from '../models/publications/Publication.Builder';
import { PublicationType } from '../models/publications/Publication.interface';
import { Publication } from '../models/publications/Publication.Class';
import { Pet } from '../models/pets/Pet.Class';

export class PublicationController {
//para crear una publicación
    static async create(req: Request, res: Response) {
        try {
            //recibe los datos del body
            const { description, creatorUserId, publicationType, petName, petType, petBreed, petColor, petSize, petAge, petURL, latitude, longitude, referencea_adress } = req.body;

            //creacion de la mascota 
            const newPet = await Pet.createPet({
                name: petName,
                type: petType,
                breed: petBreed,
                color: petColor,
                size: petSize,
                age: petAge,
                url: petURL
            });
            const petId = newPet.getID();

            //creacion de la locacion
            const newLocation = await Location.createLocation({
                latitude: latitude,
                longitude: longitude,
                reference_address: referencea_adress
            });
            const locationId = newLocation.getID();

              //valida q el tipo d publicacion este bien
              const validTypes: PublicationType[] = ['lost', 'found', 'sighted', 'adoption'];
                
              //para validar el string recibido
              if (!validTypes.includes(publicationType as PublicationType)) {
                    return res.status(400).json({ message: 'Tipo de publicación inválido' });
                }
            
            //se instancia al builder con el tipo
            const builder = new PublicationBuilder(publicationType as PublicationType)
            const newPublication = builder
                .withDescription(description)
                .withLocationId(locationId)
                .withCreatorUserId(creatorUserId)
                .withPetId(petId)
                .build();
            
            console.log('Publicación creada en la memoria:', newPublication);
            return res.status(201).json({ message: 'Publicación creada con éxito', data: newPublication });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    }

    //para obtener publicaciones, ruta get
    static async getAll(req: Request, res: Response) {
        try {
            //s leen los filtros de la URL
            const { type, user, age, size} = req.query;
            console.log("Buscando publicaciones con filtros:", { type, user, age, size });

            //llama al modelo
            const publications = await Publication.findAll({
                type: type as string,
                userId: user as string,
                age: age as string,
                size: size as string
            });

            return res.status(200).json({
                message: 'Publicaciones obtenidas con éxito',
                count: publications?.length || 0,
                data: publications || []
            });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    }

    //para obtener publicaciones por id

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const publication = await Publication.findById(id);

            if (!publication) {
                return res.status(404).json({ message: 'Publicación no encontrada' });
            }

            res.status(200).json({ message: 'Publicación encontrada', data: publication });
        } catch (error: any) {
            console.error(error);
            res.status(500).json({ message: 'Error al buscar la publicación', error: error.message });
        }
    }
}
