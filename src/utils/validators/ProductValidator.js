import Joi from "joi";

const schema = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  code: Joi.string().required(),
  price: Joi.number().required(),
  status: Joi.boolean().default(true),
  stock: Joi.number().required(),
  category: Joi.string().required(),
  thumbnail: Joi.array().items(Joi.string())
}); 

class ProductValidator {  
  static validate(product){
    return schema.validate(product); 
  } 
}

export default ProductValidator;
