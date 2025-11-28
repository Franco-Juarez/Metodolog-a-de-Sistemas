import { IPublication, PublicationType } from "./Publication.interface";
import { Database } from "../DataBase.Class";

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

    //recibe un solo "data" que cumple con la interfaz IPublication
    constructor(data: IPublication) {
        this.id = data.id;
        this.createdAt = data.createdAt;
        this.description = data.description;
        this.isActive = data.isActive;
        this.publicationType = data.publicationType;
        this.locationId = data.locationId;
        this.creatorUserId = data.creatorUserId;
        this.petId = data.petId;
    }

    //METODOS---------------------------------------------------------------------
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
    static async disable(id: string) {
        const { error } = await supabase
            .from('Publication')
            .update({ is_active: false })
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return true;
    }


    //HAY Q TESTEAR ESTO---------------------------------------------------

    static async findAll(filters: { type?: string; userId?: string; age?: string; size?: string } = {}) {
        // traer todas las publicaciones activas
        let query = supabase.from('Publication').select('*, Pet!inner(*)').eq('is_active', true);

        // DICCIONARIO DE MAPEO:
        // se define qué filtro corresponde a qué columna en Supabase.
        // si se agregan mas filtros van aca
        const filterMapping: Record<string, string> = {
            type: 'publication_type',
            userId: 'creator_user_id',
            age: 'Pet.age',
            size: 'Pet.size'
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
    static async save(publication: IPublication): Promise<void> {
        const { data, error } = await supabase
            .from('Publication')
            .insert([{
                id: publication.id,
                created_at: publication.createdAt,
                description: publication.description,
                is_active: publication.isActive,
                publication_type: publication.publicationType,
                location_id: publication.locationId,
                creator_user_id: publication.creatorUserId,
                pet_id: publication.petId
            }])
            .select()
            .single();

        if (error) {
            throw new Error(error.message);
        }
    }

    //metodo para actualizar una publicacion
    static async update(id: string, dataToUpdate: any) {
        const { data , error } = await supabase
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