import { number, parse, pipe, safeParse, string, transform } from "valibot";
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from "../types";
import axios from "axios";
import { toBoolean } from "../helpers";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export const addProduct = async (data: ProductData) => {
  try {
    const result = safeParse(DraftProductSchema, {
      name: data.name,
      price: +data.price,
    });

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error("Datos no válidos");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);

    const validateProductsData = safeParse(ProductsSchema, data.data);

    if (validateProductsData.success) {
      return validateProductsData.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: Product["id"]) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);

    const validateProductData = safeParse(ProductSchema, data.data);

    if (validateProductData.success) {
      return validateProductData.output;
    } else {
      throw new Error("Hubo un error");
    }
  } catch (error) {
    console.log(error);
  }
};

export async function updateProduct(data: ProductData, id: Product["id"]) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());

    const validateData = safeParse(ProductSchema, {
      id,
      name: data.name,
      availability: toBoolean(data.availability.toString()),
      price: parse(NumberSchema, data.price),
    });

    if (validateData.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, validateData.output);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteProduct(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}

export async function updateProductAvailability(id: Product["id"]) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
