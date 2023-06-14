import mongoose from "mongoose";
import Joi from "joi";

const messagesCollection = "messages";
const MessageSchema = new mongoose.Schema({
  user: Joi.string().email({ tlds: { allow: false } }),
  message: Joi.string(),
});

export const messagesModel = mongoose.model(messagesCollection, MessageSchema);
