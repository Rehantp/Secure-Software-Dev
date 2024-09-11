import React, { useEffect, useState } from "react";
import "../../styles/GeneralTest/Clinical/HomePage.css";
import Card from "../../components/Clinical_components/ClinicCard";
import "../../styles/GeneralTest/Clinical/NavBar.css";
import "../../assets/Clinical_assets/search-line.png";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoImage from "../../assets/Clinical_assets/logo.jpg";

function ClinicHome() {
  const [clinics, setClinics] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/Clinics/getAll`
        );
        if (response.data) {
          setClinics(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredClinics = clinics.filter(
    (clinic) =>
      clinic.clinicLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      clinic.clinicName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClinicWebsiteClick = (clinicWebsite) => {
    window.open(clinicWebsite, "_blank"); // Open the link in a new tab
  };

  return (
    <div>
      <div className="Container">
        <div className="Inner">
          <div className="Logo">
            <Link to="/">
              <img src={LogoImage} alt="Logo" className="logo" />
            </Link>
          </div>

          <div className="SearchBar">
            <input
              type="text"
              placeholder="Search.."
              className="input"
              value={searchQuery}
              onChange={handleSearch}
            />
            <button className="search-btn">
              <i className="ri-search-line"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="Main">
        <div className="clinic-grid">
          {filteredClinics.map((clinic, index) => (
            <Card
              key={index}
              clinicId={clinic.id}
              clinicName={clinic.clinicName}
              clinicLocation={clinic.clinicLocation}
              clinicContact={clinic.clinicContact}
              clinicWebsite={
                <a
                  href={clinic.clinicWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent default link behavior
                    handleClinicWebsiteClick(clinic.clinicWebsite);
                  }}
                >
                  {clinic.clinicWebsite}
                </a>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClinicHome;
