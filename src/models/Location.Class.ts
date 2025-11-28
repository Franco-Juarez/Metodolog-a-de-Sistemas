import { Database } from './DataBase.Class';
const supabase = Database.getInstance().getClient();

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

    static async create(
        latitude: number,
        longitude: number,
        creatorUserId: string,
        referenceAddress?: string
    ): Promise<Location> {
        const { data, error } = await supabase
            .from('Location')
            .insert([{
                latitude,
                longitude,
                creator_user_id: creatorUserId,
                reference_address: referenceAddress
            }])
            .select()
            .single();

        if (error) {
            throw new Error(`Error al crear Location: ${error.message}`);
        }

        return new Location(
            data.id,
            data.latitude,
            data.longitude,
            data.reference_address || '',
            new Date(data.created_at),
            data.creator_user_id
        );
    }
}