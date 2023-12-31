import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../congif/api.js";

const Edit = () => {
	const { id } = useParams();
	const [lecturer, setLecturer] = useState();
	const [errors, setErrors] = useState({});
	const [apiErrors, setApiErrors] = useState({});

	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
	});

	const errorStyle = {
		color: "red",
	};

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/api/lecturers/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setLecturer(response.data.data);
				setForm(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);

	if (!lecturer)
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
		let included = false;
		setErrors({});
		fields.forEach((field) => {
			if (!form[field]) {
				included = true;
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

		if (isRequired(["name", "email", "phone", "address"])) {
			let token = localStorage.getItem("token");
			axios
				.put(`/api/lecturers/${id}`, form, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					// console.log(response.data.data);
					navigate(`/lecturers/${id}`);
				})
				.catch((err) => {
					console.error(err);
					console.error(err.response);
					setApiErrors(err.response.data.errors);
				});
		}
	};

	return (
		<>
			<h2>Edit your lecturer</h2>
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
					{/* <span style={errorStyle}>{apiErrors.name}</span> */}
				</div>
				<div>
					Email:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.email}
						name="email"
					/>
					<span style={errorStyle}>{errors.email?.message}</span>
					{/* <span style={errorStyle}>{apiErrors.email}</span> */}
				</div>
				<div>
					Phone Number:{" "}
					<input
						type="text"
						onChange={handleForm}
						value={form.phone}
						name="phone"
					/>
					<span style={errorStyle}>{errors.phone?.message}</span>
					{/* <span style={errorStyle}>{apiErrors.phone}</span> */}
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
					{/* <span style={errorStyle}>{apiErrors.address}</span> */}
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
export default Edit;
