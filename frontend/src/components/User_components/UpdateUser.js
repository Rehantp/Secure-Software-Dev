import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import { toast } from "react-toastify";
import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { useLogOut } from "../../hooks/User_hooks/useLogOut";
import { Button } from "antd";
import bg from "../../assets/User_assets/img/bg.jpg";

export default function UpdateUser() {
  const { logout } = useLogOut();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Get the current user's data
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    contact: "",
    addLine1: "",
    addLine2: "",
    addLine3: "",
    gender: "",
    email: "",
  });

  useEffect(() => {
    // Populate the form with the current user's data when the component mounts
    if (user && user.user) {
      const {
        firstname,
        lastname,
        contact,
        addLine1,
        addLine2,
        addLine3,
        gender,
        email,
      } = user.user;
      setFormData({
        firstname,
        lastname,
        contact,
        addLine1,
        addLine2,
        addLine3,
        gender,
        email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the user's profile
      const response = await axios.put(
        `http://localhost:4000/api/users/${user.user._id}`,
        formData
      );

      if (response.status === 200) {
        logout();
        toast.success("Profile Details Updated Successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div style={{
      backgroundImage: `url(${bg})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center center",
      height: "150vh", // Set height to 100% of the viewport height
      width: "100vw", // Set width to 100% of the viewport width
    }}>
      <div style={{
            paddingTop: "100px",
            paddingLeft: "250px",
            paddingRight: "350px",
          }}>
        <div style={{
          paddingTop: "60px",
              border: "2px solid #1F3F49", // Border style and color
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Background color
              borderRadius: "5px", // Border radius (optional)
              paddingBottom: "60px", // Padding (optional)
            }}>
        <h2 style={{ textAlign: "center", fontSize: "44px", padding: "20px", color:"#1F3F49", textAlign:"center" }}>
          Update Profile
        </h2>
      

      <div style={{paddingLeft: "80px"}}>
      <form
          onSubmit={handleSubmit}
          style={{
            width: "600px",
            padding: "40px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Input fields for each user profile field */}
          <div>
            <label
              htmlFor="firstname"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              disabled="true"
              value={formData.firstname}
              onChange={handleChange}
              style={{
                fontSize: "20px",
                width: "650px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginLeft: "34px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              required="true"
              value={formData.lastname}
              onChange={(e) => {
                const inputValue = e.target.value;
                const nameRegex = /^[A-Za-z\s]+$/; // Regular expression for alphabetic characters and spaces
            
                if (inputValue === "" || nameRegex.test(inputValue)) {
                  setFormData({ ...formData, lastname: inputValue });
                }
              }}
              style={{
                fontSize: "20px",
                width: "650px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginLeft: "34px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="contact"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              required="true"

              value={formData.contact}
              onChange={(e) => {
                const inputValue = e.target.value;
                const contactNumberRegex = /^0\d{0,9}$/; // Regular expression for 10 digits with 0 initially
            
                if (inputValue === "" || contactNumberRegex.test(inputValue)) {
                  setFormData({ ...formData, contact: inputValue });
                }
              }}
              style={{
                fontSize: "20px",
                width: "650px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginLeft: "34px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="addLine1"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              Address Line 1
            </label>
            <input
              type="text"
              id="addLine1"
              name="addLine1"
              required="true"
              value={formData.addLine1}
              onChange={handleChange}
              style={{
                fontSize: "20px",
                width: "650px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginLeft: "34px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="addLine2"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              Address Line 2
            </label>
            <input
              type="text"
              id="addLine2"
              name="addLine2"
              required="true"
              value={formData.addLine2}
              onChange={handleChange}
              style={{
                fontSize: "20px",
                width: "650px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginLeft: "34px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="addLine3"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              Address Line 3
            </label>
            <input
              type="text"
              id="addLine3"
              name="addLine3"
              value={formData.addLine3}
              onChange={handleChange}
              style={{
                fontSize: "20px",
                width: "650px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginLeft: "34px",
              }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{ fontSize: "20px", marginRight: "10px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled="true"
              value={formData.email}
              onChange={handleChange}
              style={{
                fontSize: "20px",
                width: "650px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "5px",
                marginLeft: "34px",
              }}
            />
          </div>
          <div style={{ padding: "20px" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{
                color: "#ffffff",
                backgroundColor: "#1F3F49",
                marginRight: "20px",
                marginLeft: "230px",
                fontSize: "18px",
                width: "100px",
                height: "50px",
              }}
            >
              Update
            </Button>
            <Link to="/home">
              <Button
                type="primary"
                size="large"
                style={{
                  color: "#ffffff",
                  backgroundColor: "#D32D41",
                  fontSize: "18px",
                  width: "100px",
                  height: "50px",
                }}
              >
                Cancel
              </Button>
            </Link>
          </div>
        </form>
        </div>
      </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}
