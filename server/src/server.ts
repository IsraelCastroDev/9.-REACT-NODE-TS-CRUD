import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db";

// conexion a la base de datos
export async function connection() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.bgBlue.white("Conexión exitosa a la base de datos"));
  } catch (error) {
    // console.log(error);
    console.log(
      colors.bgRed.white("No se ha podido conectar con la base de datos")
    );
  }
}
connection();

// creamos el servidor
const server = express();

// permitir conexiones
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true); // error, permites la conexion? boolean
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));

// habilitar lectura de json en la peticion
server.use(express.json());

// morgan - ver respuestas del servidor en consola
server.use(morgan("dev"));

// Routing
server.use("/api/products", router);

// server.get("/api", (req, res) => {
//   res.json({ msg: "Desde api" });
// });

// Docs
server.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default server;
