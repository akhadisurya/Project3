var io = require('socket.io')();
// var currentToken = require('currentToken');
var request = require('request');
rp = require('request-promise')
var key = require('./config/key')
var Chat = require('./models/chat');
var bacon;
var allChats = [];
// var currentToken ;
// console.log(currentToken)
function runToken(){
  key.new().then((token) => bacon = (JSON.parse(token).access_token))
// key.then((token) => console.log(token))
// console.log("after promise");
setTimeout(function(){console.log(bacon)},1000);
};
// key.new().then((token) => bacon = (JSON.parse(token).access_token))
// // key.then((token) => console.log(token))
// // console.log("after promise");
// setTimeout(function(){console.log(bacon)},1000);
// console.log(bacon + "dammmm gurl");
io.on('connection', function (socket) {
  runToken();
  console.log('Client connected to socket.io!');
  console.log("server side");
  // console.log(currentToken);
  var defaultRoom = 'everyone';
  var rooms = ["Everyone", "en-es", "en-fr"];

  socket.on('winloaded',function(data){
    data=bacon;
    io.sockets.emit('winloaded',data);
  });




  socket.on('wasClicked', function(data){
    console.log("the button was clicked on the front")

    socket.originalLanguage = data.lang;
    console.log(socket.originalLanguage);


    rp({
      method: "GET",
      uri: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
      qs: {
        appId: "Bearer" + " " + bacon,


        from: "en", //chnage to actual values not jquery backside
        to: "es",

        from: data.lang, //chnage to actual values not jquery backside
        to: data.lang2,

        text: data.toTrans
      }
    })
    // .then(response => console.log(response))


    .then(response => io.sockets.emit('back2Front',{response:response,original: data.toTrans,dl:data.lang,dl2:data.lang2,userID:data.userID}))

    .catch(err => console.log(err))
    // io.sockets.emit('back2Front',data);
  });

  //Emit the rooms array
  socket.emit('setup', {
    rooms: rooms
  });

  socket.on('new user', function(data) {
    data.room = defaultRoom;
    //New user joins the default room
    socket.join(defaultRoom);
    //Tell all those in the room that a new user joined
    io.in(defaultRoom).emit('user joined', data);
  });

    //Listens for switch room
    socket.on('switch room', function(data) {
    //Handles joining and leaving rooms
    //console.log(data);
    socket.leave(data.oldRoom);
    socket.join(data.newRoom);
    io.in(data.oldRoom).emit('user left', data);
    io.in(data.newRoom).emit('user joined', data);

  });
    socket.on('sent message', function(data) {
      console.log("i heard sent message broadcast");
      console.log(data);
    //Create message
    var newMsg = new Chat({

      original_message: data.original,
      original_language: data.dl,
      translated_message: data.response,
      translated_language: data.dl2,
      user_name: data.userID


      // room: data.room.toLowerCase(), //this is for when we adding the rooms part
    });
    //Save it to database
    newMsg.save(function(err, msg){
      //Send message to those connected in the room
      if(err) {
        console.log("error: ", err );
      } else {
        console.log("saved", msg);
      }
      // io.in(msg.room).emit('message created', msg);
    });
  });
//   socket.on('add-circle', function(data){
//     io.emit('add-circle', data);
//   });
// // Use maybe for sendign to a specific client group chat !!! :)
//   socket.on('clear-it', function(data){
//     io.emit('clear-it',data);
//   });
console.log("io is running");


io.on("connection", function(){
  //console.log(Chat.find({}));
  Chat.find({}, function(err, chats) {
  for(var i = chats.length - 10; i < chats.length; i++){
  // allChats += chats[i].original_message + ","
   allChats.push([chats[i].original_message])
   //console.log(allChats[i] + " socket listening of names")
 }});
 io.sockets.emit("loadMessages", allChats)
})

// console.log(io.sockets.adapter.rooms);
// In Socket.IO 0.7 you have a clients method on the namespaces, this returns a array of all connected sockets.
// console.log(io.sockets.clients());
// console.log(io.engine.clientsCount);
// console.log(io.socket);
// console.log(io.sockets);
// console.log(io.of('/') );
});

module.exports = io;
