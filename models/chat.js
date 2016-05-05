var mongoose = require('mongoose');

var chatSchema = new mongoose.Schema({
  original_message: String,
  original_language: String,
  translated_message: String,
  translated_language: String,
  room_id: {type:String,default:"/"},
  user_name: String,
  created: { type: Date, default: Date.now }
});

var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
