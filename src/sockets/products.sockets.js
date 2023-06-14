import ProductManager from "../DAO/mongodb/ProductManager.js";
const productManager = new ProductManager();

class ProductsSockets {
  static attachEvents(client) {
    client.on("createProduct", async (data) => {
      const newProduct = await productManager.createProduct(data);
      client.emit("createdProduct", newProduct);
    });

    client.on("deleteProduct", async (id) => {
      const deletedProduct = await productManager.deleteProduct(id);
      client.emit("deletedProduct", deletedProduct);
    });
  }
}

export default ProductsSockets;
