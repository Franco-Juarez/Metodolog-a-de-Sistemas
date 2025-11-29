//Class que maneja la lógica de publicaciones
import { IPublication, PublicationType } from './Publication.interface';
import { Database } from '../DataBase.Class';

const supabase = Database.getInstance().getClient();

export abstract class Publication implements IPublication {
  id: string;
  createdAt: string;
  description: string;
  isActive: boolean;
  publicationType: PublicationType;
  locationId: string;
  creatorUserId: string;
  petId: string;

  constructor(
    id: string,
    createdAt: string,
    description: string,
    isActive: boolean,
    locationId: string,
    creatorUserId: string,
    petId: string
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.description = description;
    this.isActive = isActive;
    this.publicationType = 'lost';
    this.locationId = locationId;
    this.creatorUserId = creatorUserId;
    this.petId = petId;
  }

  //buscar publicacion por id
  static async findById(id: string) {
    const { data, error } = await supabase
      .from('Publication')
      .select('*, Pet(*)')
      .eq('id', id)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  //para desactivar una publicacion
  static async disable(id: string, accessToken?: string) {
    if (accessToken) {
      // Usar API REST directamente para que RLS funcione con el token
      const supabaseUrl = process.env.SUPABASE_URL!;
      const supabaseKey = process.env.SUPABASE_ANON_KEY!;

      const response = await fetch(
        `${supabaseUrl}/rest/v1/Publication?id=eq.${id}`,
        {
          method: 'PATCH',
          headers: {
            apikey: supabaseKey,
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({ is_active: false }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Error al desactivar publicación');
      }

      return true;
    } else {
      // Sin token, usar cliente normal
      const { error } = await supabase
        .from('Publication')
        .update({ is_active: false })
        .eq('id', id);

      if (error) {
        throw new Error(error.message);
      }
      return true;
    }
  }

  static async findAll(
    filters: {
      type?: string;
      userId?: string;
      age?: string;
      size?: string;
    } = {}
  ) {
    // traer todas las publicaciones activas
    let query = supabase
      .from('Publication')
      .select('*, Pet!inner(*)')
      .eq('is_active', true);

    // Diccionario de mapeo: filtro corresponde a columna en Supabase
    const filterMapping: Record<string, string> = {
      type: 'publication_type',
      userId: 'creator_user_id',
      age: 'Pet.age',
      size: 'Pet.size',
    };

    //recorre los filtros recibidos
    Object.entries(filters).forEach(([key, value]) => {
      if (value && filterMapping[key]) {
        query = query.eq(filterMapping[key], value);
      }
    });

    // se ordena y ejecuta
    query = query.order('created_at', { ascending: false });
    const { data, error } = await query;

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  //guarda la publicacion en la base de datos
  static async save(
    publication: IPublication,
    accessToken?: string
  ): Promise<void> {
    // Si hay token, usar cliente autenticado para respetar RLS
    const client = accessToken
      ? Database.getAuthenticatedClient(accessToken)
      : supabase;

    const { data, error } = await client
      .from('Publication')
      .insert([
        {
          id: publication.id,
          created_at: publication.createdAt,
          description: publication.description,
          is_active: publication.isActive,
          publication_type: publication.publicationType,
          location_id: publication.locationId,
          creator_user_id: publication.creatorUserId,
          pet_id: publication.petId,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
  }

  //metodo para actualizar una publicacion
  static async update(id: string, dataToUpdate: any, accessToken?: string) {
    // Si hay token, usar cliente autenticado para respetar RLS
    const client = accessToken
      ? Database.getAuthenticatedClient(accessToken)
      : supabase;

    const { data, error } = await client
      .from('Publication')
      .update(dataToUpdate)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
