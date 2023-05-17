import Product from "./Product.js";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

class ProductManager {
    constructor(){
        this.path = './src/products.json'
    }

    async getProducts(params = {}){
        const res = await fs.promises.readFile(this.path)
        let products = JSON.parse(res);

        if(params.limit && !isNaN(params.limit)){
            products = products.slice(0, params.limit);
        }

        return products
    }

    async createProduct(product){
        const existentProduct = await this.getProductByCode(product.code);
        if(existentProduct){
            return null;
        }else{
            const newProduct = new Product(
              product.title,
              product.description,
              product.price,
              product.thumbnail,
              product.code,
              product.stock,
              product.status,
              product.category);
            newProduct.id = await this.getNewId();
            const products = await this.getProducts();
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products))
            return newProduct;
        }  
    }

    async getNewId(){
        return uuidv4()
    }

    async getProductById(id){
        const products = await this.getProducts();
        const existentProduct = products.find(elem => elem.id == id);
        if(existentProduct){
            return existentProduct;
        }else{
            return null;
        }
    }

    async getProductByCode(code){
        const products = await this.getProducts();
        let product = products.find(elem => elem.code == code)
        return product;
    }

    async updateProduct(id, data){
        delete data['id'];
        const existentProduct = await this.getProductById(id)
        if(existentProduct){
            const products = await this.getProducts();
            const updateProducts = products.map((product) =>{
                if (existentProduct.id === product.id){
                    const keys = Object.keys(existentProduct)
                    for(let key of keys){
                        if(data[key]) {
                            existentProduct[key] = data[key];
                        }
                    }
                    return existentProduct;
                }else {
                    return product
                }
            })
            await fs.promises.writeFile(this.path, JSON.stringify(updateProducts))
            return existentProduct;
        }else{
           return null;
        }
    }

    async deleteProduct(id){
        const existentProduct = await this.getProductById(id)
        if(existentProduct){
            const products = await this.getProducts();
            const purgedProducts = products.filter((product) => product.id !== existentProduct.id);
            await fs.promises.writeFile(this.path, JSON.stringify(purgedProducts))
            return existentProduct
        }else {
            return null;
        }
    }
}

export default ProductManager;
