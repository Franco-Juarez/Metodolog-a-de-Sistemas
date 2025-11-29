import { Database } from './DataBase.Class';

const supabase = Database.getInstance().getClient();

export class StorageService {
  private static readonly BUCKET_NAME = 'pets-images';
  private static readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  static async uploadPetImage(
    fileBuffer: Buffer,
    mimeType: string
  ): Promise<string> {
    try {
      if (fileBuffer.length > this.MAX_FILE_SIZE) {
        throw new Error(
          `El archivo excede el tamaño máximo permitido de ${this.MAX_FILE_SIZE / (1024 * 1024)}MB`
        );
      }

      const extension = this.getExtensionFromMimeType(mimeType);

      const fileName = `pet_${Date.now()}.${extension}`;

      const { data, error } = await supabase.storage
        .from(this.BUCKET_NAME)
        .upload(fileName, fileBuffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (error) {
        console.error('Error al subir archivo a Supabase:', error);
        throw new Error(`Error al subir la imagen: ${error.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from(this.BUCKET_NAME)
        .getPublicUrl(fileName);

      return publicUrlData.publicUrl;
    } catch (error: any) {
      console.error('Error en uploadPetImage:', error);
      throw error;
    }
  }

  private static getExtensionFromMimeType(mimeType: string): string {
    const mimeToExt: { [key: string]: string } = {
      'image/jpeg': 'jpg',
      'image/jpg': 'jpg',
      'image/png': 'png',
      'image/webp': 'webp',
    };

    const extension = mimeToExt[mimeType.toLowerCase()];

    if (!extension) {
      throw new Error(`Tipo de archivo no soportado: ${mimeType}`);
    }

    return extension;
  }
}
