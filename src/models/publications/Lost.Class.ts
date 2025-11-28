import { Publication } from "./Publication.Class";
import { IPublication } from "./Publication.interface";

export class Lost extends Publication {
    constructor(data: IPublication) {
        super(data); 
        this.publicationType = 'lost'; 
    }
}