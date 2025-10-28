import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import JournalContext from "./contexts/journal";
import Layout from "./components/Layout";
// import About from "./pages/About";
// import Home from "./pages/Home";
import Main from "./pages/Main";
import type { Journal } from "./types/journal";

function App(): React.JSX.Element {
	const [activeJournal, setActiveJournal] = useState<Journal | null>(null);

	return (
		<JournalContext.Provider value={{ activeJournal, setActiveJournal }}>
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
		</JournalContext.Provider>
	);
}

export default App;
