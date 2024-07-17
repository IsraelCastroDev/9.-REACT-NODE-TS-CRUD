import express from "express";
import router from "./router";

// creamos el servidor
const server = express();

// Routing
server.use("/api/products", router);

export default server;
