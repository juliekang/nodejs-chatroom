$(function(root) {
  var CA = root.CA = (root.CA || {} );

  ChatUI = CA.ChatUI = function () {
    this.socket = io.connect();
    this.chat = new CA.Chat(this.socket);
    this.socket.on('chat', this.displayMessage);
  };

  ChatUI.prototype.getMessage = function(){
    var that = this;
    $('#chat_message').on("submit", function(e){
      e.preventDefault();
      that.message = $('#message_text').val();
      if(that.message.match(/^\//)) {
        that.chat.processCommand(that.message);
      } else {
        that.chat.sendMessage(that.message);
      }
      $('#message_text').val("");
    });
  }

  ChatUI.prototype.displayMessage = function(message){
    $("#chat").append(message['text']);
  }


});

$(function(){
  chatter= new ChatUI();
  chatter.getMessage();
})