const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GeneralTestSchema = new Schema({
  test_name: {
    type: String,
    required: false,
  },
  user_id: {
    type: String,
    required: false,
  },
  test_date: {
    type: Date,
    required: false,
  },
  test_score: {
    type: String,
    required: false,
  },
});

const GeneralTest = mongoose.model("GeneralTest", GeneralTestSchema);
module.exports = GeneralTest;
