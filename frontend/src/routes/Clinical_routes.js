import React from "react";
import { Route, Routes } from "react-router-dom";
import "remixicon/fonts/remixicon.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ClinicHome from "../pages/Clinical_pages/ClinicHome";
import CreateClinic from "../pages/Clinical_pages/CreateClinic";
import UpdateClinic from "../pages/Clinical_pages/UpdateClinic";
import Admin from "../pages/Clinical_pages/Admin";
import "react-toastify/dist/ReactToastify.css";

export default function Clinical_routes() {
  return (
    <Routes>
      {/* client side */}
      <Route extract path="/clinicHome" element={<ClinicHome />} />
      {/* admin side */}
      <Route extract path="/admin" element={<Admin />} />
      <Route extract path="/createClinic" element={<CreateClinic />} />
      <Route extract path="/updateClinic/:id" element={<UpdateClinic />} />
    </Routes>
  );
}
