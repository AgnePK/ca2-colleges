import { useState } from "react";
import axios from "../../congif/api.js";
import { useNavigate } from "react-router-dom";
const Create = () => {
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [apiErrors, setApiErrors] = useState({});

	const [form, setForm] = useState({
		name: "",
		address: "",
		email: "",
		phone: "",
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

		if (isRequired(["name", "address", "email", "phone"])) {
			let token = localStorage.getItem("token");
			axios
				.post(`/api/lecturers`, form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					navigate("/lecturers");
				})
				.catch((err) => {
					console.error(err);
					console.log(err.response.data);
					setApiErrors(err.response.data.errors);

				});
		}
	};

	const errorStyle = {
		color: "red",
	};

	return (
		<>
			<h2>Create a lecturer</h2>
			<form onSubmit={submitForm}>
				<div>
					Name:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.name}
						name="name"
					/>
					<span style={errorStyle}>{errors.name?.message}</span>
					<span style={errorStyle}>{apiErrors.name}</span>

				</div>
				<div>
					Address:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.address}
						name="address"
					/>
					<span style={errorStyle}>{errors.address?.message}</span>
					<span style={errorStyle}>{apiErrors.address}</span>

				</div>
				<div>
					Email:{" "}
					<input
						type="email"
						onChange={handleForm}
						value={form.email}
						name="email"
					/>
					<span style={errorStyle}>{errors.email?.message}</span>
					<span style={errorStyle}>{apiErrors.email}</span>

				</div>
				<div>
					Phone:{" "}
					<input
						type="number"
						onChange={handleForm}
						value={form.phone}
						name="phone"
					/>
					<span style={errorStyle}>{errors.phone?.message}</span>
					<span style={errorStyle}>{apiErrors.phone}</span>

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
export default Create;
