//This file contains the schema for the user collection in the database
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//declare schema
const Schema = mongoose.Schema;

//create schema
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  addLine1: {
    type: String,
    required: true,
  },
  addLine2: {
    type: String,
    required: true,
  },
  addLine3: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.register = async function (
  firstname,
  lastname,
  contact,
  addLine1,
  addLine2,
  addLine3,
  gender,
  email,
  password
) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({
      firstname,
      lastname,
      contact,
      addLine1,
      addLine2,
      addLine3,
      gender,
      email,
      password: hash,
    });

    return user;
  } catch (error) {
    // Handle any errors that occur during user creation
    throw error;
  }
};

//static login method
userSchema.statics.login = async function(email, password) {
  
  const user = await this.findOne({ email }); // Find the user by email

  if (!user) {
    throw Error("User not found");
  }
  
  const match = await bcrypt.compare(password, user.password)

  if(!match) {
    throw Error("Incorrect password!!");
  }

  return user;
}

//create & export model based on schema
module.exports = mongoose.model("User", userSchema);
