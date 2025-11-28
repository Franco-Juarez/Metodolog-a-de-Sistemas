//Class que maneja las rutas y las conexiones a la base de datos y el authservice
import express, { Application } from 'express';
import cors from 'cors';
import { Database } from './DataBase.Class';
import userRoutes from '../routes/User.Routes';
import publicationRoutes from '../routes/Publications.Routes';
import messageRoutes from '../routes/Message.Routes';

export class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    users: '/api/users',
    publications: '/api/publications',
    messages: '/api/messages',
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';

    // Inicializar
    this.connectDB();
    this.middlewares();
    this.routes();
  }

  // Conectar a la base de datos
  private connectDB(): void {
    Database.getInstance();
    console.log('✅ Base de datos conectada');
  }

  // Configurar middlewares
  private middlewares(): void {
    // CORS
    this.app.use(
      cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );

    // Aumentar límite para permitir imágenes en Base64
    // Una imagen de 5MB se convierte en ~6.7MB en Base64
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ limit: '10mb', extended: true }));
  }

  // Definir rutas
  private routes(): void {
    this.app.get('/', (req, res) => {
      res.send('El servidor está vivo');
    });

    this.app.use(this.apiPaths.users, userRoutes);
    this.app.use(this.apiPaths.publications, publicationRoutes);
    this.app.use(this.apiPaths.messages, messageRoutes);
  }

  // Iniciar servidor
  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}
