import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

import { useState } from "react";
import { Link } from "react-router-dom";
const LoginForm = () => {
	const {onAuthenticated} = useAuth();

	const [form, setForm] = useState({
		email: "",
		password: "",
	});

    const errorStyle ={
        color:"red"
    }

	const handleClick = () => {
		console.log("clicked");
		axios
			.post(`https://college-api.vercel.app/login`, {
				email: form.email,
				password: form.password,
			})
			.then((response) => {
                console.log(response.data)
                onAuthenticated(true, response.data.token)
            })
			.catch((err) => {
				console.error(err);
				console.log(err.response.data.message);
                setErrorMsg(err.response.data.message)
			});
	};
	const [ErrorMsg, setErrorMsg] = useState();
	const handleForm = (e) => {
		setForm((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<>
			Email:{" "}
			<input
				onChange={handleForm}
				type="text"
				name="email"
				value={form.email}
			/>{" "}
			<br />
			Password :{" "}
			<input
				onChange={handleForm}
				type="password"
				name="password"
				value={form.password}
			/>{" "}
			<br />
			<button onClick={handleClick}>Submit</button>
            <br />
            <p style={errorStyle}>{ErrorMsg}</p>
		</>
	);
};
export default LoginForm;
