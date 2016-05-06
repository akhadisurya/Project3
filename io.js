var io = require('socket.io')();
// var currentToken = require('currentToken');
var request = require('request');
rp = require('request-promise')
var key = require('./config/key')
var Chat = require('./models/chat');
var bacon;
var allChats = [];

var totalTranslations =[];

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
    totalTranslations =[];
    console.log("the button was clicked on the front")

    socket.originalLanguage = data.lang;
    console.log(socket.originalLanguage);

    rp({
      method: "GET",
      uri: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
      qs: {
        appId: "Bearer" + " " + bacon,
        from: data.lang, //chnage to actual values not jquery backside
        to: data.lang,
        text: data.toTrans
      }
    })
    // .then(response => console.log(response))
    .then(function(response) {
      console.log(response + " 1");
      return totalTranslations.push({response:response,original: data.toTrans,dl:data.lang,dl2:data.lang,userID:data.userID});
    })
    .then(function(response){
      return rp({
        method: "GET",
        uri: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
        qs: {
          appId: "Bearer" + " " + bacon,
          from: data.lang, //chnage to actual values not jquery backside
          to: data.lang2,
          text: data.toTrans
        }//smile
      })
    })
    // .then(response => console.log(response))
    .then(function(response) {
      console.log(response + " 2");
      return totalTranslations.push({response:response,original: data.toTrans,dl:data.lang,dl2:data.lang2,userID:data.userID});
    })
    .then(function(response) {
      return rp({
        method: "GET",
        uri: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
        qs: {
          appId: "Bearer" + " " + bacon,
          from: data.lang, //chnage to actual values not jquery backside
          to: data.lang3,
          text: data.toTrans
        }
      })
    })
    .then(function(response) {
      console.log(response+ " 3");
      return totalTranslations.push({response:response,original: data.toTrans,dl:data.lang,dl2:data.lang3,userID:data.userID});
    })
    .then(function(response) {
      return rp({
        method: "GET",
        uri: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate",
        qs: {
          appId: "Bearer" + " " + bacon,
        from: data.lang, //chnage to actual values not jquery backside
        to: data.lang4,
        text: data.toTrans
      }
    })
    })
    .then(function(response){
      console.log(response+" 4")
      return totalTranslations.push({response:response,original: data.toTrans,dl:data.lang,dl2:data.lang4,userID:data.userID});
      // console.log(totalTranslations[2] + " All the messages");
    })
    .then(function(response) {
      console.log(response + " levl4 ")
      console.log(totalTranslations);
      io.sockets.emit('back2Front', totalTranslations)
    })
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
      // console.log(data.trim());
    //Create message
    var newMsg = new Chat({

      original_message: data[0].original,
      original_language: data[0].dl2,
      translated_message1: data[1].response,
      translated_language1: data[1].dl,
      translated_message2: data[2].response,
      translated_language2: data[2].dl2,
      translated_message3: data[3].response,
      translated_language3: data[3].dl2,
      user_name: data[0].userID


      // room: data.room.toLowerCase(), //this is for when we adding the rooms part
    });

    // newMsg.push(allChats)
    // for(var i in allChats){
    //   socket.emit("chats", {chat: allChats[i]})
    // }
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
  console.log("banaas in ajams");
  var query = Chat.find('chats');
  query.sort('-created').limit(8).exec(function(err,megs){
    console.log(megs.original_message)
    if(err)throw err;
    io.sockets.emit("loadMessages",megs)
  });
  //console.log(query);
  // Chat.find({}, function(err, chats) {
  //   allChats=[];
   // console.log(chats)
 //  for(var i = 0; i> query.length;i++){
 //    console.log(query);
 //  // allChats += chats[i].original_message + ","
 //   allChats.push([query[i].original_message])
 //   //console.log(allChats[i] + " socket listening of names")
 // }

});

// console.log(io.sockets.adapter.rooms);
// In Socket.IO 0.7 you have a clients method on the namespaces, this returns a array of all connected sockets.
// console.log(io.sockets.clients());
// console.log(io.engine.clientsCount);
// console.log(io.socket);
// console.log(io.sockets);
// console.log(io.of('/') );
});
module.exports = io;
