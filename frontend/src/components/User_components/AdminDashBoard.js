import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { saveAs } from "file-saver";

export default function AdminDashBoard() {
  const [allUsers, setAllUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState(""); // State for search email input
  const navigate = useNavigate();
  const role = "admin";

  // Function to handle download report
  const handleDownload = () => {
    // Assuming you have a state variable called `filteredUsers` that contains the filtered users
    const itemsToExport = filteredUsers || allUsers;
    const now = new Date();
    const timestamp = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    const csvData = [
      ["Sight Sense"],
      ["User Report"],
      ["                                                  "],
      ["First Name", "Last Name", "Email", "Contact", "Address"],
      ...itemsToExport.map((user) => [
        user.firstname,
        user.lastname,
        user.email,
        user.contact,
        `${user.addLine1}, ${user.addLine2}, ${user.addLine3}`,
      ]),
      [
        "                                                                                           ",
      ],
      [`Report Generated at ${timestamp}`],
      ["All Rights Reserved - SightSence.lk"],
    ];

    const csv = csvData.map((row) => row.join(",")).join("\n");

    const file = new Blob([csv], { type: "text/csv;charset=utf-8" });
    saveAs(file, "User_Report.csv");
  };

  // Delete one user
  const deleteUser = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <h1 style={{ fontSize: "24px", textAlign: "center" }}>
              Confirm Deletion
            </h1>
            <p style={{ fontSize: "18px", textAlign: "center" }}>
              Are you sure you want to delete this user?
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
                    await axios.delete(
                      `http://localhost:4000/api/admin/delete/${id}`
                    );
                    toast.success("User deleted successfully");
                    //window reload
                    window.location.reload();
                  } catch (error) {
                    toast.error(error.message);
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

  // Function to handle logout
  const handleLogOut = () => {
    navigate("/");
  };

  useEffect(() => {
    const getAllUsers = () => {
      axios
        .get(`http://localhost:4000/api/admin/get-all?role=${role}`)
        .then((res) => {
          const filteredUsers = res.data.filter(
            (user) => !user.email.startsWith("admin")
          );
          setAllUsers(filteredUsers);
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };

    getAllUsers();
  }, []);

  // Function to filter users based on email
  const filteredUsers = allUsers.filter((user) =>
    user.email.includes(searchEmail)
  );

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchEmail(e.target.value);
  };

  return (
    <div>
      <div
        style={{
          paddingLeft: "350px",
          paddingTop: "40px",
          paddingBottom: "40px",
        }}
      >
        <button
          style={{
            width: "500px",
            marginRight: "1px",
            padding: "20px",
            fontSize: "22px",
            borderRight: "none",
            alignItems: "center",
            backgroundColor: "#0E2954",
            border: "0",
            borderTopLeftRadius: "100px",
            borderBottomLeftRadius: "100px",
            boxSizing: "border-box",
            color: "#ffffff",
            cursor: "pointer",
            display: "inline-flex",
            fontWeight: "600",
            justifyContent: "center",
            lineHeight: "20px",
            maxHeight: "40px",
            minHeight: "40px",
            minWidth: "0px",
            overflow: "hidden",
            paddingLeft: "20px",
            paddingRight: "20px",
            textAlign: "center",
            touchAction: "manipulation",
            transition:
              "background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s",
            userSelect: "none",
            WebkitUserSelect: "none",
            verticalAlign: "middle",
          }}
          onClick={() => {
            navigate("/admin-dashboard");
          }}
        >
          Users
        </button>
        <button
          style={{
            width: "500px",
            marginLeft: "1px",
            padding: "20px",
            fontSize: "22px",
            alignItems: "center",
            backgroundColor: "#0E2954",
            border: "0",
            borderTopRightRadius: "100px",
            borderBottomRightRadius: "100px",
            boxSizing: "border-box",
            color: "#ffffff",
            cursor: "pointer",
            display: "inline-flex",
            fontWeight: "600",
            justifyContent: "center",
            lineHeight: "20px",
            maxHeight: "40px",
            minHeight: "40px",
            minWidth: "0px",
            overflow: "hidden",
            textAlign: "center",
            touchAction: "manipulation",
            transition:
              "background-color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, box-shadow 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s, color 0.167s cubic-bezier(0.4, 0, 0.2, 1) 0s",
            userSelect: "none",
            WebkitUserSelect: "none",
            verticalAlign: "middle",
          }}
          onClick={() => {
            navigate("/admin");
          }}
        >
          Clinics
        </button>
      </div>
      <div>
        <h2 style={{ textAlign: "center" }}>Admin Dashboard</h2>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: "1" }}>
          <div style={{ paddingTop: "20px", paddingLeft: "100px" }}>
            <div
              style={{
                backgroundColor: "#1F6E8C",
                width: "910px",
                borderRadius: "200px",
              }}
            >
              <div style={{ padding: "5px" }}>
                <input
                  type="text"
                  placeholder="Search by email"
                  value={searchEmail}
                  onChange={handleSearchChange}
                  style={{
                    width: "900px",
                    padding: "10px",
                    borderRadius: "200px",
                    border: "none",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div style={{ flex: "1", paddingTop: "20px", paddingLeft:"300px" }}>
        <button
              onClick={handleDownload}
              style={{
                backgroundColor: "#1F6E8C",
                color: "white",
                padding: "10px 20px",
                borderRadius: "5px",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                marginLeft: "15px",
              }}
            >
              Download Report
            </button>
        </div>
      </div>
      <div >
        <div style={{paddingTop:"40px", paddingBottom:"40px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <table>
  <thead>
    <tr>
      <th
        style={{
          padding: "20px",
          fontSize: "20px",
          minWidth: "170px", // Add MUI style
          textAlign: "left", // Align text left
          backgroundColor: "#f5f5f5", // Background color
        }}
      >
        First Name
      </th>
      <th
        style={{
          padding: "20px",
          fontSize: "20px",
          minWidth: "100px", // Add MUI style
          textAlign: "left", // Align text left
          backgroundColor: "#f5f5f5", // Background color
        }}
      >
        Last Name
      </th>
      <th
        style={{
          padding: "20px",
          fontSize: "20px",
          minWidth: "170px", // Add MUI style
          textAlign: "left", // Align text left
          backgroundColor: "#f5f5f5", // Background color
        }}
      >
        Email
      </th>
      <th
        style={{
          padding: "20px",
          fontSize: "20px",
          minWidth: "170px", // Add MUI style
          textAlign: "right", // Align text right
          backgroundColor: "#f5f5f5", // Background color
        }}
      >
        Contact
      </th>
      <th
        style={{
          padding: "20px",
          fontSize: "20px",
          minWidth: "170px", // Add MUI style
          textAlign: "left", // Align text left
          backgroundColor: "#f5f5f5", // Background color
        }}
      >
        Address
      </th>
      <th style={{
          padding: "20px",
          fontSize: "20px",
          minWidth: "170px", // Add MUI style
          textAlign: "left", // Align text left
          backgroundColor: "#f5f5f5", // Background color
        }}></th>
    </tr>
  </thead>
  <tbody>
    {filteredUsers.map((user, index) => (
      <tr key={index}>
        <td
          style={{
            padding: "10px",
            fontSize: "18px",
            minWidth: "170px", // Add MUI style
          }}
        >
          {user.firstname}
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "18px",
            minWidth: "100px", // Add MUI style
          }}
        >
          {user.lastname}
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "18px",
            minWidth: "170px", // Add MUI style
          }}
        >
          {user.email}
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "18px",
            minWidth: "170px", // Add MUI style
            textAlign: "right", // Align text right
          }}
        >
          {user.contact}
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "18px",
            minWidth: "170px", // Add MUI style
            textAlign: "left", // Align text left
          }}
        >
          {user.addLine1}, {user.addLine2}, {user.addLine3}
        </td>
        <td
          style={{
            padding: "10px",
            fontSize: "18px",
            minWidth: "170px", // Add MUI style
          }}
        >
          <button
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
            onClick={() => {
              deleteUser(user._id);
            }}
          >
            Delete User
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

        </div>
      </div>
      <ReactToastContainer />
    </div>
  );
}
