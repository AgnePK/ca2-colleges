import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

import Modal from "../../components/Modal.js";

const Index = () => {
	const { authenticated } = useAuth();

	const [lecturers, setLecturers] = useState("");

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/api/lecturers`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data.data);
				setLecturers(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const removeLecturer = (id) => {
		console.log("deleted", id);
		let updatedLecturers = lecturers.filter((lecturer) => {
			return lecturer.id !== id;
		});
		setLecturers(updatedLecturers);
	};

	if (lecturers.length === 0) return <h3>Loading...</h3>;
	const lecturersList = lecturers.map((lecturer) => {
		return (
			<div key={lecturer.id}>
				{/* <div>{enrolmentInfo}</div> */}
				<div className="col s6 m4 l4">
					<div className="card grey lighten-5 hoverable">
						<div className="card-image">
							<img src={`https://picsum.photos/100?random=${lecturer.id}`} />
						</div>
						<div className="card-content">
							<p>
								<b>Name: </b>
								<Link to={`/lecturers/${lecturer.id}`}> {lecturer.name}</Link>
							</p>
							<p>
								<b>Email: </b> {lecturer.email}
							</p>
							<p>
								<b>Phone Number: </b> {lecturer.phone}
							</p>
						</div>
						<div className="card-action">
						<Modal
							resource="lecturers"
							id={lecturer.id}
							deleteCallback={removeLecturer}
							variable={lecturer}
						/>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="center">
				<h1>All lecturers</h1>
				<Link to="/lecturers/create">
					<button className="waves-effect waves-light btn-large">
						<i className="material-icons right">add_circle</i>Add Lecturer
					</button>
				</Link>
			</div>

			<div className="row">{lecturersList}</div>
		</>
	);
};
export default Index;
