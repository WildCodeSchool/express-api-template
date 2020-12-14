const contactRoutes = require('./contacts');
const userRoutes = require('./users');
const authRoutes = require('./auth');

module.exports = (app) => {
  app.use('/contacts', contactRoutes);
  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);
};
