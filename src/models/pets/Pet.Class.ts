//Class que maneja la lógica de pets
export abstract class Pet { 
    private pet_id;
    private name;
    private breed;
    private color;
    private size;
    private age;
    private gender;
    private url: string;
    private createdAt: Date;
    private creatorUserId: string;

    constructor(
        pet_id: string, 
        name: string, 
        breed: string, 
        color: string, 
        size: string, 
        age: number, 
        gender: string, 
        url: string, 
        createdAt?: Date, 
        creatorUserId?: string)
        {
        this.pet_id = pet_id;
        this.name = name;
        this.breed = breed;
        this.color = color;
        this.size = size;
        this.age = age;
        this.gender = gender;
        this.url = url;
        this.createdAt = createdAt || new Date();
        this.creatorUserId = creatorUserId || '';
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
    public getAge(): number {
        return this.age;
    }
    public getGender(): string {
        return this.gender;
    }

    public getUrl(): string {
        return this.url;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }
    public getCreatorUserId(): string {
        return this.creatorUserId;
    }

    public getBasicInfo(): string {
        return `Name: ${this.name}, Color: ${this.color}, Url: ${this.url}`;
    }

    public getFullInfo(): string {
        return `Name: ${this.name}, Breed: ${this.breed}, Color: ${this.color}, Size: ${this.size}, Age: ${this.age}, Gender: ${this.gender}, Url: ${this.url}`;
    }
}