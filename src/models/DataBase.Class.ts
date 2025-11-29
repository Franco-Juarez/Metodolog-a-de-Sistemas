//Class que maneja el crud de la base de datos
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class Database {
  private static instance: Database;
  private supabase: SupabaseClient;

  private constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;

    this.supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  //metodo para crear o obtener la instancia de la base de datos
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  //metodo get para usar el cliente (sin autenticación de usuario)
  public getClient(): SupabaseClient {
    return this.supabase;
  }

  //metodo para obtener cliente autenticado con el token del usuario
  public static getAuthenticatedClient(accessToken: string): SupabaseClient {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;

    // Crear cliente con configuración para servidor
    const client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });

    return client;
  }
}
