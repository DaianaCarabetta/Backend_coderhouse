import { Router } from "express";
import ProductManager from "../DAO/mongodb/ProductManager.js";
import { validateProduct } from "../utils/index.js";

const productsRouter = Router();
const productManager = new ProductManager();

productsRouter.get("/", async (req, res) => {
  const result = await productManager.getProducts(req.query);
  res.send(result);
});

productsRouter.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const existentProduct = await productManager.getProductById(id);
  if (existentProduct) {
    res.send(existentProduct);
  } else {
    res.status(404).send("Not found");
  }
});

productsRouter.post("/", async (req, res) => {
  const product = req.body;
  const validationResult = validateProduct(product);
  if (validationResult.error) {
    res
      .status(400)
      .send({ status: "error", msg: validationResult.error.details });
  } else {
    const newProduct = await productManager.createProduct(
      validationResult.value
    );
    if (newProduct) {
      res.send(newProduct);
    } else {
      res.status(400).send({ status: "error", msg: "Existent Product." });
    }
  }
});

productsRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const data = req.body;
  const updatedProd = await productManager.updateProduct(id, data);
  if (!updatedProd) {
    res.status(404).send({ status: "error", msg: "Product not found" });
  } else {
    res.send(updatedProd);
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const deletedProduct = await productManager.deleteProduct(id);
  if (!deletedProduct) {
    res.status(404).send({ status: "error", msg: "Product not found" });
  } else {
    res.send(deletedProduct);
  }
});

export default productsRouter;
