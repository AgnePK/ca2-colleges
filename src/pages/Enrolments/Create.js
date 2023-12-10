import { useState, useEffect } from "react";
import axios from "../../congif/api.js";
import { useNavigate } from "react-router-dom";

const Create = () => {
	const navigate = useNavigate();
	const [courses, setCourses] = useState([]);
	const [lecturers, setLecturers] = useState([]);

	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		course_id: "",
		lecturer_id: "",
		date: "",
		time: "",
		status: "", //can be: interested,assigned,associate,career_break
	});
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

	const submitForm = (e) => {
		e.preventDefault();
		console.log("submitted", form);

		if (isRequired(["course_id", "lecturer_id", "date", "time", "status"])) {
			axios
				.post(`/api/enrolments`, form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response.data.data);
					navigate("/enrolments");
				})
				.catch((err) => {
					console.error(err);
					console.log(err.response.data);
				});
		}
	};

	const errorStyle = {
		color: "red",
	};

	return (
		<>
			<h2>Create your course</h2>
			<form onSubmit={submitForm}>
				<div>
					Course:{" "}
					<select
						class="browser-default"
						id="course_id"
						name="course_id"
						onChange={handleForm}
					>
						<option value="" disabled selected>
							Choose Course
						</option>

						{courses?.map((course) => (
							<option key={course.id} value={course.id}>
								{course.title}
							</option>
						))}
					</select>
					<span style={errorStyle}>{errors.course_id?.message}</span>
				</div>
				<div>
					Lecturer:{" "}
					<select
						class="browser-default"
						id="lecturer_id"
						name="lecturer_id"
						onChange={handleForm}
					>
						<option value="" disabled selected>
							Choose Lecturer
						</option>
						{lecturers.map((lecturer) => (
							<option key={lecturer.id} value={lecturer.id}>
								{lecturer.name}
							</option>
						))}
					</select>
					<span style={errorStyle}>{errors.lecturer_id?.message}</span>
				</div>
				<div>
					Date:{" "}
					<input
						type="date"
						onChange={handleForm}
						value={form.date}
						name="date"
					/>
					<span style={errorStyle}>{errors.date?.message}</span>
				</div>
				<div>
					Time:{" "}
					<input
						type="time"
						onChange={handleForm}
						value={form.time}
						name="time"
					/>
					<span style={errorStyle}>{errors.time?.message}</span>
				</div>

				<div class="input-field col s12">
					<select
						class="browser-default"
						id="status"
						name="status"
						onChange={handleForm}
					>
						Lecturer:{" "}
						<option value="" disabled selected>
							Choose Status
						</option>
						<option value="interested">Interested</option>
						<option value="assigned">Assigned</option>
						<option value="associate">Associate</option>
						<option value="career_break">Career Break</option>
					</select>
					<span style={errorStyle}>{errors.status?.message}</span>
				</div>

				<br />
				<button
					type="submit"
					name="action"
					class="btn waves-effect waves-light right"
				>
					Submit
					<i class="material-icons right">send</i>
				</button>
			</form>
		</>
	);
};
export default Create;
