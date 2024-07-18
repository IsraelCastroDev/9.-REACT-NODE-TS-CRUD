import { exit } from "node:process";
import db from "../config/db";

const clearDB = async () => {
  try {
    await db.sync({ force: true }); // elimina todo los datos de la BD
    console.log("Datos eliminados");
    exit(0); // finaliza correctamente
  } catch (error) {
    console.log(error);
    exit(1); // finaliza con errores
  }
};

if (process.argv[2] === "--clear") {
  clearDB();
}

// console.log(process.argv);
