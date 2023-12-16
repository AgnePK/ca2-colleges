import { useState } from "react";
import axios from "../../congif/api.js";
import { useNavigate } from "react-router-dom";

const Create = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [apiErrors, setApiErrors] = useState({});


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

	// these lines of code validates if the data is there and if it is correct.
	// the code pattern is is testing if the input is the correct format.
	const validateCode = (code) => {
		const codePattern = /^[A-Za-z]{2}\d{3}$/;
		return codePattern.test(code);
	};
	const isRequired = (fields) => {
		const allErrors = {};
		let included = true;

		// This is looping through each value in the form and seeing if it is empty.
		// if it is, an error will appear
		fields.forEach((field) => {
			if (!form[field]) {
				included = false;
				allErrors[field] = { message: `${field} is required!` };
			}
		});
		if (form["code"] && !validateCode(form["code"])) {
			included = false;
			allErrors["code"] = {
				message: `Please make the Code format "AB123"`,
			};
		}
		setErrors(allErrors);
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
					// console.error(err);
					// console.log(err.response.data.errors.code[0]);
					setErrors(err.response.data.errors);
					setApiErrors(err.response.data.errors);
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
					<span style={errorStyle}>{apiErrors.title}</span>
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
