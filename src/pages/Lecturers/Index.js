import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

import DeleteBtn from "../../components/DeleteBtn";
import LoginForm from "../../components/LoginForm.js";

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
			return lecturer._id !== id;
		});
		setLecturers(updatedLecturers);
	};

	if (lecturers.length === 0) return <h3>Loading...</h3>;
	const lecturersList = lecturers.map((lecturer) => {
		// let enrolmentInfo = lecturer.enrolments.map((enrolment)=>{
		// // let lecturers = lecturer.enrolments.lecturer.map((lecturer)=>{
		// // 	return lecturer;
		// // })
		// 	return <div key={enrolment._id}>{enrolment.id}</div>

		// })
		return (
			<div key={lecturer._id}>
				{/* <div>{enrolmentInfo}</div> */}
				<div class="col s12 m6 l4">
					<div class="card grey lighten-5 hoverable">
						<div class="card-image">
							<img src={`https://picsum.photos/100?random=${lecturer.id}`} />
						</div>
						<div class="card-content">
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
						<div class="card-action">
							{authenticated ? (
								<DeleteBtn
									resource="lecturers"
									id={lecturer._id}
									deleteCallback={removeLecturer}
								/>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<>
			<div class="center">
				<h1>All lecturers</h1>
				<Link to="/lecturers/create">
					<button class="waves-effect waves-light btn-large">
						<i class="material-icons right">add_circle</i>Add Lecturer
					</button>
				</Link>
			</div>

			<div className="row">{lecturersList}</div>
		</>
	);
};
export default Index;
