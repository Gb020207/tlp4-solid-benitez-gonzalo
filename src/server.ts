import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import employeeRoutes from './routes/employee.routes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());

// Rutas
app.use('/employees', employeeRoutes);

// Manejador centralizado de errores
app.use(errorHandler);

const PORT = Number(process.env.PORT ?? 3000);
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017/employees_db';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB conectado');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('No se pudo conectar a MongoDB', error);
    process.exit(1);
  });

export default app;
