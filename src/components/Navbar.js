import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const { authenticated, onAuthenticated } = useAuth();

	const navigate = useNavigate();
	const logout = () => {
		onAuthenticated(false);
		navigate("/");
	};
	return (
		<>
			<nav class="black-text">
				<div class="nav-wrapper blue-grey">
					<a href="#" class="brand-logo">
						Colleges API
					</a>
					<ul id="nav-mobile" class="right hide-on-med-and-down">
						<li>
							{authenticated ? <button onClick={logout} class="waves-effect waves-light btn-small">Logout</button> : ""}
						</li>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/courses">Courses</Link>
						</li>
						<li>
							<Link to="/lecturers">Lecturers</Link>
						</li>
						<li>
							<Link to="/enrolments">Enrolments</Link>
						</li>
					</ul>
				</div>
			</nav>
		</>
	);
};
export default Navbar;
