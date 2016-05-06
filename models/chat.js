var mongoose = require('mongoose');
var chatSchema = new mongoose.Schema({
  original_message: String,
  original_language: String,
  translated_message1: String,
  translated_language1: String,
  translated_message2: String,
  translated_language2: String,
  translated_message3: String,
  translated_language3: String,
  room_id: {type:String,default:"/"},
  user_name: String,
  created: { type: Date, default: Date.now }
});
var Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
