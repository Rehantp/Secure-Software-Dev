import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer as ReactToastContainer, toast } from "react-toastify";
import "../../styles/GeneralTest/Clinical/forms.css";
import VideoBG from "../../assets/Backround_video.mp4";
import { Modal, message } from "antd";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import "jspdf-autotable";

function Admin() {
	const [admins, setAdmins] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:4000/Clinics/admin")
			.then((response) => {
				setAdmins(response.data);
			})
			.catch((error) => {
				console.log(error);
				toast.error("Failed to fetch clinic data.");
			});
	}, []);

	// const downloadPDF = () => {
	// 	const doc = new jsPDF();
	// 	doc.text("Clinic Data", 10, 10);

	// 	let y = 20;
	// 	admins.forEach((admin) => {
	// 		doc.text(`Clinic Name: ${admin.clinicName}`, 10, y);
	// 		doc.text(`Location: ${admin.clinicLocation}`, 10, y + 10);
	// 		doc.text(`Contact: ${admin.clinicContact}`, 10, y + 20);
	// 		doc.text(`Website: ${admin.clinicWebsite}`, 10, y + 30);
	// 		y += 40;
	// 	});

	// 	doc.save("clinic_data.pdf");
	// };

	const downloadPDF = () => {
		const doc = new jsPDF();
		doc.text("Clinical management Data", 70, 20);

		// Define the table columns and set initial y position
		const columns = ["Clinic Name", "Location", "Contact", "Website"];
		let y = 30;
    

		// Create a header row
		doc.autoTable(columns, [], {
			startY: y,
			styles: { fontSize: 12, fontStyle: "bold" },
		});
		y += 10; // Increase y position for the table content

		// Create the table data rows
		const dataRows = admins.map((admin) => [
			admin.clinicName,
			admin.clinicLocation,
			admin.clinicContact,
			admin.clinicWebsite,
		]);

		// Add the data to the table
		doc.autoTable({
			startY: y,
			body: dataRows,
			styles: { fontSize: 12 },
			columnStyles: {
				0: { cellWidth: 50 },
				1: { cellWidth: 40 },
				2: { cellWidth: 30 },
				3: { cellWidth: 70 },
			},
			headStyles: {
				fillColor: [51, 122, 183],
				textColor: 255,
				fontStyle: "bold",
			},
			bodyStyles: { textColor: 0 },
		});

		// Save the PDF
		doc.save("clinic_data.pdf");
	};

	const handleDelete = (id) => {
		Modal.confirm({
			title: "Do you want to delete this Account?",
			onOk: () => {
				axios
					.delete(`http://localhost:4000/Clinics/delete/` + id)
					.then((res) => {
						message.success("Delete Successfully", 5000);
						window.location.reload();
					})
					.catch((err) => {
						message.error("Failed to delete Clinic");
						console.error(err);
					});
			},
			okButtonProps: {
				style: { backgroundColor: "red", borderColor: "red" },
			},
		});
	};

	const csvData = admins.map((admin) => ({
		"Clinic Name": admin.clinicName,
		Location: admin.clinicLocation,
		Contact: admin.clinicContact,
		Website: admin.clinicWebsite,
	}));

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
					height: "100vh", // Adjusted height to cover the entire viewport
				}}
			>
				<div className="d-flex vh-100   justify-content-center align-items-center">
					<div className="table-container">
						<div className="header-admin">Clinical Admin Dashboard</div>
						<br />
						<Link to="/createClinic" className="btn btn-add">
							Add +
						</Link>
						<CSVLink
							data={csvData}
							filename={"clinic_data.csv"}
							className="btn btn-download-csv"
							target="_blank"
						>
							Download CSV
						</CSVLink>
						<br />
						<button className="btn btn-download-pdf" onClick={downloadPDF}>
							Download PDF
						</button>

						<br />
						<br />
						<table className="table">
							<thead className="table-header-admin">
								<tr>
									<th>Clinic Name</th>
									<th>Location</th>
									<th>Contact</th>
									<th>Website</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody>
								{admins.map((admin) => (
									<tr className="table-data-admin">
										<td>{admin.clinicName}</td>
										<td>{admin.clinicLocation}</td>
										<td>{admin.clinicContact}</td>
										<td>{admin.clinicWebsite}</td>
										<td>
											<Link
												to={`/updateClinic/${admin._id}`}
												className="btn btn-success"
											>
												Edit
											</Link>
											<button
												className="btn btn-danger"
												onClick={(e) => handleDelete(admin._id)}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<ReactToastContainer />
				</div>
			</div>
		</div>
	);
}

export default Admin;
