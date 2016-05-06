

// Browser code only

console.log("Start browser code")
var allChats = [];

$(function() {
  // load all chats one time at load
  $.get('/api/chats', function(chats) {
    console.log(chats[15].original_message)

    //allChats = chats;

    // for(var i = 0; i < chats.length; i++){
    //   // allChats += chats[i].original_message + ","
    //    allChats.push([chats[i].original_message])
    //   // console.log(allChats[i])
    // }
    //console.log(allChats)
  });
})
