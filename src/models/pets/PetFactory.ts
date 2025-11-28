import { Database } from "../DataBase.Class";
import { Pet } from "./Pet.Class";
import { Dog } from "./Dog.Class";
import { Cat } from "./Cat.Class";

const supabase = Database.getInstance().getClient();

type CreatePetData = {
    pet_id?: string;
    name: string;
    type?: string;
    breed?: string;
    color?: string;
    size?: string;
    age?: number;
    gender?: string;
    imageUrl?: string;
    creatorUserId: string;
}

export class PetFactory {
    static async create(petData: CreatePetData): Promise<Pet> {
        const createdAt = new Date().toISOString();

        const insertData: any = {
            name: petData.name,
            type: petData.type || 'Dog',
            breed: petData.breed || '',
            color: petData.color || '',
            size: petData.size || '',
            age: petData.age ?? 0,
            gender: petData.gender || '',
            image_url: petData.imageUrl || '',
            creator_user_id: petData.creatorUserId,
            created_at: createdAt
        };

        const { data, error } = await supabase
            .from('Pet')
            .insert([insertData])
            .select()
            .single();

        if (error) {
            throw new Error(`Error al crear Pet: ${error.message}`);
        }

        const row = data as any;
        const species = (petData.type || 'Dog');
        const petId = row.id_pet;
        const imageUrl = row.image_url || '';

        if (species === 'Dog') {
            return new Dog(petId, row.name, row.breed, row.color, row.size, row.age, row.gender, imageUrl);
        } else {
            return new Cat(petId, row.name, row.breed, row.color, row.size, row.age, row.gender, imageUrl);
        }
    }
}