import { Router } from "express";
import { body, param } from "express-validator";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateAvailability,
  updateProduct,
} from "./handlers/product";
import { handleInputErrors } from "./middlewares";

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The product name
 *          example: Monitor 42 pulgadas
 *        price:
 *          type: number
 *          description: The product price
 *          example: 30000
 *        availability:
 *          type: boolena
 *          description: The product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *    get:
 *      summary: Get a list of products
 *      tags:
 *        - Products
 *      description: Return a list of products
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *                schema:
 *                    type: array
 *                    items:
 *                        $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *      summary: Get a product by ID
 *      tags:
 *        - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrieve
 *          required: true
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                schema:
 *                    $ref: '#/components/schemas/Product'
 *          404:
 *            description: Product not found
 *          400:
 *            description: Bad request - Invalid ID
 */

router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *    post:
 *      summary: Create a new product
 *      tags:
 *        - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor 42 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 30000
 *      responses:
 *        201:
 *            description: Successful response
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - invalid data
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *      summary: Updates a product with user input
 *      tags:
 *        - Products
 *      description: Updates a product with user input
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                        example: "Monitor 42 pulgadas"
 *                      price:
 *                        type: number
 *                        example: 30000
 *                      availability:
 *                        type: boolean
 *                        example: true
 *      responses:
 *          200:
 *            description: Successful response
 *            content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *          400:
 *            description: Bad request - invalid data
 *          404:
 *            description: Product not found
 */

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

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *      summary: Updates a product availability
 *      tags:
 *        - Products
 *      description: Returns the updated availability
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to update
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Product'
 *        400:
 *          description: Bad request - invalid ID
 *        404:
 *          description: Product not found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *      summary: Delete a product
 *      tags:
 *        - Products
 *      description: Delete a product
 *      parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema:
 *              type: integer
 *      responses:
 *        200:
 *          description: Successful response
 *          content:
 *              application/json:
 *                schema:
 *                  type: string
 *                  value: "Producto eliminado"
 *        400:
 *          description: Bad request - invalid ID
 *        404:
 *          description: Product not found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

export default router;
