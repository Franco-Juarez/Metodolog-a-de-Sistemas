import { Publication } from "./Publication.Class";
import { IPublication } from "./Publication.interface";

export class Found extends Publication {
    constructor(data: IPublication) {
        super(data); 
        this.publicationType = 'found'; 
    }
}