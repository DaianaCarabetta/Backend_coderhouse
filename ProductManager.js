import Product from "./Product.js";
import fs from "fs";

class ProductManager {
    constructor(){
        this.path = 'products.json'
    }

    async getProducts(){
        const res = await fs.promises.readFile(this.path)
        return JSON.parse(res);
    }

    async addProduct(title, description, price, thumbnail, code, stock){
        const existentProduct = await this.getProductByCode(code);
        if(existentProduct){
            console.error('Existent Product.')
        }else{
            const newProduct = new Product(title, description, price, thumbnail, code, stock);
            newProduct.id = await this.getNewId();
            const products = await this.getProducts();
            products.push(newProduct);
            await fs.promises.writeFile(this.path, JSON.stringify(products))
        }  
    }

    async getNewId(){
        const products = await this.getProducts();
        return products.length + 1;
    }

    async getProductById(id){
        const products = await this.getProducts();
        const existentProduct = products.find(elem => elem.id == id);
        if(existentProduct){
            return existentProduct;
        }else{
            console.error('Not found.')
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
        }else{
            console.error('Product not found.')
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
            console.error('Product not found.')
        }
    }
}

export default ProductManager;
