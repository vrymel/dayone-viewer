import { Route, BrowserRouter as Router, Routes } from "react-router";
import Layout from "./components/Layout";
// import About from "./pages/About";
// import Home from "./pages/Home";
import Main from "./pages/Main";

function App(): React.JSX.Element {
	return (
		<Router>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Main />} />
					{/* <Route path="/" element={<Home />} /> */}
					{/* <Route path="/about" element={<About />} /> */}
          			{/* <Route path="/journal" element={<Journal />} /> */}
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
