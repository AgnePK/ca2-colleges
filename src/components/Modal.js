import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import DeleteBtn from "./DeleteBtn";

class Modal extends Component {
	// I am using this code from https://javascript.plainenglish.io/how-to-use-materialize-css-modal-in-react-53f9c85ba40d

	// I had huge difficulties getting the general modal
	// component to work

	// console.log("test");

	componentDidMount() {
		const options = {
			onOpenStart: () => {
				console.log("Open Start");
			},
			onOpenEnd: () => {
				console.log("Open End");
			},
			onCloseStart: () => {
				console.log("Close Start");
			},
			onCloseEnd: () => {
				console.log("Close End");
			},
			inDuration: 250,
			outDuration: 250,
			opacity: 0.5,
			dismissible: false,
			startingTop: "4%",
			endingTop: "10%",
		};
		M.Modal.init(this.Modal, options);

		// let instance = M.Modal.getInstance(this.Modal);
		// instance.open();
		// instance.close();
		// instance.destroy();

	}
	
	render() {
		return (
			<div>
				<a
					className="waves-effect waves-light red btn modal-trigger"
					data-target={`myModal-${this.props.id}`}
				>
					Delete
				</a>
				<div
					ref={(Modal) => {
						this.Modal = Modal;
					}}
					id={`myModal-${this.props.id}`}
					className="modal"
				>
					<div className="modal-content">
						<h4>Delete {this.props.resource}</h4>
						<h4>{this.props.id}</h4>
						<p>Warning! You are trying to delete this. Are you sure?</p>
					</div>
					<div className="modal-footer">
						<a className="modal-close waves-effect waves-red btn-flat black-text">
							Cancel
						</a>
						<DeleteBtn
							resource={this.props.resource}
							id={this.props.id}
							deleteCallback={this.props.deleteCallback}
                            variable={this.props.variable}
						/>
					</div>
				</div>
			</div>
		);
	}
}


export default Modal;
