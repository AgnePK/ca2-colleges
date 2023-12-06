import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
	const { authenticated } = useAuth();
	return (
		<>
			<h3>Please log in</h3>
			{!authenticated ? <LoginForm /> : <p>You are Logged in</p>}
		</>
	);
};
export default Home;
