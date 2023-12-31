import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../congif/api.js";

const Edit = () => {
	const { id } = useParams();
	const [course, setCourse] = useState();
	const [errors, setErrors] = useState({});
	const [apiErrors, setApiErrors] = useState({});

	const navigate = useNavigate();

	const [form, setForm] = useState({
		title: "",
		description: "",
		code: "",
		points: "",
		level: "",
	});

	const errorStyle = {
		color: "red",
	};

	let token = localStorage.getItem("token");

	// this axios is getting the info of this course and filling in the correct data to be able to edit
	useEffect(() => {
		axios
			.get(`/api/courses/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setCourse(response.data.data);
				setForm(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);

	if (!course)
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
		// console.log("submitted", form);

		if (isRequired(["title", "description", "code", "points", "level"])) {
			let token = localStorage.getItem("token");
			axios
				.put(`/api/courses/${id}`, form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					// console.log(response.data.data);
					navigate(`/courses/${id}`);
				})
				.catch((err) => {
					// console.error(err);
					setApiErrors(err.response.data.errors);
				});
		}
	};

	return (
		<>
			<h2>Edit your course</h2>
			<form onSubmit={submitForm}>
				<div>
					Title:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.title}
						name="title"
					/>
					<span style={errorStyle}>{errors.title?.message}</span>
					<span style={errorStyle}>{apiErrors.code}</span>
				</div>
				<div>
					description:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.description}
						name="description"
					/>
					<span style={errorStyle}>{errors.description?.message}</span>
					<span style={errorStyle}>{apiErrors.description}</span>
				</div>
				<div>
					Code:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.code}
						name="code"
					/>
					<span style={errorStyle}>{errors.code?.message}</span>
					<span style={errorStyle}>{apiErrors.code}</span>
				</div>
				<div>
					points:{" "}
					<input
						type="number"
						onChange={handleForm}
						value={form.points}
						name="points"
						min="100"
						max="625"
					/>
					<span style={errorStyle}>{errors.points?.message}</span>
					<span style={errorStyle}>{apiErrors.points}</span>
				</div>
				<div>
					level:{" "}
					<input
						type="number"
						onChange={handleForm}
						value={form.level}
						name="level"
						min="5"
						max="10"
					/>
					<span style={errorStyle}>{errors.level?.message}</span>
					<span style={errorStyle}>{apiErrors.level}</span>
				</div>
				<button
					type="submit"
					name="action"
					className="btn waves-effect waves-light right"
				>
					Submit
					<i className="material-icons right">send</i>
				</button>
			</form>
		</>
	);
};
export default Edit;
