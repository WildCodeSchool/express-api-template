const User = require('../models/user');

module.exports.handlePost = async (req, res) => {
  const user = await User.create(req.body);
  return res.status(201).send(user);
};
