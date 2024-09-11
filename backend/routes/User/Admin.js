const express = require("express");
const router = express.Router();
const { readUser, deleteUser } = require("../../controllers/Admin_controllers");
const roleAuthMiddleware = require('../../middleware/roleAuthMiddleware');


//Read all User Details
router.get("/get-all",roleAuthMiddleware(["admin"]), readUser);

//Delete one user 
router.delete("/delete/:id", deleteUser);

module.exports = router;