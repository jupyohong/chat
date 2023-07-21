const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('header-box');
const chattingBoxElement = getElementById('chat-box');
const formElement = getElementById('chat-form');

// global socket handlers
socket.on('user_connected', (username) => {
  drawNewChat(`${username} connected!`);
});
socket.on('disconnect_user', (username) => {
  drawNewChat(`${username} has left.`);
});
socket.on('new_chat', (data) => {
  const { chat, from } = data;
  drawNewChat(`${from}: ${chat}`);
});

// event callback functions
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  // alert(inputValue);
  if (inputValue.trim() !== '') {
    socket.emit('send_chat', inputValue);
    drawNewChat(`me: ${inputValue}`, true);
    event.target.elements[0].value = '';
  }
};

// draw functions
const drawHelloStranger = (username) =>
  (helloStrangerElement.innerText = `hello ${username}`);
const drawNewChat = (message, isMe = false) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.className = 'clearfix';
  const chatBox = isMe
    ? `<div class='bg-yellow-300 w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all'>${message}</div>`
    : `<div class='bg-white w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>${message}</div>`;
  wrapperChatBox.innerHTML = chatBox;
  chattingBoxElement.append(wrapperChatBox);
};

function helloUser() {
  let username;
  while (!username?.trim()) {
    username = prompt('what is your name?');
  }
  socket.emit('new_user', username, (data) => {
    drawHelloStranger(data);
  });
}

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

init();
