import { Publication } from "./Publication.Class";
import { IPublication } from "./Publication.interface";

export class Sighted extends Publication {
    constructor(data: IPublication) {
        super(data); 
        this.publicationType = 'sighted'; 
    }
}