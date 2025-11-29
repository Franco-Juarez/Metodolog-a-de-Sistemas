import * as dotenv from 'dotenv';
dotenv.config();
import { Server } from './models/Server.Class';
import { User } from '@supabase/supabase-js';

// Extender tipos de Express globalmente
declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
    accessToken?: string;
  }
}

const server = new Server();
server.listen();
