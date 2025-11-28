import { Pet } from "./Pet.Class";

export class Cat extends Pet {
    
    constructor(pet_id: string, name: string, breed: string, color: string, size: string, age: number, gender: string, url: string){ {
        super(pet_id, name, breed, color, size, age, gender, url);
    }
    }
    public validateData(): boolean {
        return true; 
    }
}