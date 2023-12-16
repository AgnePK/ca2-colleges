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
				console.log(response.data.data);
				setLecturer(response.data.data);
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
	return (
		<>
			<div className="row">
				<br />
				<div className="col m5">
					<img
						src={`https://picsum.photos/200?random=${lecturer.id}`}
						className="circle responsive-img"
					/>

					<h5>
						<b> {lecturer.name} </b>
						<Link to={`/lecturers/${id}/edit`} className="secondary-content">
							<i className="material-icons">mode_edit</i>
						</Link>
					</h5>
					<p>
						<b>Address: </b> {lecturer.address}
					</p>
					<p>
						<b>Email: </b> {lecturer.email}
					</p>
					<p>
						<b>Phone: </b> {lecturer.phone}
					</p>
				</div>
				<div className="col m6 ">
					<br />
					<ul class="collection with-header">
						<li class="collection-header">
							<h5>Enrolments</h5>
						</li>
						{lecturer.enrolments?.map((enrolment) => (
							<li className="collection-item" key={enrolment.id}>
								<div>
									{enrolment.course.title}
									<Link to={`/enrolment/${id}`}>
										<i class="material-icons right secondary-content">send</i>
									</Link>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
};
export default Show;
