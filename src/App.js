import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import PageNotFound from "./pages/PageNotFound.js";
import Navbar from "./components/Navbar.js";

import CoursesIndex from "./pages/Courses/Index.js";
import CoursesCreate from "./pages/Courses/Create.js";
import CoursesEdit from "./pages/Courses/Edit.js";
import CoursesShow from "./pages/Courses/Show.js";

import { useAuth } from "./contexts/AuthContext.js";

function App() {
	let protectedRoutes;
	const { authenticated, onAuthenticated } = useAuth();

	useEffect(() => {
		if (localStorage.getItem("token")) {
			onAuthenticated(true);
		}
	}, []);

	if (authenticated) {
		protectedRoutes = (
			<>
				<Route path="/courses" element={<CoursesIndex />}></Route>
				<Route path="/courses/create" element={<CoursesCreate />}></Route>
				<Route path="/courses/:id/edit" element={<CoursesEdit />}></Route>
				<Route path="/courses/:id" element={<CoursesShow />}></Route>
			</>
		);
	}
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />}></Route>

					{protectedRoutes}

					<Route path="*" element={<PageNotFound />}></Route>
				</Routes>
			</Router>
		</>
	);
}

export default App;
