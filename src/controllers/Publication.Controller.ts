import { Request, Response } from 'express';
import { PublicationBuilder } from '../models/publications/Publication.Builder';
import { PublicationType } from '../models/publications/Publication.interface';
import { Publication } from '../models/publications/Publication.Class';
import { PetFactory } from '../models/pets/PetFactory';
import { Location } from '../models/Location.Class';

export class PublicationController {
  //para crear una publicación
  static async create(req: Request, res: Response) {
    try {
      //obtiene el userId del token
      const creatorUserId = req.user!.id;

      //recibe los datos del body
      const {
        description,
        publicationType,
        petName,
        petType,
        petBreed,
        petColor,
        petSize,
        petAge,
        petURL,
        latitude,
        longitude,
        reference_address,
      } = req.body;

      //creacion de la mascota
      const newPet = await PetFactory.create({
        name: petName,
        type: petType,
        breed: petBreed,
        color: petColor,
        size: petSize,
        age: petAge,
        imageUrl: petURL,
        creatorUserId: creatorUserId,
      });
      const petId = newPet.getID();
      console.log('Pet creado con ID:', petId);

      //creacion de la locacion
      const newLocation = await Location.create(
        latitude,
        longitude,
        creatorUserId,
        reference_address
      );
      const locationId = newLocation.getID();
      console.log('Location creado con ID:', locationId);

      //valida q el tipo d publicacion este bien
      const validTypes: PublicationType[] = [
        'lost',
        'found',
        'sighted',
        'adoption',
      ];

      //para validar el string recibido
      if (!validTypes.includes(publicationType as PublicationType)) {
        return res
          .status(400)
          .json({ message: 'Tipo de publicación inválido' });
      }

      //se instancia al builder con el tipo
      const builder = new PublicationBuilder(
        publicationType as PublicationType
      );
      const newPublication = builder
        .withDescription(description)
        .withLocationId(locationId)
        .withCreatorUserId(creatorUserId)
        .withPetId(petId)
        .build();

      //guarda la publicacion en la bd
      await Publication.save(newPublication, req.accessToken);

      return res
        .status(201)
        .json({
          message: 'Publicación creada con éxito',
          data: newPublication,
        });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error interno del servidor', error: error.message });
    }
  }

  //para obtener publicaciones, ruta get
  static async getAll(req: Request, res: Response) {
    try {
      //s leen los filtros de la URL
      const { type, user, age, size } = req.query;
      console.log('Buscando publicaciones con filtros:', {
        type,
        user,
        age,
        size,
      });

      //llama al modelo
      const publications = await Publication.findAll({
        type: type as string,
        userId: user as string,
        age: age as string,
        size: size as string,
      });

      return res.status(200).json({
        message: 'Publicaciones obtenidas con éxito',
        count: publications?.length || 0,
        data: publications || [],
      });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Error interno del servidor', error: error.message });
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

      res
        .status(200)
        .json({ message: 'Publicación encontrada', data: publication });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({
          message: 'Error al buscar la publicación',
          error: error.message,
        });
    }
  }

  //para desactivar una publicacion
  static async disable(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.user!.id;

      //busca la publicacion
      const publication = await Publication.findById(id);
      if (!publication) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }

      //verifica q el usuario sea el creador
      if (publication.creator_user_id !== userId) {
        return res
          .status(403)
          .json({
            message: 'No tienes permiso para eliminar esta publicación',
          });
      }

      //si se verifica q es el dueno, se desactiva
      await Publication.disable(id, req.accessToken);
      return res
        .status(200)
        .json({ message: 'Publicación desactivada con éxito' });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({
          message: 'Error al desactivar la publicación',
          error: error.message,
        });
    }
  }

  //metodo para actualizar una publicacion
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { description, is_active } = req.body;
      const userId = req.user!.id;

      //busca la publicacion para ver d quien es
      const publication = await Publication.findById(id);
      if (!publication) {
        return res.status(404).json({ message: 'Publicación no encontrada' });
      }
      //verifica q el usuario sea el creador
      if (publication.creator_user_id !== userId) {
        return res
          .status(403)
          .json({
            message: 'No tienes permiso para actualizar esta publicación',
          });
      }

      //s preparan los datos para supabase
      const dataToUpdate: any = {};
      if (description !== undefined) dataToUpdate.description = description;
      if (is_active !== undefined) dataToUpdate.is_active = is_active;

      //actualiza
      const updatedPublication = await Publication.update(
        id,
        dataToUpdate,
        req.accessToken
      );

      return res
        .status(200)
        .json({
          message: 'Publicación actualizada con éxito',
          data: updatedPublication,
        });
    } catch (error: any) {
      console.error(error);
      res
        .status(500)
        .json({
          message: 'Error al actualizar la publicación',
          error: error.message,
        });
    }
  }
}
