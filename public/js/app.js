var allChats;

$(function() {
  // load all chats one time at load
  $.get('/api/chats', function(data) {
    allChats = data;
    render('index');
  });
})
