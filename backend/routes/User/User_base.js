const userRoutes = require('./User')

module.exports = (app) => {
    app.use('/api/users', userRoutes);
  }