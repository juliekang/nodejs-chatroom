$(function (root) {
  var CA = root.CA = (root.CA || {});

  Chat = CA.Chat = function (socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit("submit_message", {text: message});
  };

  Chat.prototype.processCommand = function (message) {
    var command = message.match(/^\/(.*) (.*)/);
    if(!command || command.length < 2) {
      this.socket.emit("invalid_command", {text: message + " is not a valid command."});
    } else {
      switch(command[1])
      {
      case "nick":
        this.socket.emit("nicknameChangeResult", {nickname: command[2]});
        break;
      default:
        this.socket.emit("invalid_command", {text: message + " is not a valid command."});
        break;
      }
    }
  };

});