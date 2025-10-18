import { Link, Outlet, useLocation } from "react-router";

function Layout(): React.JSX.Element {
	const location = useLocation();

	return (
		<div className="app-layout min-h-screen bg-gray-100">
			{/* <nav className="app-navigation bg-white shadow-sm p-4">
				<Link
					to="/"
					className={location.pathname === "/" ? "nav-link active text-blue-600 font-semibold" : "nav-link text-gray-600 hover:text-blue-500"}
				>
					Home
				</Link>
				<Link
					to="/about"
					className={
						location.pathname === "/about" ? "nav-link active text-blue-600 font-semibold" : "nav-link text-gray-600 hover:text-blue-500"
					}
				>
					About
				</Link>
				<Link
					to="/journal"
					className={
						location.pathname === "/journal" ? "nav-link active text-blue-600 font-semibold" : "nav-link text-gray-600 hover:text-blue-500"
					}
				>
					Journal
				</Link>
			</nav> */}
			<main className="app-content p-6">
				<Outlet />
			</main>
		</div>
	);
}

export default Layout;
