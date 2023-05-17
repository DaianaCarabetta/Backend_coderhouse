import { Router } from "express";
import CartManager from "../CartManager.js";

const cartRouter = Router();
const cartManager = new CartManager()

cartRouter.get('/', async (req, res) =>{
    const result = await cartManager.getCarts();
    res.send(result);
})

cartRouter.get('/:cid', async (req, res) =>{
    const id = req.params.cid;
    const existentCart = await cartManager.getCartById(id)
    if (existentCart){
        res.send(existentCart);
    }else {
        res.status(404).send('Not found');
    }
})

cartRouter.post('/:cid/product/:pid', async (req, res) =>{
    const cid = req.params.cid;
    const pid = req.params.pid;
    const existentCart = await cartManager.addProductToCart(cid, pid)
    if (existentCart){
        res.send(existentCart);
    }else {
        res.status(404).send('Cart or Product Not found');
    }
})

cartRouter.post('/', async (req, res)=> {
    const newCart = await cartManager.createCart();
    res.send (newCart)
})

export default cartRouter;