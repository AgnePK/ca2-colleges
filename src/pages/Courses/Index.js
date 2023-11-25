import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";
const Index = () => {
	const [courses, setCourses] = useState("");

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/api/courses`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {

				console.log(response.data.data);
				setCourses(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	if (courses.length === 0) return <h3>There are no courses</h3>;
	const coursesList = courses.map((course) => {
		return (
			<>
				<div key={course.id}>
					<p>
						<b>Title: </b>
						<Link to={`/courses/${course._id}`}> {course.title}</Link>
					</p>
					<p>
						<b>Description: </b> {course.description}
					</p>
					<hr />
				</div>
			</>
		);
	});
	return (
		<>
			<h1>All courses</h1>
			{coursesList}
		</>
	);
};
export default Index;
