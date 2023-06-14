const socket = io();
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const email = prompt("What is your email?");
appendMessage("You joined");
socket.emit("new-user", email);

socket.on("chat-message", (data) => {
  appendMessage(`${data.emailo}: ${data.message}`);
});

socket.on("user-connected", (email) => {
  appendMessage(`${email} connected`);
});

socket.on("user-disconnected", (email) => {
  appendMessage(`${email} disconnected`);
});

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`You: ${message}`);
  socket.emit("send-chat-message", message);
  messageInput.value = "";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
