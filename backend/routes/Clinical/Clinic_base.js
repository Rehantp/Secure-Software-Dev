const clinicRouter = require("./Clinic.js");

module.exports = (app) => {
  app.use("/Clinics", clinicRouter);
};
