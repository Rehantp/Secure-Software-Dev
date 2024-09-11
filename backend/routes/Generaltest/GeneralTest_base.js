const testRouter = require("./GeneralTest");

module.exports = (app) => {
  app.use("/GeneralTest", testRouter);
};
