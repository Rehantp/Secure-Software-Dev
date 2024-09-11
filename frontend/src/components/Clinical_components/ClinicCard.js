import React from "react";
import "../../styles/GeneralTest/Clinical/HomePage.css";

function ClinicCard(props) {
  return (
    <div className="CardContainer">
      <div className="Card">
        <h1 className="h1">{props.clinicName}</h1>
        <div className="description">
          <h3 className="h3">{props.clinicLocation}</h3>
          <h3 className="h3">{props.clinicContact}</h3>
          <a href="" className="link">
            {props.clinicWebsite}
          </a>
        </div>
      </div>
    </div>
  );
}

export default ClinicCard;
