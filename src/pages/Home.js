import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
	const { authenticated } = useAuth();
	return (
		<>
			<h1>home page</h1>
			{!authenticated ? <LoginForm /> : <p>You are Logged in</p>}
		</>
	);
};
export default Home;
