import mongoose from "mongoose";
import Joi from "joi";

const cartsCollection = "carts";
const CartSchema = new mongoose.Schema({
  products: Joi.array(),
});

export const cartsModel = mongoose.model(cartsCollection, CartSchema);
