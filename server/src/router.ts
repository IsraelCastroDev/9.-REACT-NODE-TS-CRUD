import { Router } from "express";
import { body } from "express-validator";
import { createProduct } from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router = Router();

router.get("/", (req, res) => {
  res.json("Desde get");
});

router.post(
  "/",
  // validación
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  handleInputErrors,
  createProduct
);

router.put("/", (req, res) => {
  res.json("Desde put");
});

router.patch("/", (req, res) => {
  res.json("Desde patch");
});

router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router;
