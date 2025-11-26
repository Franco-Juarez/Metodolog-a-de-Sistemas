//Class que maneja el crud de la base de datos
import { createClient, SupabaseClient } from '@supabase/supabase-js';

export class Database {
  private static instance: Database;
  private supabase: SupabaseClient;

  private constructor() {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_ANON_KEY!;
    
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  //metodo para crear o obtener la instancia de la base de datos
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  //metodo get para usar el cliente
  public getClient(): SupabaseClient {
    return this.supabase;
  }

}