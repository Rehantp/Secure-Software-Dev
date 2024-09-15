const express = require("express");
const {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  readTest,
} = require("../../controllers/User_controllers");
const router = express.Router();
const rateLimit = require("express-rate-limit");
//import middle ware function - require auth for all routes
const requireAuth = require("../../middleware/requireAuth");

// Define rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 300,
  message: "Too many requests from this IP, please try again after an hour.",
});

router.use(limiter);
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
