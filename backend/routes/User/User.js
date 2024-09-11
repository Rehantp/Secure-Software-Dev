const express = require("express");
const { createUser, loginUser, updateUser, deleteUser, readTest } = require("../../controllers/User_controllers");
const router = express.Router();

//import middle ware function - require auth for all routes
const requireAuth = require('../../middleware/requireAuth')

// POST a new user
router.post("/createuser", createUser);

// Login route
router.post("/login", loginUser);

//Update
router.put("/:userId", updateUser);

//Delete
router.delete("/:userId", deleteUser);

//Read all General Test Results
router.get("/read-all", requireAuth, readTest);

module.exports = router;
