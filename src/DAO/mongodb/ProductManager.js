import { productModel } from "./models/product.model.js";

class ProductManager {
  constructor() {
    this.model = productModel;
  }

  async getProducts(params = {}) {
    try {
      const offset = parseInt(params.offset) || 0;
      const limit = parseInt(params.limit) || 0;

      return await this.model.find().skip(offset).limit(limit).lean();
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id, data) {
    return await this.model.findOneAndUpdate({ _id: id }, data, {
      returnDocument: "after",
    });
  }

  async deleteProduct(id) {
    await this.model.remove({ _id: id });
    return {
      _id: id,
    };
  }

  async createProduct(product) {
    return await this.model.create(product);
  }
}

export default ProductManager;
