import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

import DeleteBtn from "../../components/DeleteBtn";
import LoginForm from "../../components/LoginForm.js";

const Index = () => {
	const { authenticated } = useAuth();

	const [enrolments, setEnrolments] = useState("");

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/api/enrolments`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data.data);
				setEnrolments(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	const removeEnrolment = (id) => {
		console.log("deleted", id);
		let updatedEnrolments = enrolments.filter((enrolment) => {
			return enrolment._id !== id;
		});
		setEnrolments(updatedEnrolments);
	};

	if (enrolments.length === 0) return <h3>There are no enrolments</h3>;
	const enrolmentsList = enrolments.map((enrolment) => {
		return (
			<div key={enrolment._id}>
				<div className="row">
					<div class="col s12">
						<div class="card grey lighten-5 hoverable">
							<div class="card-content">
								<p>
									<b>Enrolment ID: </b>
									<Link to={`/enrolments/${enrolment.id}`}>
										{" "}
										{enrolment.id}
									</Link>
								</p>
								<p>
									<b>Lecturer: </b>
									<Link to={`/lecturers/${enrolment.lecturer.id}`}>
										{" "}
										{enrolment.lecturer.name}
									</Link>
								</p>
								<p>
									<b>Course title: </b>
									<Link to={`/lecturers/${enrolment.course.id}`}>
										{" "}
										{enrolment.course.title}
									</Link>
								</p>
								<p>
									<b>Status: </b> {enrolment.status}
								</p>
							</div>
							<div class="card-action">
								{authenticated ? (
									<DeleteBtn
										resource="enrolments"
										id={enrolment._id}
										deleteCallback={removeEnrolment}
									/>
								) : (
									""
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	});

	return (
		<>
			<div class="center">
				<h1>All enrolments</h1>
				<Link to="/enrolments/create">
					<button class="waves-effect waves-light btn-large">
						<i class="material-icons right">add_circle</i>Create Enrolment
					</button>
				</Link>
			</div>
			{enrolmentsList}
		</>
	);
};
export default Index;
