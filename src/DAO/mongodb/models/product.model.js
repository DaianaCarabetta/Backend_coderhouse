import Joi from "joi";
import mongoose from "mongoose";

const productsCollection = "productos";
const ProductSchema = new mongoose.Schema({
  id: Joi.string(),
  title: Joi.string(),
  description: Joi.string(),
  price: Joi.number(),
  thumbnail: Joi.array(),
  code: Joi.string(),
  stock: Joi.number(),
  status: Joi.boolean(),
  category: Joi.string(),
});

export const productModel = mongoose.model(productsCollection, ProductSchema);
