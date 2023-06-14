import { cartsModel } from "../mongodb/models/cart.model.js";
import ProductManager from "../mongodb/ProductManager.js";

class CartManager {
  constructor() {
    this.model = cartsModel;
  }

  async getCarts() {
    try {
      return await this.model.find();
    } catch (error) {
      throw error;
    }
  }

  async getCartById(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  async addProductToCart(cid, pid) {
    const existentCart = await this.getCartById(cid);
    if (existentCart) {
      const productManager = new ProductManager();
      const existentProduct = await productManager.getProductById(pid);

      if (existentProduct) {
        let productInCart = existentCart.products.find((product) =>
          existentProduct._id.equals(product.id)
        );
        if (productInCart) {
          productInCart.quantity += 1;
          existentCart.products = existentCart.products.map((product) => {
            if (productInCart.id.equals(product._id)) {
              return productInCart;
            } else {
              return product;
            }
          });
        } else {
          productInCart = {
            id: existentProduct._id,
            quantity: 1,
          };
          existentCart.products.push(productInCart);
        }
        existentCart.markModified("products");
        await existentCart.save();
        return existentCart;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async createCart() {
    return await this.model.create({
      products: [],
    });
  }
}

export default CartManager;
