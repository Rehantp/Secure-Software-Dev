import React from "react";
import { Route, Routes } from "react-router-dom";
import ProfileHome from "../components/User_components/ProfileHome";
import Login from "../components/User_components/Login";
import Register from "../components/User_components/Register";
import UserProfile from "../components/User_components/UserProfile";
import UpdateUser from "../components/User_components/UpdateUser";
import AdminDashBoard from "../components/User_components/AdminDashBoard";


export default function User_routes() {
  return (
    <Routes>
      <Route>
      <Route path="/" element={< ProfileHome/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/home" element={<UserProfile/>} />
      <Route path="/update" element={<UpdateUser/>} />
     
      <Route path="/admin-dashboard" element={<AdminDashBoard/>} />
      </Route>
    </Routes>
  );
}
