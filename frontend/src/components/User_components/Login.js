import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogIn } from "../../hooks/User_hooks/useLogIn";
import validator from "validator";
import { Button } from "antd";
import "react-toastify/dist/ReactToastify.css";
import bg from "../../assets/User_assets/img/bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Declare errorMessage state
  const { login, isLoading } = useLogIn();
  const navigate = useNavigate();

  const isUserAdmin = email.startsWith("admin_");

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message

    if (!validator.isEmail(email)) {
      toast.error("Email is not valid");
      return;
    }

    if (!email || !password) {
      toast.error("Please fill out all the fields");
      return;
    }

    try {
      await login(email, password);
      toast.success("Login Successful");
      setTimeout(() => {
        // Redirect to the appropriate dashboard after a successful login
        if (email.startsWith("admin")) {
          navigate("/admin-dashboard");
      } else {
          navigate("/home");
      }
      }, 1000);
    } catch (Error) {
      toast.error("Incorrect Password");
    }
  };

  return (
    <div>
      <div
        className="login-body"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          height: "100vh", // Set height to 100% of the viewport height
          width: "100vw", // Set width to 100% of the viewport width
        }}
      >
        <div
          className="div-for-login-box"
          style={{
            paddingTop: "100px",
            paddingLeft: "250px",
            paddingRight: "250px",
          }}
        >
          <div
            className="login"
            style={{
              border: "2px solid #1F3F49", // Border style and color
              backgroundColor: "rgba(255, 255, 255, 0.5)", // Background color
              borderRadius: "5px", // Border radius (optional)
              paddingBottom: "120px", // Padding (optional)
            }}
          >
            <div className="login-heading-div">
              <h2
                style={{
                  textAlign: "center",
                  paddingTop: "100px",
                  fontSize: "44px",
                  color: "#1F3F49",
                }}
              >
                Login
              </h2>
            </div>

            <div
              className="login-form-container-div"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <form onSubmit={handleLoginFormSubmit}>
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ fontSize: "20px", marginRight: "10px" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      fontSize: "20px",
                      width: "350px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "5px",
                      marginLeft: "34px",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label style={{ fontSize: "20px", marginRight: "10px" }}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      fontSize: "20px",
                      width: "350px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      padding: "5px",
                    }}
                  />
                </div>
                <div
                  className="btns-div"
                  style={{
                    display: "flex",
                    paddingTop: "40px",
                    paddingRight: "10px",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={isLoading}
                    style={{
                      color: "#ffffff",
                      backgroundColor: "#6AB187",
                      marginRight: "20px",
                      marginLeft: "120px",
                      fontSize: "20px",
                      width: "100px",
                      height: "50px",
                    }}
                  >
                    Login
                  </Button>
                  <Link to="/register">
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        color: "#ffffff",
                        fontSize: "20px",
                        width: "100px",
                        height: "50px",
                        backgroundColor: "#1F3F49",
                      }}
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
        <ReactToastContainer />
      </div>
    </div>
  );
};

export default Login;
