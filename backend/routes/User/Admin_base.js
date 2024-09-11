const adminRoutes = require('./Admin')

module.exports = (app) => {
    app.use('/api/admin', adminRoutes);
  }