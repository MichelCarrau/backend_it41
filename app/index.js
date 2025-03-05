import express from 'express';
import 'dotenv/config';
import { Database } from './config/database.config.js';
import { UserRoutes } from './routes/user.routes.js';
import cors from 'cors'

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(
  {
    origin: '*'
  }
))

// Configura y conecta la base de datos
const database = new Database();
database.connection();

// Inicializa las rutas de usuario
const userRoutes = new UserRoutes();
userRoutes.initUserRoutes(app);

// Inicia el servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
