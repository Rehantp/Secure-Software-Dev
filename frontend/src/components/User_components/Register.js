import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSignUp } from "../../hooks/User_hooks/useSignUp";
import validator from "validator";
import { Button } from "antd";
import bg from "../../assets/User_assets/img/bg.jpg";

const Register = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [addLine1, setAddLine1] = useState("");
  const [addLine2, setAddLine2] = useState("");
  const [addLine3, setAddLine3] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, err, isLoading } = useSignUp();

  const navigate = useNavigate();

  const nameRegex = /^[A-Za-z\s]+$/;
  const contactNumberRegex = /^0\d{0,9}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Client-side all fields filled checking
    if (
      !firstname ||
      !lastname ||
      !contact ||
      !addLine1 ||
      !addLine2 ||
      !addLine3 ||
      !gender ||
      !email ||
      !password
    ) {
      toast.error("Please fill out all the fields");
    }
    if (!validator.isEmail(email)) {
      // Client-side email format validation
      toast.error("Email is not valid");
      return;
    }

    // Client-side password strength checking
    if (!validator.isStrongPassword(password)) {
      toast.error("Password is not strong enough!!");
      return;
    }

    try {
      await signup(
        firstname,
        lastname,
        contact,
        addLine1,
        addLine2,
        addLine3,
        gender,
        email,
        password
      );

      // Registration was successful
      toast.success("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      // Registration failed
      if (error.response) {
        // If the error is from the backend, display the error message from the server
        toast.error(error.response.data.message);
      } else {
        // If it's not from the backend, display a generic error message
        toast.error("Registration failed. Please try again.");
        setTimeout(() => {
          navigate("/register");
        }, 3000);
      }
    }
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: "210vh", // Set height to 100% of the viewport height
          width: "100vw", // Set width to 100% of the viewport width
        }}
      >
        <div style={{paddingRight:"300px", paddingLeft:"300px", paddingTop:"100px", paddingBottom:"200px"}}>
          <div style={{
              border: "2px solid #1F3F49", // Border style and color
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Background color
              borderRadius: "5px", // Border radius (optional)
              paddingBottom: "80px", // Padding (optional)
            }}>
            <h2
              style={{
                textAlign: "center",
                paddingTop: "60px",
                fontSize: "44px",
                color: "#1F3F49",
              }}
            >
              Registration Form
            </h2>
          
          <div
            className="reg-form-container"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <div
              style={{
                paddingLeft: "40px", // Add padding to the outside of the form
              }}
            >
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "800px",
                  padding: "20px", // Adjust padding as needed
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start", // Align labels and inputs to the start of the container
                }}
              >
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  First Name
                </label>
                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === "" || nameRegex.test(e.target.value)) {
                      setFirstName(e.target.value);
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
                  required
                />
                <br></br>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Last Name
                </label>
                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (inputValue === "" || nameRegex.test(e.target.value)) {
                      setLastName(e.target.value);
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
                  required
                />
                <br></br>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Contact Number
                </label>
                <input
                  id="contact"
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (
                      inputValue === "" ||
                      contactNumberRegex.test(e.target.value)
                    ) {
                      setContact(e.target.value);
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
                  required
                />
                <br></br>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Address
                </label>
                <input
                  placeholder="Address line 1"
                  id="add-line1"
                  type="text"
                  value={addLine1}
                  onChange={(e) => setAddLine1(e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "650px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    marginLeft: "34px",
                  }}
                  required
                />
                <br></br>
                <input
                  placeholder="Address line 2"
                  id="add-line2"
                  type="text"
                  value={addLine2}
                  onChange={(e) => setAddLine2(e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "650px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    marginLeft: "34px",
                  }}
                  required
                />
                <br></br>
                <input
                  placeholder="Address line 3"
                  id="add-line3"
                  type="text"
                  value={addLine3}
                  onChange={(e) => setAddLine3(e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "650px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    marginLeft: "34px",
                  }}
                  required
                />
                <br></br>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Gender
                </label>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ marginRight: "5px" }}
                  />
                  Male
                </label>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    style={{ marginRight: "5px" , paddingLeft:"100px"}}
                  />
                  Female
                </label>
                <br></br>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "650px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    marginLeft: "34px",
                  }}
                  required
                />
                <br></br>
                <label style={{ fontSize: "20px", marginRight: "10px" }}>
                  Password
                </label>
                <input
                  id="pwd"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    fontSize: "20px",
                    width: "650px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    marginLeft: "34px",
                  }}
                  required
                />

                <br></br>
                <div className="btns-div">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                    style={{
                      color: "#ffffff",
                      marginRight: "20px",
                      marginLeft: "230px",
                      fontSize: "20px",
                      width: "100px",
                      height: "50px",
                      backgroundColor: "#1F3F49",
                    }}
                  >
                    Register
                  </Button>
                  <Link to="/login">
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        color: "#ffffff",
                        backgroundColor: "#D32D41",
                        fontSize: "20px",
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
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
};

export default Register;
