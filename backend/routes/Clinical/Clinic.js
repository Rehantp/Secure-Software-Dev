const express = require("express");
const mongoose = require("mongoose");
const Clinics = require("../../models/ClinicsModel");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");
const router = express.Router();

// create ~ http://localhost:4000/api/Clinics/newClinic
router.route("/createClinic").post((req, res) => {
  const clinicName = req.body.clinicName;
  const clinicLocation = req.body.clinicLocation;
  const clinicContact = req.body.clinicContact;
  const clinicWebsite = req.body.clinicWebsite;

  const newClinic = new Clinics({
    clinicName,
    clinicLocation,
    clinicContact,
    clinicWebsite,
  });

  newClinic
    .save()
    .then(() => {
      res.json("Clinic Created!!");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error creating Clinic" });
    });
});

// read ~ http://localhost:4000/api/Clinics/admin
router.route("/admin").get((req, res) => {
  // Fetch all Clinics with proper error handling
  Clinics.find()
    .then((clinicData) => {
      res.status(200).json(clinicData); // Respond with 200 status and clinic data
    })
    .catch((err) => {
      console.error("Error fetching Clinics:", err); // Log the error for debugging
      res.status(500).json({ error: "Error fetching Clinics" }); // General error message for client
    });
});

router.route("/getClinic/:id").get((req, res) => {
  const id = req.params.id;
  Clinics.findById({ _id: id })
    .then((clinicData) => res.json(clinicData))
    .catch((err) => res.json(err));
});

// update ~ http://localhost:4000/api/Clinics/getClinic/id
router.route("/updateClinic/:id").put(
  [
    // Input validation and sanitization
    body("clinicName")
      .trim()
      .notEmpty()
      .withMessage("Clinic name is required")
      .isLength({ max: 100 })
      .withMessage("Clinic name must not exceed 100 characters"),
    body("clinicLocation")
      .trim()
      .notEmpty()
      .withMessage("Clinic location is required")
      .isLength({ max: 200 })
      .withMessage("Clinic location must not exceed 200 characters"),
    body("clinicContact")
      .trim()
      .isMobilePhone()
      .withMessage("Invalid clinic contact number"),
    body("clinicWebsite")
      .optional()
      .trim()
      .isURL()
      .withMessage("Invalid clinic website URL"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const clinicId = req.params.id;
    const { clinicName, clinicLocation, clinicContact, clinicWebsite } =
      req.body;

    try {
      // Ensure that the ID is a valid MongoDB ObjectId to prevent malformed queries
      if (!mongoose.Types.ObjectId.isValid(clinicId)) {
        return res.status(400).json({ error: "Invalid Clinic ID" });
      }

      // Use $eq operator to prevent NoSQL injection by matching the _id exactly
      const updatedClinic = await Clinics.findOneAndUpdate(
        { _id: { $eq: clinicId } },
        {
          clinicName,
          clinicLocation,
          clinicContact,
          clinicWebsite,
        },
        { new: true } // To return the updated document
      );

      if (!updatedClinic) {
        return res.status(404).json({ error: "Clinic not found" });
      }

      // Return the updated clinic data
      res.status(200).json({
        message: "Clinic updated successfully",
        clinic: updatedClinic,
      });
    } catch (err) {
      // Log error for internal purposes and return a generic error message
      console.error("Error updating clinic:", err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the clinic" });
    }
  }
);

//delete ~ http://localhost:4000/api/Clinics/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  let ClinicID = req.params.id;

  // Validate the provided ID
  if (!mongoose.Types.ObjectId.isValid(ClinicID)) {
    return res.status(400).json({ error: "Invalid Clinic ID" });
  }

  // Use $eq operator to ensure literal match
  await Clinics.findOneAndDelete({ _id: { $eq: ClinicID } })
    .then(() => {
      res.status(200).send({ status: "Clinic Deleted" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with deleting Clinic", error: err.message });
    });
});

// Set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes.",
});

// Apply the rate limiter to all routes in this router
router.use(limiter);

router.route("/getAll").get(async (req, res) => {
  try {
    const clinic = await Clinics.find({}).sort({ createdAt: -1 });
    res.status(200).json(clinic);
  } catch (err) {
    res.status(500).json({ error: "Server error, try again later." });
  }
});

module.exports = router;
