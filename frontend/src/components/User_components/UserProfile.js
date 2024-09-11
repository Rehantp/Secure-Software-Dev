import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogOut } from "../../hooks/User_hooks/useLogOut";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import profileimg from "../../assets/User_assets/img/profile_img.png";
import { Chart } from "react-google-charts";
import ProgressBar from "@ramonak/react-progress-bar";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

export default function UserProfile() {
  const navigate = useNavigate();

  const { logout } = useLogOut();
  const { user } = useContext(AuthContext);
  const [testData, setTestData] = useState([]);
  const [testDate, setTestDate] = useState();
  const [testScore, setTestScore] = useState([]);
  const [correctTest, setCorrectTest] = useState([]);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(userString);
    const token = user.token;

    const getTestData = () => {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      axios
        .get(`http://localhost:4000/api/users/read-all`, { headers })
        .then((res) => {
          setTestData(res.data);
          console.log(res.data);

          // After fetching the data, set it in local storage
          localStorage.setItem("testData", JSON.stringify(res.data));
        })
        .catch((err) => {
          alert(err.message);
        });
    };

    getTestData();
  }, []);

  useEffect(() => {
    // Check if there's cached data in local storage
    const cachedTestData = localStorage.getItem("testData");
    if (cachedTestData) {
      setTestData(JSON.parse(cachedTestData));
      console.log("Cached Test Data:", JSON.parse(cachedTestData));
    }
  }, []);

  // To fetch the correct test data
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(userString);
    const userFirstName = user.user.firstname;
    const filteredTest = testData.filter(
      (test) => test.user_id === userFirstName
    );
    setCorrectTest(filteredTest);
  }, [testData]);

  // This useEffect sets testDate and testScore when correctTest changes
  useEffect(() => {
    if (correctTest.length > 0) {
      setTestDate(correctTest[0].test_date);
      setTestScore(correctTest[0].test_score);
    }

    console.log("Test Date : ", testDate);
    console.log("Test Score : ", testScore);
  }, [correctTest]);

  // Donought chart data
  let totalQuestions = 15; // Total of 15 questions
  let correctAns = Number((testScore / totalQuestions) * 100); // Correct answers percentage
  let wrongAns = 100 - correctAns; // Wrong answers percentage

  // logout function

  const data = [
    ["Category", "Value"],
    ["correct Answers", correctAns],
    ["Wrong Answers", wrongAns],
  ];

  // Options for the chart
  const options = {
    title: "Previous General Test Stats",
    backgroundColor: "transparent",
    titleTextStyle: {
      fontSize: 22, // Adjust the font size as needed
    },
    legend: {
      textStyle: {
        fontSize: 14, // Adjust the font size as needed
      },
    },
    pieHole: 0.7, // Controls the size of the hole in the center (0 to 1)
    pieSliceText: "none",
    colors: ["#1F3F49", "#6AB187"], // Colors for the segments
  };

  //Line Chart
  const Linedata = [
    ["X", "✔", "✘"],
    [1, 10, 3],
    [2, 15, 0],
    [3, 8, 7],
    [4, testScore, 15 - testScore],
    // Add more data points as needed
  ];

  const Lineoptions = {
    title: "Score Board Latest Tests",
    legend: {
      textStyle: {
        fontSize: 14, // Adjust the font size as needed
      },
    },
    backgroundColor: "transparent",
    titleTextStyle: {
      fontSize: 22,
    },
    hAxis: {
      title: "Round",
      titleTextStyle: {
        fontSize: 16, // Adjust the font size for the X-axis title
      },
      textStyle: {
        color: "#1F3F49", // Change the Y-axis text color to red (#FF0000)
        fontSize: 14, // You can also adjust the font size if needed
      },
    },
    vAxis: {
      title: "Score",
      titleTextStyle: {
        fontSize: 16, // Adjust the font size for the X-axis title
      },
      textStyle: {
        color: "#1F3F49", // Change the Y-axis text color to red (#FF0000)
        fontSize: 14, // You can also adjust the font size if needed
      },
    },
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  // update function
  const handleEdit = async (UserId) => {
    navigate("/update");
  };

  // delete function
  const handleDelete = async () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <h1 style={{ fontSize: "24px", textAlign: "center" }}>
              Confirm Deletion
            </h1>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              Are you sure you want to delete your account?
            </p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <button
                style={{
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                onClick={async () => {
                  try {
                    const response = await axios.delete(
                      `http://localhost:4000/api/users/${user.user._id}`
                    );

                    if (response.status === 200) {
                      logout();
                      toast.success("Profile has been successfully deleted");
                      setTimeout(() => {
                        navigate("/");
                      }, 1000);
                    }
                  } catch (error) {
                    console.error("Error deleting user:", error);
                  }

                  onClose();
                }}
              >
                Yes
              </button>
              <button
                style={{
                  backgroundColor: "#6c757d",
                  color: "#fff",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  border: "none",
                  marginRight: "10px",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
                onClick={() => {
                  onClose();
                }}
              >
                No
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const [Conclusion, setConclusion] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check the condition and update Conclusion and message accordingly
    if (correctAns > 50) {
      setConclusion(true);
      setMessage("Your vision shows promise and potential.");
    } else {
      setConclusion(false);
      setMessage("Opting for advanced testing is the preferred choice.");
    }
  }, [correctAns]);

  //Scatter plot
  const scatterData = [
    ["Attempt", "Score"],
    [1, 8],
    [2, 10],
    [3, 12],
    [4, 10],
    [5, 11],
    [6, 7],
    [7, 9],
    [8, 12],
    [9, 14],
    [10, 11],
    [11, 8],
    [12, 10],
    [13, 12],
    [14, 10],
    [15, testScore],
  ];

  const Scatteroptions = {
    title: "Attempt vs. Score Performance Trend",
    titleTextStyle: {
      fontSize: 22,
    },
    hAxis: {
      title: "Attempt",
      titleTextStyle: {
        fontSize: 16, // Adjust the font size for the X-axis title
      },
    },
    vAxis: {
      title: "Score",
      titleTextStyle: {
        fontSize: 16, // Adjust the font size for the X-axis title
      },
    },
    backgroundColor: "transparent",
  };

  return (
    <div
      style={{
        paddingLeft: "20px",
        paddingTop: "20px",
        paddingBottom: "20px",
        backgroundColor: "#CED2CC",
      }}
    >
      <div style={{ display: "flex" }}>
        <div
          style={{
            flex: "0.25",
            backgroundColor: "#6AB187",
            padding: "20px",
            height: "980px",
          }}
        >
          <div style={{}}></div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1" }}>
              <img
                src={profileimg}
                alt="Profile Image"
                style={{ height: "100px", width: "100px" }}
              />
            </div>
            <div style={{ flex: "1" }}>
              <h1
                style={{
                  fontSize: "40px",
                  color: "white",
                }}
              >
                {user && (
                  <div>
                    {user.user.firstname} {user.user.lastname}
                  </div>
                )}
              </h1>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div>
              {/* Profile details */}
              {user && (
                <div
                  style={{
                    paddingTop: "30px",
                    fontSize: "18px",
                    paddingLeft: "30px",
                    paddingBottom: "40px",
                    paddingRight: "20px",
                  }}
                >
                  <h4 style={{ color: "white" }}>Contact</h4>{" "}
                  <h5 style={{ color: "#1F3F49" }}>{user.user.contact}</h5>
                  <br></br>
                  <h4 style={{ color: "white" }}>Email</h4>{" "}
                  <h5 style={{ color: "#1F3F49" }}>{user.user.email}</h5>
                  <br></br>
                  <h4 style={{ color: "white" }}>Address</h4>{" "}
                  <h5 style={{ color: "#1F3F49" }}>{user.user.addLine1},</h5>{" "}
                  <h5 style={{ color: "#1F3F49" }}>
                    {user.user.addLine2}, {user.user.addLine3}
                  </h5>
                  <br />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  paddingTop: "410px",
                  paddingLeft: "17px",
                }}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => handleEdit(user.user._id)}
                    style={{
                      backgroundColor: "#1F3F49",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "none",
                      marginRight: "10px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    Update
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleDelete(user.user._id)}
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      padding: "5px 12px",
                      borderRadius: "5px",
                      border: "none",
                      marginRight: "10px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    Delete
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleLogOut}
                    style={{
                      backgroundColor: "#6c757d",
                      color: "#fff",
                      padding: "5px 10px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "1" }}>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1", paddingLeft: "10px" }}>
              <div
                style={{
                  paddingLeft: "20px",
                  width: "550px",
                  height: "450px",
                  border: "2px solid #f0f0f0",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Chart
                  width={"100%"}
                  height={"400px"}
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={data}
                  options={options}
                />
                <div>
                  <h6
                    style={{
                      fontStyle: "italic",
                      paddingLeft: "45px",
                    }}
                  >
                    This data is last updated on : {testDate}
                  </h6>
                </div>
              </div>
            </div>
            <div style={{ flex: "1" }}>
              <div>
                <div
                  style={{
                    paddingLeft: "20px",
                    paddingBottom: "20px",
                    width: "580px",
                    height: "450px",
                    border: "2px solid #f0f0f0",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <Chart
                    width={"100%"}
                    height={"400px"}
                    chartType="LineChart"
                    loader={<div>Loading Chart</div>}
                    data={Linedata}
                    options={Lineoptions}
                  />
                  <div>
                    <h6
                      style={{
                        fontStyle: "italic",
                        paddingLeft: "45px",
                        paddingBottom: "40px",
                      }}
                    >
                      This data is last updated on : {testDate}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div style={{ flex: "1" }}>
              <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
                <div
                  style={{
                    paddingLeft: "20px",
                    paddingBottom: "20px",
                    width: "550px",
                    height: "520px",
                    border: "2px solid #f0f0f0",
                    backgroundColor: "#f0f0f0",
                  }}
                >
                  <h4 style={{ color: "#1F3F49", padding: "20px" }}>SUMMERY</h4>
                  <div style={{ display: "flex" }}>
                    <div style={{ flex: "1" }}>
                      <div style={{ paddingLeft: "20px" }}>
                        <h5>Total number of basic test questions </h5>
                        <h5>Total Number of Correct Answers </h5>
                        <br></br>
                        <div>
                          <ProgressBar
                            completed={correctAns.toFixed(2)}
                            bgColor="#1F3F49"
                            height="15px"
                          />
                        </div>
                        <br></br>
                        <h5>Total Number of Wrong Answers </h5>
                        <br></br>
                        <div>
                          <ProgressBar
                            completed={wrongAns.toFixed(2)}
                            bgColor="#6AB187"
                            height="15px"
                          />
                        </div>

                        <br></br>
                      </div>
                    </div>

                    <div style={{ flex: "0.4" }}>
                      <div>
                        <h5>{totalQuestions} </h5>
                        <h5>{testScore} </h5>
                        <br></br>
                        <br></br>
                        <br></br>
                        <h5>{15 - testScore} </h5>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 style={{ paddingLeft: "20px", color: "#23282D" }}>
                      Conclusion
                    </h4>
                    <h5 style={{ paddingLeft: "20px", color: "#23282D" }}>
                      {message}
                    </h5>
                  </div>
                  <div style={{ paddingLeft: "180px", paddingTop: "10px" }}>
                    <div
                      style={{
                        width: "120px",
                        height: "120px",
                      }}
                    >
                      <CircularProgressbar
                        value={correctAns.toFixed(2)}
                        text={`${correctAns.toFixed(2)}%`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ flex: "1", paddingTop: "10px", paddingLeft: "10px" }}
            >
              <div
                style={{
                  width: "580px",
                  height: "520px",
                  border: "2px solid #f0f0f0",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <div>
                  <Chart
                    chartType="ScatterChart"
                    width={"100%"}
                    height={"400px"}
                    data={scatterData}
                    options={Scatteroptions}
                  />
                  <div>
                    <h6
                      style={{
                        fontStyle: "italic",
                        paddingLeft: "45px",
                      }}
                    >
                      This data is last updated on : {testDate}
                    </h6>
                  </div>
                </div>
                <div style={{ paddingLeft: "430px" }}>
                  <Link to="/general-test/QuizHome">
                    <br></br>
                    <button
                      type="button"
                      style={{
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        marginRight: "10px",
                        cursor: "pointer",
                        fontSize: "18px",
                      }}
                    >
                      Go Testing
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}