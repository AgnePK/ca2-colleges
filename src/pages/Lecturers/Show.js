import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../congif/api.js";

import { Link } from "react-router-dom";
const Show = () => {
	const { id } = useParams();
	const [lecturer, setLecturer] = useState();

	let token = localStorage.getItem("token");

	useEffect(() => {
		axios
			.get(`/api/lecturers/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				// console.log(response.data);
				setLecturer(response.data.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}, [id]);
	if (!lecturer) return <h3>Loading...</h3>;
	return (
		<>
			<p>Show lecturer: {id}</p>
			<div className="">
				<div>
					<img src={`https://picsum.photos/200?random=${lecturer.id}`}
					className="circle responsive-img" />
				</div>

				<p>
					<b>Title: </b>
					{lecturer.name}
				</p>
				<p>
					<b>Address: </b> {lecturer.address}
				</p>
				<p>
					<b>Email: </b> {lecturer.email}
				</p>
				<p>
					<b>Phone: </b> {lecturer.phone}
				</p>
				<Link to={`/lecturers/${id}/edit`} className="btn waves-effect waves-light "><i className="material-icons right">mode_edit</i>Edit</Link>
			</div>
		</>
	);
};
export default Show;
