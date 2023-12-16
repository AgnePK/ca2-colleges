import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";

import Modal from "../../components/Modal.js";

const Index = () => {
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
			return enrolment.id !== id;
		});
		setEnrolments(updatedEnrolments);
	};

	if (enrolments.length === 0)
		return (
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		);
	const enrolmentsList = enrolments.map((enrolment) => {
		return (
			<div key={enrolment.id} className="col s12 m6 xl4">
				<div className="card transparent hoverable">
					<div className="card-content">
						<p>
							<Link
								className="card-title black-text"
								to={`/enrolments/${enrolment.id}`}
							>
								Enrolment {enrolment.id}
							</Link>
						</p>
						<blockquote className="grey lighten-4">
							<p>
								<Link
									className="black-text"
									to={`/lecturers/${enrolment.lecturer.id}`}
								>
									{" "}
									{enrolment.lecturer.name}
								</Link>
							</p>
							<p>
								<Link
									className="black-text"
									to={`/lecturers/${enrolment.course.id}`}
								>
									{" "}
									{enrolment.course.title}
								</Link>
							</p>
						</blockquote>
						{/* <br /> */}
						<p className="light">{enrolment.status}</p>
					</div>
					<div className="card-action">
						<Modal
							resource="enrolments"
							id={enrolment.id}
							deleteCallback={removeEnrolment}
							variable={enrolment}
						/>
					</div>
				</div>
			</div>
		);
	});

	return (
		<>
			<div className="center">
				<h1>All enrolments</h1>
				<Link to="/enrolments/create">
					<button className="waves-effect waves-light btn-large">
						<i className="material-icons right">add_circle</i>Create Enrolment
					</button>
				</Link>
			</div>
			<div className="row">{enrolmentsList}</div>
		</>
	);
};
export default Index;
