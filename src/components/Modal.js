import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

import DeleteBtn from "./DeleteBtn";

class Modal extends Component {
	// I am using this code from https://javascript.plainenglish.io/how-to-use-materialize-css-modal-in-react-53f9c85ba40d

	// The css framework has a modal but it foesnt work. i imported the js to make it function but it failed. i searched online for how people made a modal using this framework in react. 


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
					{/* {console.log(this.props.variable)} */}
					<div className="modal-content">
						<h4>Delete <b>{this.props.variable.name}</b></h4>
						<p>Warning! You are trying to delete this.  <i>Are you sure?</i></p>
					</div>
					<div className="modal-footer">
						<a className="modal-close waves-effect waves-red btn-flat black-text">
							Cancel
						</a>

						{/* I put the delete button component in the modal so that when a user actually confirms to delete, they were informed that they may be deleting an enrolment too.  */}
						{/* in the individual pages im putting in the props through the modal that i am importing. in here im putting those props through to the delete button. */}
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
