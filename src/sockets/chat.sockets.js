import MessagesManager from "../DAO/mongodb/MessagesManager.js";
const messagesManager = new MessagesManager();
const users = {};

class ChatSockets {
  static attachEvents(client) {
    client.on("new-user", async (email) => {
      users[client.id] = email;
      client.broadcast.emit("user-connected", email);
    });

    client.on("send-chat-message", async (message) => {
      await messagesManager.createMessage({
        message: message,
        user: users[client.id],
      });
      client.broadcast.emit("chat-message", {
        message: message,
        email: users[client.id],
      });
    });

    client.on("disconnect", async () => {
      client.broadcast.emit("user-disconnected", users[client.id]);
      delete users[client.id];
    });
  }
}

export default ChatSockets;
