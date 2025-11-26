import express from 'express';
import cors from 'cors';
import userRoutes from './routes/User.Routes';

const app = express()

// Configurar CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // URL del frontend
    credentials: true, // Permitir cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json())

//rutass
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('el servidor esta vivo');
}
);

export default app;