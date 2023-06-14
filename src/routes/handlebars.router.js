import { Router } from "express";
import ProductManager from "../DAO/mongodb/ProductManager.js";

const handlebarsRouter = Router();
const productManager = new ProductManager();

handlebarsRouter.get("/home", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products: products });
});

handlebarsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", { products: products });
});

handlebarsRouter.get("/chat", async (req, res) => {
  res.render("chat");
});

export default handlebarsRouter;
