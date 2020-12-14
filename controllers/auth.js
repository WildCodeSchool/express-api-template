const User = require('../models/user');

module.exports.login = async (req, res) => {
  const user = User.findByEmail(req.body.email);
  if (user && (await User.verifyPassword(user, req.body.password))) {
    req.session.userId = user.id;
    req.session.save((err) => {
      if (err) return res.sendStatus(500);
      return res.send(200);
    });
  } else {
    res.send(401);
  }
};
