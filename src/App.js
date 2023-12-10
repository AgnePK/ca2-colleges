import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import PageNotFound from "./pages/PageNotFound.js";
import Navbar from "./components/Navbar.js";
import Footer from "./components/Footer.js";

import CoursesIndex from "./pages/Courses/Index.js";
import CoursesCreate from "./pages/Courses/Create.js";
import CoursesEdit from "./pages/Courses/Edit.js";
import CoursesShow from "./pages/Courses/Show.js";

import LecturersIndex from "./pages/Lecturers/Index.js";
import LecturersCreate from "./pages/Lecturers/Create.js";
import LecturersEdit from "./pages/Lecturers/Edit.js";
import LecturersShow from "./pages/Lecturers/Show.js";

import EnrolmentsIndex from "./pages/Enrolments/Index.js";
import EnrolmentsCreate from "./pages/Enrolments/Create.js";
import EnrolmentsEdit from "./pages/Enrolments/Edit.js";
import EnrolmentsShow from "./pages/Enrolments/Show.js";

import LoginForm from "./components/LoginForm.js";

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

				<Route path="/lecturers" element={<LecturersIndex />}></Route>
				<Route path="/lecturers/create" element={<LecturersCreate />}></Route>
				<Route path="/lecturers/:id/edit" element={<LecturersEdit />}></Route>
				<Route path="/lecturers/:id" element={<LecturersShow />}></Route>

				<Route path="/enrolments" element={<EnrolmentsIndex />}></Route>
				<Route path="/enrolments/create" element={<EnrolmentsCreate />}></Route>
				<Route path="/enrolments/:id/edit" element={<EnrolmentsEdit />}></Route>
				<Route path="/enrolments/:id" element={<EnrolmentsShow />}></Route>


			</>
		);
	}

	return (
		<>
			<Router>
				<Navbar />
				<div className="container">
					<Routes>
						<Route path="/" element={<Home />}></Route>
						{/* <Route path="/courses" element={<CoursesIndex />}></Route> */}

						{protectedRoutes}

						<Route path="*" element={<PageNotFound />}></Route>
					</Routes>
				</div>
				<Footer />
			</Router>
		</>
	);
}

export default App;
