import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import VideoBG from "../../assets/Backround_video.mp4";
import "../../styles/GeneralTest/Clinical/forms.css";

function UpdateClinic() {
  const { id } = useParams();
  const [clinicName, setclinicName] = useState("");
  const [clinicLocation, setclinicLocation] = useState("");
  const [clinicContact, setclinicContact] = useState("");
  const [clinicWebsite, setclinicWebsite] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/Clinics/getClinic/" + id)
      .then((response) => {
        console.log(response);
        setclinicName(response.data.clinicName);
        setclinicLocation(response.data.clinicLocation);
        setclinicContact(response.data.clinicContact);
        setclinicWebsite(response.data.clinicWebsite);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to fetch clinic data.");
      });
  }, []);

  const Update = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:4000/Clinics/updateClinic/" + id, {
        clinicName,
        clinicLocation,
        clinicContact,
        clinicWebsite,
      })
      .then((response) => {
        console.log(response);
        navigate("/admin");
        toast.success("Clinic Updated ");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Failed to update clinic data.");
      });
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
        <form onSubmit={Update}>
          <div className="custom-gradient">
            <h2 className="header">Update Clinic</h2>

            <div className="mb-2">
              <label className="text" htmlFor="">
                Clinic Name
              </label>
              <br />
              <input
                type="text"
                className="form-conrol"
                value={clinicName}
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
                className="form-conrol"
                value={clinicLocation}
                onChange={(e) => setclinicLocation(e.target.value)}
              />
            </div>

            <div className="mb-2">
              <label className="text" htmlFor="">
                Contact
              </label>
              <br />
              <input
                type="tel"
                pattern="^\d{3}\d{4}\d{3}$"
                className="form-conrol"
                value={clinicContact}
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
                // pattern="^\www.[a-zA-Z0-9]+.(com|lk)$"
                type="url"
                placeholder="Website (Ex:http://www.example.lk)"
                className="form-conrol"
                value={clinicWebsite}
                onChange={(e) => setclinicWebsite(e.target.value)}
              />
            </div>

            <button className="btn btn-update">Update</button>
          </div>
        </form>
        <ReactToastContainer />
      </div>
    </div>
  );
}

export default UpdateClinic;
