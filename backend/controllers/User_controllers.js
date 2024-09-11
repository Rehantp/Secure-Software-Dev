const User = require("../models/User_model");
const test = require("../models/GeneralTest_Modal");
const jwt = require("jsonwebtoken");

// Generate JWT
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '1d'})
}

//Register user 
const createUser = async (req, res) => {
  const {
    firstname,
    lastname,
    contact,
    addLine1,
    addLine2,
    addLine3,
    gender,
    email,
    password,
  } = req.body;

  try {
    const user = await User.register(
      firstname,
      lastname,
      contact,
      addLine1,
      addLine2,
      addLine3,
      gender,
      email,
      password
    );

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token }); // sending JWT back to the browser
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

//Login user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createToken(user._id);

    res.status(200).json({ user, token }); // sending JWT back to the browser
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
}

//Update user
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const {
    firstname,
    lastname,
    contact,
    addLine1,
    addLine2,
    addLine3,
    gender,
    email,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstname,
        lastname,
        contact,
        addLine1,
        addLine2,
        addLine3,
        gender,
        email,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Delete user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Read test data
const readTest = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.SECRET);
    const testData = await test.find();

    res.status(200).json(testData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  readTest
};
