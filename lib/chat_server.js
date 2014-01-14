var sockets = require('socket.io');


function createChat(server) {
  var guestnumber = 0;
  var nicknames = {};

  var io = sockets.listen(server);
  io.sockets.on('connection', function (socket) {
    socket.emit('chat', { text: "Welcome to AppChat!<br>" });

    guestnumber++;
    nicknames[socket.id] = 'guest' + guestnumber;

    socket.on('submit_message', function (data) {
      var tokens = data["text"].match(/^\/nick (.+)/);
      if(tokens) {
        var msg = _nicknameChangeRequest(tokens[1]);
        socket.emit('chat', { text: msg + "<br>" });
      } else {
        io.sockets.emit("chat", { text: nicknames[socket.id] + ": " + data["text"] + "<br>"});
      }
    });

    function _nicknameChangeRequest(proposedName) {
      if(nicknameExists(proposedName)) {
        return "Name is already used.";
      } else if(proposedName.match(/^guest/i)) {
        return "Name cannot start with 'guest'.";
      } else {
        nicknames[socket.id] = proposedName;
        return "You are now " + proposedName;
      }
    };

    function nicknameExists(nickname){
      var keys = Object.keys(nicknames);
      for (var i = 0; i < keys.length; i++){
        console.log(keys[i] + "=========================");
        if (nicknames[keys[i]] == nickname){
          return true;
        }
      }
      return false;
    }
  });
};


exports.createChat = createChat;

