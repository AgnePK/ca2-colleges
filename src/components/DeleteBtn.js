import { useState } from "react";
import axios from "../congif/api";
import Modal from "./Modal";

const DeleteBtn = ({ id, resource, deleteCallback, variable }) => {
	const [isLoading, setIsLoading] = useState(false);
	const onDelete = () => {
		setIsLoading(true);
		let token = localStorage.getItem("token");

		// this if statement is checking to see IF the variable that is being put through (in props) has enrolments or not
		// IF it does, the enrolments will be deleted first, then the course/ lecturer after.
		// if its an enrolment alone that is being deleted, it ignores the next code that deletes lecturers and courses. because it was already deleted before.
		//and visa versa, if no enrolments, it skips and deletes the course and lecturer.

		if (variable.enrolments) {
			let listOfDeleteRequests = variable.enrolments.map((current, index) =>
				axios.delete(`/api/enrolments/${current.id}`, {
					headers: { Authorization: `Bearer ${token}` },
				})
			);

			Promise.all(listOfDeleteRequests).then((response) => {
				axios
					.delete(`/api/${resource}/${id}`, {
						headers: { Authorization: `Bearer ${token}` },
					})
					.then((response) => {
						console.log(response.data);
						deleteCallback(id);
					})
					.catch((err) => {
						console.log(err.response.data);
					});
			});
		} else {
			axios
				.delete(`/api/${resource}/${id}`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((response) => {
					console.log(response.data);
					deleteCallback(id);
				})
				.catch((err) => {
					console.log(err.response.data);
				});
		}
	};

	// Attempted to use the spinner from MaterializeCSS
	let spinner = (
		<div className="preloader-wrapper small active">
			<div className="spinner-layer spinner-red-only">
				<div className="circle-clipper left">
					<div className="circle"></div>
				</div>
				<div className="gap-patch">
					<div className="circle"></div>
				</div>
				<div className="circle-clipper right">
					<div className="circle"></div>
				</div>
			</div>
		</div>
	);

	return (
		<>
			<button
				onClick={onDelete}
				className="btn btn-small waves-effect waves-light red"
			>
				{isLoading ? spinner : "Delete"}
			</button>
		</>
	);
};
export default DeleteBtn;
