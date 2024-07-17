import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router = Router();

router.get("/", getProducts);

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

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

router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name").notEmpty().withMessage("El nombre es obligatorio"),
  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .custom((value) => value > 0)
    .withMessage("Precio no válido"),
  body("availability").isBoolean().withMessage("Valor inválido"),
  handleInputErrors,
  updateProduct
);

router.patch("/", (req, res) => {
  res.json("Desde patch");
});

router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router;
