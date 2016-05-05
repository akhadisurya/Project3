var User = require('../models/user');

module.exports = {
  create: create,
  delete: del
};

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
