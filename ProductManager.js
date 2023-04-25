import Product from "./Product.js";

class ProductManager {
    constructor(){
        this.products = []
    }

    getProducts(){
        return this.products;
    }

    addProduct(title, description, price, thumbnail, code, stock){
        const existentProduct = this.getProductByCode(code);
        if(existentProduct){
            console.error('Existent Product.')
        }else{
            const newProduct = new Product(title, description, price, thumbnail, code, stock);
            newProduct.id = this.getNewId();
            this.products.push(newProduct)
        }  
    }

    getNewId(){
        return this.products.length + 1;
    }

    getProductById(id){
        const existentProduct = this.products.find(elem => elem.id == id);
        if(existentProduct){
            return existentProduct;
        }else{
            console.error('Not found.')
            return null;
        }
    }

    getProductByCode(code){
        let product = this.products.find(elem => elem.code == code)
        return product;
    }
}



export default ProductManager;
