var User = require('../models/user');
var Chat = require('../models/chat');

module.exports = {
  create: create,
  delete: del,
  index: index
};

function index(req, res) {
    Chat.find({}, function(err, chats) {
      console.log("im on index")
      if (err) return res.status(err.statusCode || 500).json(err);
      res.json(chats);
    });
}

function create(req, res) {
  User.findById(req.user.id, function(err, user) {
    user.chats.push({ content: req.body.chat });
    user.save(function(err) {
      res.json(chat);
    });
  });
}

function del(req, res) {

}

