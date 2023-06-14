import { messagesModel } from "./models/messages.model.js";

class MessagesManager {
  constructor() {
    this.model = messagesModel;
  }

  async createMessage(message) {
    return await this.model.create(message);
  }
}

export default MessagesManager;
