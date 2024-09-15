const express = require("express");
const router = express.Router();
const { readUser, deleteUser } = require("../../controllers/Admin_controllers");
const roleAuthMiddleware = require("../../middleware/roleAuthMiddleware");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 300,
  message: "Too many requests from this IP, please try again after an hour.",
});

router.use(limiter);

//Read all User Details
router.get("/get-all", roleAuthMiddleware(["admin"]), readUser);

//Delete one user
router.delete("/delete/:id", deleteUser);

module.exports = router;
