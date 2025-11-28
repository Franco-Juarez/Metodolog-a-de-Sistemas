//Class que maneja la lógica de creación de usuarios
import { Database } from './DataBase.Class';
import { User as SupabaseUser } from '@supabase/supabase-js';

export class User {
    private get supabase() {
        return Database.getInstance().getClient();
    }

    //metodos d AUTENTICACION ----------------------------------------
    //metodo par registrar usuarios
    async register(email: string, password: string): Promise<SupabaseUser> {
        const { data, error } = await this.supabase.auth.signUp({
            email: email,
            password: password,
        });
        if (error) {
            console.error('Error en el registro:', error.message);
            throw new Error(error.message);
        }
        if (!data.user) {
            throw new Error('No se pudo crear el usuario');
        }
        console.log('Usuario registrado:');
        return data.user;
    }
    //metodo para loguear usuarios
    async login(email: string, password: string) {
        console.log('Intentando iniciar sesión con:', email);
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            console.error('Error en el inicio de sesión:', error.message);
            throw new Error(error.message);
        }
        console.log('Usuario inició sesión:');
        return data.session;
    }
    //metodo para cerrar sesión
    async logout() {
        console.log('Cerrando sesión');
        const { error } = await this.supabase.auth.signOut();
        if (error) {
            console.error('Error al cerrar sesión:', error.message);
        } else {
            console.log('Sesión cerrada');
        }
    }

    //metodos dde PERFIL----------------------------------------
    // met para actualizar el perfil del usuario
    async updateProfile(userId: string, profileData: { username?: string; user_lastname?: string; phone?: string }) {
        const { data, error } = await this.supabase
            .from('users')
            .update(profileData)
            .eq('id', userId);
        if (error) {
            console.error('Error al actualizar el perfil:', error.message);
            return null;
        }
        console.log('Perfil actualizado!');
        return data;
    }

    //metodo para obtener el perfil del usuario
    async getProfile(userId: string) {
        const { data, error } = await this.supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (error) {
            console.error('Error al obtener el perfil:', error.message);
            throw new Error('No se pudo obtener el perfil del usuario');
        }
        console.log('Perfil obtenido!');
        return data;
    }
}