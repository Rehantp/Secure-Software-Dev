import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import VideoBG from "../../assets/Backround_video.mp4";
import "../../styles/GeneralTest/Clinical/forms.css";

function CreateClinic() {
  const [clinicName, setclinicName] = useState("");
  const [clinicLocation, setclinicLocation] = useState("");
  const [clinicContact, setclinicContact] = useState("");
  const [clinicWebsite, setclinicWebsite] = useState("");
  const navigate = useNavigate();

  const ValidateForm = () => {
    let isValid = true;

    if (!clinicName) {
      isValid = false;
      toast.error("Enter the clinic Name for your clinic!");
    } else if (!clinicLocation) {
      isValid = false;
      toast.error("Enter clinic Location to create a clinic!!");
    }
    return isValid;
  };

  const Submit = (e) => {
    e.preventDefault();

    if (ValidateForm()) {
      const newClinicData = {
        clinicName,
        clinicLocation,
        clinicContact,
        clinicWebsite,
      };

      axios
        .post("http://localhost:4000/Clinics/createClinic", newClinicData)
        .then(() => {
          toast.success("New Clinic Created!");
          setTimeout(() => {
            navigate("/admin");
          }, 3000);
        })
        .catch((err) => {
          toast.error("An Error Occured : ", err);
        });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <video
        src={VideoBG}
        autoPlay
        loop
        muted
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        title="Background Video"
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh", // Adjusted height to cover the entire viewport
        }}
      >
        <div className="custom-gradient">
          <form onSubmit={Submit}>
            <h2 className="header">Add Clinic</h2>
            <div className="mb-2">
              <label className="text" htmlFor="">
                Clinic Name
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Clinic Name"
                className="form-conrol"
                required
                onChange={(e) => setclinicName(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="text" htmlFor="">
                Location
              </label>
              <br />
              <input
                type="text"
                placeholder="Enter Clinic location"
                className="form-conrol"
                required
                onChange={(e) => setclinicLocation(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="text" htmlFor="">
                Contact
              </label>
              <br />
              <input
                placeholder="Contact Number(Ex:07xxxxxxxx)"
                className="form-conrol"
                type="tel"
                pattern="^\d{3}\d{4}\d{3}$"
                required
                onChange={(e) => setclinicContact(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="text" htmlFor="">
                Website
              </label>
              <br />
              <input
                // type="text"
                // pattern="^\www.[a-zA-Z0-9]+.lk"
                type="url"
                placeholder="Website (Ex:http://www.example.lk)"
                className="form-conrol"
                onChange={(e) => setclinicWebsite(e.target.value)}
              />
            </div>

            <button className="btn btn-update">Submit</button>
          </form>
        </div>
        <ReactToastContainer />
      </div>
    </div>
  );
}

export default CreateClinic;
