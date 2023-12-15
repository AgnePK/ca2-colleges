import { useState } from "react";
import axios from "../congif/api";
import Modal from "./Modal";

const DeleteBtn = ({ id, resource, deleteCallback, variable }) => {
	const [isLoading, setIsLoading] = useState(false);
	const onDelete = () => {
		setIsLoading(true);
		let token = localStorage.getItem("token");

		// console.log(variable.enrolments);

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
			>{isLoading ?  spinner  : "Delete"}
			</button>
				
		</>
	);
};
export default DeleteBtn;
