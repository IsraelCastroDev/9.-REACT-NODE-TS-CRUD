import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// cargamos las variables de entorno
dotenv.config();

// configuramos la base de datos
const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*.ts"],
  logging: false, // desactivar console.log
});

export default db;
