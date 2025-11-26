//Class que maneja la lógica de pets
export abstract class Pet { 
    private pet_id;
    private name;
    private breed;
    private color;
    private size;
    private age;
    private gender;

    constructor(pet_id: string, name: string, breed: string, color: string, size: string, age: number, gender: string){
        this.pet_id = pet_id;
        this.name = name;
        this.breed = breed;
        this.color = color;
        this.size = size;
        this.age = age;
        this.gender = gender;
    }
    public getID(): string {
        return this.pet_id;
    }

    public getName(): string {
        return this.name;
    }

    public getBreed(): string {
        return this.breed;
    }

    public getColor(): string {
        return this.color;
    }

    public getSize(): string {
        return this.size;
    }

    public getBasicInfo(): string {
        return `Name: ${this.name}, Breed: ${this.breed}, Color: ${this.color}, Size: ${this.size}, Age: ${this.age}, Gender: ${this.gender}`;
    }

    public getSpecies(): string {
        return this.constructor.name; // Devuelve 'Dog' o 'Cat'
    }

    public abstract validateData(): boolean;       
}
//faltan validaciones de datos
//crear método para filtrar todos los animales perdidos
//luego para filtrar por tipo de animal dog o cat
