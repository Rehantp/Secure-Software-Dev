const User = require("../models/User_model");

//Read user data
const readUser = async (req, res) => {
    User
      .find()
      .then((AllUserData) => {
        res.json(AllUserData);
      })
      .catch((err) => {
        console.log(err);
      });
  
  };

  //Delete one user
  const deleteUser = async (req, res) => {
    const id = req.params.id;
    User
      .findByIdAndDelete(id)
      .then(() => {
        res.json("User deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  module.exports = {
    deleteUser,
    readUser
  };
  