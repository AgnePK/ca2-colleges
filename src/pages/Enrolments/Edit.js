import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../congif/api.js";

const Edit = () => {
	const { id } = useParams();
	const [enrolment, setEnrolment] = useState();
	const [courses, setCourses] = useState([]);
	const [lecturers, setLecturers] = useState([]);

	const [errors, setErrors] = useState({});
	const [apiErrors, setApiErrors] = useState({});

	const navigate = useNavigate();

	const [form, setForm] = useState({
		course_id: "",
		lecturer_id: "",
		date: "",
		time: "",
		status: "",
	});

	const errorStyle = {
		color: "red",
	};

	let token = localStorage.getItem("token");
	useEffect(() => {
		axios
			.get(`/api/courses`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log(response.data.data);
				setCourses(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
		axios
			.get(`/api/lecturers`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log(response.data.data);
				setLecturers(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, []);

	useEffect(() => {
		axios
			.get(`/api/enrolments/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setEnrolment(response.data.data);
				setForm(response.data.data);
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

	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const isRequired = (fields) => {
		let included = true;
		setErrors({});
		fields.forEach((field) => {
			if (!form[field]) {
				included = false;
				setErrors((prevState) => ({
					...prevState,
					[field]: {
						message: `${field} is required`,
					},
				}));
			}
		});
		return included;
	};

	const submitForm = (e) => {
		e.preventDefault();
		console.log("submitted", form);

		if (isRequired(["course_id", "lecturer_id", "date", "time", "status"])) {
			let token = localStorage.getItem("token");
			axios
				.put(`/api/enrolments/${id}`, form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response.data.data);
					navigate(`/enrolments/${id}`);
				})
				.catch((err) => {
					console.error(err);
					setApiErrors(err.response.data.errors);
				});
		}
	};

	return (
		<>
			<h2>Edit your enrolment</h2>
			<form onSubmit={submitForm}>
				<div>
					Course:{" "}
					<select
						className="browser-default"
						id="course_id"
						name="course_id"
						onChange={handleForm}
						value={form.course_id}
					>
						{courses?.map((course) => (
							<option key={course.id} value={course.id}>
								{course.title}
							</option>
						))}
					</select>
					<span style={errorStyle}>{errors.course_id?.message}</span>
					<span style={errorStyle}>{apiErrors.course_id}</span>
				</div>
				<div>
					Lecturer:{" "}
					<select
						className="browser-default"
						id="lecturer_id"
						name="lecturer_id"
						onChange={handleForm}
						value={form.lecturer_id}
					>
						{lecturers.map((lecturer) => (
							<option key={lecturer.id} value={lecturer.id}>
								{lecturer.name}
							</option>
						))}
					</select>
					<span style={errorStyle}>{errors.description?.message}</span>
					<span style={errorStyle}>{apiErrors.description}</span>

				</div>
				<div>
					Date:{" "}
					<input
						type="date"
						onChange={handleForm}
						value={form.date}
						name="date"
					/>
					<span style={errorStyle}>{errors.code?.message}</span>
					<span style={errorStyle}>{apiErrors.code}</span>
				</div>
				<div>
					Time:{" "}
					<input
						type="time"
						onChange={handleForm}
						value={form.time}
						name="time"
					/>
					<span style={errorStyle}>{errors.points?.message}</span>
					<span style={errorStyle}>{apiErrors.points}</span>

				</div>

				<div className="input-field col s12">
					Status:{" "}
					<select
						className="browser-default"
						id="status"
						name="status"
						onChange={handleForm}
						value={form.status}
					>
						<option value="interested">Interested</option>
						<option value="assigned">Assigned</option>
						<option value="associate">Associate</option>
						<option value="career_break">Career Break</option>
					</select>
					<span style={errorStyle}>{errors.status?.message}</span>
					<span style={errorStyle}>{apiErrors.status}</span>
				</div>
				<br />
				<button
					type="submit"
					name="action"
					className="btn waves-effect waves-light"
				>
					Submit
					<i className="material-icons right">send</i>
				</button>
			</form>
		</>
	);
};
export default Edit;
