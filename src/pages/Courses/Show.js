import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../congif/api.js";
const Show = () => {
	const { id } = useParams();
	const [course, setCourse] = useState();

	let token = localStorage.getItem("token")

	useEffect(() => {
		axios
			.get(`https://courses-api.vercel.app/api/courses/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log(response.data);
				setCourse(response.data);
			})
			.catch((err) => {
				console.error(err);
			});
	},[id]);
	if (!course) return <h3>Course not found</h3>;
	return (
		<>
			<p>Show course: {id}</p>
			<div>
				<p>
					<b>Title: {course.title}</b>
					
				</p>
				<p>
					<b>Description: </b> {course.description}
				</p>
				<hr />
			</div>
		</>
	);
};
export default Show;
