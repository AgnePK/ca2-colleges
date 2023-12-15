const Footer = () => {
	return (
		<>
			<footer className="page-footer blue-grey lighten-5">
				<div className="container">
					<div className="row">
						<div className="col l6 s12">
							<h5 className="black-text">Colleges API</h5>
							<p className="black-text text-lighten-4">
								This website displays all courses, lecturers and their enrolments. Registered and authenticated users are able to create, read, update and delete all lecturers, courses and enrolments. 
							</p>
						</div>
						<div className="col l4 offset-l2 s12">
							<h5 className="black-text">Links</h5>
							<ul>
								<li>
									<a target="_blank" className="black-text text-lighten-3" href="https://github.com/AgnePK/ca2-colleges">
										Github
									</a>
								</li>
								<li>
									<a target="_blank" className="black-text text-lighten-3" href="https://www.figma.com/file/9TgGaemEoWAULLntCDNIXx/CA2-CollegesAPI?type=design&node-id=0%3A1&mode=design&t=36dAXwGz92cepInK-1">
										Figma
									</a>
								</li>
								<li>
									<a target="_blank" className="black-text text-lighten-3" href="https://materializecss.com/">
										MaterializeCSS
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="footer-copyright">
					<div className="container black-text">
						© 2014 Copyright Text
						<a className="black-text text-lighten-4 right" href="#!">
							More Links
						</a>
					</div>
				</div>
			</footer>
		</>
	);
};
export default Footer;
