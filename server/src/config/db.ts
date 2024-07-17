import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// cargamos las variables de entorno
dotenv.config();

// configuramos la base de datos
const db = new Sequelize(process.env.DATABASE_URL!);

export default db;
