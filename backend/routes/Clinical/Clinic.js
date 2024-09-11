const express = require("express");
const Clinics = require("../../models/ClinicsModel");
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
  // fetch all Clinics
  Clinics.find()
    .then((clinicData) => {
      res.json(clinicData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "Error fetching Clinics" });
    });
});

router.route("/getClinic/:id").get((req, res) => {
  const id = req.params.id;
  Clinics.findById({ _id: id })
    .then((clinicData) => res.json(clinicData))
    .catch((err) => res.json(err));
});

// update ~ http://localhost:4000/api/Clinics/getClinic/id
router.route("/updateClinic/:id").put(async (req, res) => {
  const id = req.params.id;
  Clinics.findByIdAndUpdate(
    { _id: id },
    {
      clinicName: req.body.clinicName,
      clinicLocation: req.body.clinicLocation,
      clinicContact: req.body.clinicContact,
      clinicWebsite: req.body.clinicWebsite,
    }
  )
    .then((clinicData) => res.json(clinicData))
    .catch((err) => res.json(err));
});

//delete ~ http://localhost:4000/api/Clinics/delete/id
router.route("/delete/:id").delete(async (req, res) => {
  let ClinicID = req.params.id;
  await Clinics.findByIdAndDelete(ClinicID)
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

router.route("/getAll").get(async(req, res) => {
  const clinic= await Clinics.find({}).sort({createdAt:-1}) 

res.status(200).json(clinic)
});

module.exports = router;
