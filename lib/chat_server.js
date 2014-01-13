var sockets = require('socket.io');

function createChat(server) {
  var io = sockets.listen(server);
  // io.listen(server);
  io.sockets.on('connection', function (socket) {
    console.log("CONNECTED!!!!!!!!!!!!!!!!!!!!!!!!");
    socket.emit('chat', { text: "Welcome to AppChat<br>" });
    socket.on('submit_message', function (data) {
      console.log("GOT THIS: " + data["text"]);
      io.sockets.emit("chat", { text: data["text"] + "<br>"});
    });
  });
};

exports.createChat = createChat;

