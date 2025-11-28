import { Publication } from "./Publication.Class";
import { IPublication } from "./Publication.interface";

export class Adoption extends Publication {
    constructor(data: IPublication) {
        super(data); 
        this.publicationType = 'adoption'; 
    }
}