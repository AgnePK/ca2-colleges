import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../congif/api.js";

import { Link } from "react-router-dom";
const Show = () => {
	const { id } = useParams();
	const [course, setCourse] = useState();

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/api/courses/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log(response.data);
				setCourse(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);
	if (!course) return <h3>Loading...</h3>;
	return (
		<>
			<div>
				<div class="card white">
					<div class="card-content black-text">
						<span class="card-title">{course.title}</span>
						<br/>
						<blockquote className="light">{course.description} </blockquote>
						<br />
						<div>
							{"Level "}
							{course.level}
							{" course"}
						</div>
						<div>
							{"Code: "}
							{course.code}
						</div>
						<div>
							{"Points: "}
							{course.points}
						</div>
					</div>
					<div class="card-action">
						<Link to={`/courses/${id}/edit`}>
							{" "}
							<i class="material-icons tiny">mode_edit</i> Edit
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};
export default Show;
