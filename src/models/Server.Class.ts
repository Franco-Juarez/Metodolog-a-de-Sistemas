import express, { Application } from 'express';
import * as dotenv from 'dotenv';

export class Server {
    private app: Application;
    private port: string | number;

    constructor() {
        dotenv.config();
        this.app = express();
        this.port = process.env.PORT || 3000;
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${this.port}`);
        });
    }

    public getApp(): Application {
        return this.app;
    }
}