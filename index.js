import ProductManager from "./ProductManager.js";

const productManager = new ProductManager();
console.log(await productManager.getProducts());
await productManager.addProduct('Producto Prueba', 'Este es un producto prueba', 200, 'sin imagen', 'abc123', 25);
console.log(await productManager.getProducts());
console.log(await productManager.getProductById(1));
console.log(await productManager.getProductById(10));
await productManager.updateProduct(1, {id: 5, title: 'Producto prueba 2', stock: 10, nacionalidad: 'Arg'})
console.log(await productManager.getProductById(1));
await productManager.deleteProduct(1);
console.log(await productManager.getProducts());