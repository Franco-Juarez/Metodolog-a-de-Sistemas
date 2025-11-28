// Class para enviar coordenadas y gestionar las ubicaciones
export class Location {
    private id: string;
    private latitude: number;
    private longitude: number;
    private referenceAddress: string;
    private createdAt: Date;
    private creatorUserId: string;

    constructor(
        id: string,
        latitude: number,
        longitude: number,
        referenceAddress?: string,
        createdAt?: Date,
        creatorUserId?: string
    ) {
        this.id = id;
        this.latitude = latitude;
        this.longitude = longitude;
        this.referenceAddress = referenceAddress || '';
        this.createdAt = createdAt || new Date();
        this.creatorUserId = creatorUserId || '';
    }

    public getID(): string {
        return this.id;
    }

    public getLatitude(): number {
        return this.latitude;
    }

    public getLongitude(): number {
        return this.longitude;
    }

    public getReferenceAddress(): string {
        return this.referenceAddress;
    }

    public getLocation(): { latitude: number; longitude: number } {
        return { latitude: this.latitude, longitude: this.longitude };
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getCreatorUserId(): string {
        return this.creatorUserId;
    }

    public setLatitude(latitude: number): void {
        this.latitude = latitude;
    }

    public setLongitude(longitude: number): void {
        this.longitude = longitude;
    }

    public setReferenceAddress(referenceAddress: string): void {
        this.referenceAddress = referenceAddress;
    }
}