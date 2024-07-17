import express from "express";
import colors from "colors";
import router from "./router";
import db from "./config/db";

// conexion a la base de datos
async function connection() {
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

// habilitar lectura de json en la peticion
server.use(express.json());

// Routing
server.use("/api/products", router);

server.get("/api", (req, res) => {
  res.json({ msg: "Desde api" });
});

export default server;
