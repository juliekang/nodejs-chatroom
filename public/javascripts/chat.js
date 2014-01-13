$(function (root) {
  var CA = root.CA = (root.CA || {});

  Chat = CA.Chat = function (socket) {
    this.socket = socket;
  };

  Chat.prototype.sendMessage = function (message) {
    this.socket.emit("submit_message", {text: message});
  };

});