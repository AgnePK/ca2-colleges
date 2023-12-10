import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../congif/api.js";

import { Link } from "react-router-dom";
const Show = () => {
	const { id } = useParams();
	const [enrolment, setEnrolment] = useState();

	let token = localStorage.getItem("token")

	useEffect(() => {
		axios
			.get(`/api/enrolments/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log(response.data);
				setEnrolment(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	},[id]);
	if (!enrolment) return <h3>Loading...</h3>;
	return (
		<>
			<p>Show enrolment: {id}</p>
			<div>
				<p>
					<b>Course: </b>{enrolment.course.title}
				</p>
				<p>
					<b>course lecturer: </b>{enrolment.lecturer.name}
				</p>
				<p>
					<b>Date: </b>{enrolment.date}
				</p>
				<Link to={`/enrolments/${id}/edit`}>Edit</Link>

				<hr />
			</div>
		</>
	);
};
export default Show;
