// AdvancedTest_base.js
const advancedTestRoutes = require("./AdvancedTest");

module.exports = (app) => {
  app.use("/api/advancedTest", advancedTestRoutes);
};
