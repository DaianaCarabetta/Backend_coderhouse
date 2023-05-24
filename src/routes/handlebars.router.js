import { Router } from "express";
import ProductManager from "../ProductManager.js";

const handlebarsRouter = Router();
const productManager = new ProductManager();

handlebarsRouter.get('/home', async (req,res) =>{
    const products = await productManager.getProducts(req.query);
    res.render('home', { products: products });
})

handlebarsRouter.get('/realtimeproducts', async (req,res) =>{
    const products = await productManager.getProducts(req.query);
    res.render('realTimeProducts', { products: products });
})

export default handlebarsRouter;
