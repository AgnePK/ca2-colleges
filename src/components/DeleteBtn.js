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
		<div class="preloader-wrapper small active">
			<div class="spinner-layer spinner-red-only">
				<div class="circle-clipper left">
					<div class="circle"></div>
				</div>
				<div class="gap-patch">
					<div class="circle"></div>
				</div>
				<div class="circle-clipper right">
					<div class="circle"></div>
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
