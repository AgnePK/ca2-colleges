import { useEffect, useState } from "react";
import axios from "../../congif/api.js";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.js";

import DeleteBtn from "../../components/DeleteBtn";
import LoginForm from "../../components/LoginForm.js";

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
			return course._id !== id;
		});
		setCourses(updatedCourses);
	};

	if (courses.length === 0) return <h3>There are no courses</h3>;
	const coursesList = courses.map((course) => {
		// let enrolmentInfo = course.enrolments.map((enrolment)=>{
		// // let lecturers = course.enrolments.lecturer.map((lecturer)=>{
		// // 	return lecturer;
		// // })
		// 	return <div key={enrolment._id}>{enrolment.id}</div>

		// })
		return (
			<div key={course._id}>
				{/* <div>{enrolmentInfo}</div> */}
				<div class="col s5">
					<div class="card grey lighten-5 hoverable">
						<div class="card-content">
							<p>
								<b>Title: </b>
								<Link to={`/courses/${course.id}`}> {course.title}</Link>
							</p>
							<p class="truncate">
								<b>Description: </b> {course.description}
							</p>
							<p>
								<b>Course Code: </b> {course.code}
							</p>
							<p>
								<b>Course Level: </b> {course.level}
							</p>
						</div>
						<div class="card-action">
							{authenticated ? (
								<DeleteBtn
									resource="courses"
									id={course._id}
									deleteCallback={removeCourse}
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
				<h1>All courses</h1>
				<Link to="/courses/create">
					<button class="waves-effect waves-light btn-large">
						<i class="material-icons right">add_circle</i>Create Course
					</button>
				</Link>
			</div>
			<div className="row">{coursesList}</div>
		</>
	);
};
export default Index;
