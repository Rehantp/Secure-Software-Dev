const router = require("express").Router();
let Test = require("../../models/GeneralTest_Modal");
const { route } = require("../User/User");
const rateLimit = require("express-rate-limit");
const requireAuth = require("../../middleware/requireAuth");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after an hour.",
});

router.use(limiter);
router.use(requireAuth);

// Update or add test
router.route("/addTest").post((req, res) => {
  const test_name = "General Test";
  const user_id = req.user.firstname;
  const test_date = new Date();
  const test_score = req.body.test_score;

  // Find an existing test record for the user
  Test.findOne({ user_id: user_id })
    .then((existingTest) => {
      if (existingTest) {
        existingTest.test_date = test_date;
        existingTest.test_score = test_score;

        existingTest
          .save()
          .then(() => {
            res.json("Test updated!");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        // If no existing record is found, create a new one
        const newTest = new Test({
          test_name,
          user_id,
          test_date,
          test_score,
        });

        newTest
          .save()
          .then(() => {
            res.json("Test added!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/delete-all").delete((req, res) => {
  const userId = req.user.firstname;

  const userToDeleteId = req.user.firstname;

  Test.deleteMany({ user_id: userToDeleteId })
    .then(() => {
      res.json(
        "All General Test data for the specified user_id deleted successfully."
      );
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json("Error deleting General Test data for the specified user_id.");
    });
});

module.exports = router;
