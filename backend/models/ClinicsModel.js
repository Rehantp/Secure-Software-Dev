const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClinicsSchema = new Schema({
  clinicName: {
    type: String,
    required: true, //validating title field
  },
  clinicLocation: {
    type: String,
    required: true, //validating content field
  },
  clinicContact: {
    type: String,
    required: true, //validating content field
  },
  clinicWebsite: {
    type: String,
    required: false, //validating content field
  },
});

const ClinicModel = mongoose.model("Clinic", ClinicsSchema);
module.exports = ClinicModel;
