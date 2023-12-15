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
			<div className="navbar-fixed">
				<nav className="black-text">
					<div className="nav-wrapper blue-grey lighten-5">
						<Link to="/" className="brand-logo black-text center hide-on-small-only">
							Colleges
						</Link>

						<ul className="left ">
							<li>
								<Link className="black-text" to="/">
									Home
								</Link>
							</li>
							<li>
								<Link className="black-text" to="/courses">
									Courses
								</Link>
							</li>
							<li>
								<Link className="black-text" to="/lecturers">
									Lecturers
								</Link>
							</li>
							<li>
								<Link className="black-text" to="/enrolments">
									Enrolments
								</Link>
							</li>
						</ul>
						<ul className="right">
							<li>
								{authenticated ? (
									<button
										onClick={logout}
										className="waves-effect waves-light btn-small"
									>
										Logout
									</button>
								) : (
									""
								)}
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</>
	);
};
export default Navbar;
