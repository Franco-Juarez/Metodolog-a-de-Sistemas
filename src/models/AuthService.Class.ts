import { Database } from './DataBase.Class';
import { User } from '@supabase/supabase-js';

const supabase = Database.getInstance().getClient();

export class AuthService {
  static async verifyToken(token: string): Promise<User | null> {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);
      if (error || !user) {
        return null;
      }
      return user;
    } catch (error) {
      console.error('Error verificando token:', error);
      return null;
    }
  }

  static async refreshToken(refreshToken: string) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });
    if (error) {
      throw new Error(error.message);
    }
    if (!data.session) {
      throw new Error('No se pudo refrescar la sesión');
    }
    return data.session;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }
}
