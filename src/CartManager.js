import fs from "fs";
import Cart from "./Cart.js";
import { v4 as uuidv4 } from 'uuid';
import ProductManager from "./ProductManager.js";

class CartManager {
    constructor(){
        this.path = './src/carts.json'
    }

    async getCarts(showProducts = false){
        const res = await fs.promises.readFile(this.path)
        const carts = JSON.parse(res);
        return carts;
    }

    async getCartById(id){
        const carts = await this.getCarts();
        const existentCart = carts.find(elem => elem.id == id);
        if(existentCart){
            return existentCart;
        }else{
            return null;
        }
    }

    async addProductToCart(cid, pid){
        const existentCart = await this.getCartById(cid);
        if(existentCart) {
            const productManager = new ProductManager();
            const existentProduct = await productManager.getProductById(pid);
            
            if(existentProduct) {
                let productInCart = existentCart.products.find((product) => product.id === existentProduct.id);
                console.log(productInCart)
                if(productInCart) {
                    productInCart.quantity += 1;
                    existentCart.products = existentCart.products.map((product) => {
                        if(product.id === productInCart.id) {
                            return productInCart;
                        }else{
                            return product;
                        }
                    })
                }else {
                    productInCart = {
                        id: existentProduct.id,
                        quantity: 1
                    }
                    existentCart.products.push(productInCart);
                }
                let carts = await this.getCarts();
                carts = carts.map((cart) => {
                    if(cart.id === existentCart.id) {
                        return existentCart;
                    }else{
                        return cart;
                    }
                })
                await fs.promises.writeFile(this.path, JSON.stringify(carts))
                return existentCart;
            }else {
                return null;
            }
        }else{
            return null;
        }
    }

    async getNewId(){
        const products = await this.getProducts();
        return products.length + 1;
    }

    async createCart(){
        const newCart = new Cart();
        newCart.id = uuidv4();
        const carts = await this.getCarts();
        carts.push(newCart);
        await fs.promises.writeFile(this.path, JSON.stringify(carts))
        return newCart;
    }
}

export default CartManager;