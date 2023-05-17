import ProductValidator from "./validators/ProductValidator.js"

export const validateProduct = product => {
    return ProductValidator.validate(product);
}