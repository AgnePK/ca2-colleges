import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";

import Modal from "../../components/Modal.js";


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

	// remove course will remove the physical card of the course that was just deleted. it removes the course from the overall courses and updates the overall with the new (updated) course. So the Courses returns the new cards without the deleted one
	const removeCourse = (id) => {
		console.log("deleted", id);
		let updatedCourses = courses.filter((course) => {
			return course.id !== id;
		});
		setCourses(updatedCourses);
	};
	if (courses.length === 0)
		return (
			<div class="progress">
				<div class="indeterminate"></div>
			</div>
		);
	
	// looping through each course from the api and designing the way the card looks. 
	const coursesList = courses.map((course) => {
		return (
			<div key={course.id} className="col s12 m6 xl6">
				<div className="card transparent hoverable">
					<div className="card-content">
						<Link
							className="card-title black-text"
							to={`/courses/${course.id}`}
						>
							<b>{course.title}</b>
						</Link>
						<blockquote>
							<p>Course Code: {course.code}</p>
							<p>Level: {course.level}</p>
						</blockquote>
						{/* <br /> */}
						<p className="truncate light">{course.description}</p>
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
