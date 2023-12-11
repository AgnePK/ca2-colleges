import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

import DeleteBtn from "../../components/DeleteBtn";
import Modal from "../../components/Modal.js";

// import M from "materialize-css";

const Index = () => {
	const { authenticated } = useAuth();

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

	const removeCourse = (id) => {
		console.log("deleted", id);
		let updatedCourses = courses.filter((course) => {
			return course.id !== id;
		});
		setCourses(updatedCourses);
	};
	if (courses.length === 0) return <h3>There are no courses</h3>;
	const coursesList = courses.map((course) => {
		return (
			<div key={course.id} className="col s6">
				<div className="card grey lighten-5 hoverable">
					<div className="card-content">
						<p>
							<b>Title: </b>
							<Link to={`/courses/${course.id}`}> {course.title}</Link>
						</p>
						<p className="truncate">
							<b>Description: </b> {course.description}
						</p>
						<p>
							<b>Course Code: </b> {course.code}
						</p>
						<p>
							<b>Course Level: </b> {course.level}
						</p>
					</div>
					<div className="card-action">
						<Modal
							resource="courses"
							id={course.id}
							deleteCallback={removeCourse}
							variable={course}
						/>
						{/* Try to use the modal component. put props of deletebtn into modal and use it in the modal.js. use deletebtn in modal.js  */}
					</div>
				</div>
			</div>
		);
	});


	// document.addEventListener('DOMContentLoaded', function() {
	// 	var elems = document.querySelectorAll('.modal');
	// 	var instances = M.Modal.init(elems, options);
	//   });

	return (
		<>
			<div className="center">
				<h1>All courses</h1>
				<Link to="/courses/create">
					<button className="waves-effect waves-light btn-large">
						<i className="material-icons right">add_circle</i>Create Course
					</button>
				</Link>
			</div>
			<div className="row">{coursesList}</div>
		</>
	);
};
export default Index;
