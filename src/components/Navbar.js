import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
	const {authenticated, onAuthenticated} = useAuth()

	const navigate = useNavigate();
	const logout = () => {
		onAuthenticated(false);
		navigate("/");
	};
	return (
		<>
			<Link to="/">Home</Link>|<Link to="/courses">Courses</Link>
			{authenticated ? <button onClick={logout}>Logout</button> : ""}
		</>
	);
};
export default Navbar;
