import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/GeneralTest/Clinical/HomePage.css";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoBG from "../../assets/Backround_video.mp4";

export default function HomePage() {
  const [clinics, setClinics] = useState([]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [editingClinicId, setEditingClinicId] = useState(null);
  const [ClinicSelected, setClinicSelected] = useState(false);

  useEffect(() => {
    async function getClinics() {
      try {
        const response = await axios.get("http://localhost:4000/Clinics/admin");
        setClinics(response.data);
      } catch (error) {
        toast.error(error.message);
      }
    }
    getClinics();
  }, []);

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
          height: "100%", // Adjusted height to cover the entire viewport
        }}
      >
        <div className="home-body">
          <div className="header-section-1">
            <h1 className="app-name">Clinical Management</h1>
            <br />
            <br />
            <br />
          </div>
          <div className="div-home-body">
            <table className="table-display">
              <tbody>
                {clinics.map((n, index) => (
                  <React.Fragment key={n.id}>
                    <tr className="card1" onClick={() => setSelectedClinic(n)}>
                      <div className="card1-container">
                        <td className="clinicName-column">{n.clinicName}</td>
                        <br />
                        <td className="clinicLocation-column">
                          {n.clinicLocation}
                        </td>
                      </div>
                    </tr>
                    {index < clinics.length - 1 && (
                      <tr key={index}>
                        <td
                          className="spacer"
                          style={{ height: "5px", width: "10px" }}
                        ></td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
                <br />
              </tbody>
            </table>
          </div>
        </div>
        <ReactToastContainer />
      </div>
    </div>
  );
}
