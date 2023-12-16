import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../congif/api.js";

import { Link } from "react-router-dom";
const Show = () => {
	const { id } = useParams();
	const [enrolment, setEnrolment] = useState();

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/api/enrolments/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setEnrolment(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);
	if (!enrolment)
		return (
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		);
	return (
		<>
			<div>
				<br />
				<div className="card white">
					<div className="card-content black-text">
						<span className="card-title">Enrolment number {id}</span>
						<blockquote className="light">
							{enrolment.lecturer.name} teaches {enrolment.course.title}. The
							points for this course is {enrolment.course.points}. <br />
							If you need to contact the lecturer; email at{" "}
							{enrolment.lecturer.email} or call on {enrolment.lecturer.phone}
						</blockquote>
						<br />
						<div>
							{"Date: "}
							{enrolment.date}
						</div>
						<div>
							{"Course Code: "}
							{enrolment.course.code}
						</div>
					</div>
					<div className="card-action">
						<Link to={`/enrolments/${id}/edit`}>
							{" "}
							<i className="material-icons tiny">mode_edit</i> Edit
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
export default Show;
