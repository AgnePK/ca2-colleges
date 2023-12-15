import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
	const { authenticated } = useAuth();
	return (
		<>
			{!authenticated ? (
				<div>
					<h4>Please log in</h4>
					<LoginForm />
				</div>
			) : (
				<h5>You are Logged in</h5>
			)}
		</>
	);
};
export default Home;
