import { useState } from "react";
import axios from "../../congif/api.js";
import { useNavigate } from "react-router-dom";
const Create = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [form, setForm] = useState({
		title: "",
		description: "",
		code: "",
		points: "",
		level: "",
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
	const submitForm = (e) => {
		e.preventDefault();
		console.log("submitted", form);

		if (isRequired(["title", "description", "code", "points", "level"])) {
			let token = localStorage.getItem("token");
			axios
				.post(`/api/courses`, form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					navigate("/courses");
				})
				.catch((err) => {
					console.error(err);
					console.log(err.response.data.errors.code[0]);
					setErrors(err.response.data.errors.code[0]);
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
					Title:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.title}
						name="title"
					/>
					<span style={errorStyle}>{errors.title?.message}</span>
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
				</div>
				{/* <div>{errors}</div> */}
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
export default Create;
