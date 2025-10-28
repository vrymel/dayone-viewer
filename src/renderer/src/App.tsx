import { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router";
import JournalContext from "@/contexts/journal";
import Layout from "./components/Layout";
// import About from "./pages/About";
// import Home from "./pages/Home";
import Main from "./pages/Main";

type JournalEntry = {
	creationDate: string;
	duration: number;
	richText: string;
	creationOSName: string;
	creationDeviceModel: string;
	location: {
		region: {
			center: {
				longitude: number;
				latitude: number;
			};
			radius: number;
		};
		localityName: string;
		country: string;
		timeZoneName: string;
		administrativeArea: string;
		longitude: number;
		placeName: string;
		latitude: number;
	};
	starred: boolean;
	creationDevice: string;
	modifiedDate: string;
	editingTime: number;
	creationDeviceType: string;
	creationOSVersion: string;
	photos: Array<{
		fileSize: number;
		orderInEntry: number;
		creationDevice: string;
		duration: number;
		favorite: boolean;
		type: string;
		filename: string;
		identifier: string;
		date: string;
		exposureBiasValue: number;
		height: number;
		width: number;
		md5: string;
		isSketch: boolean;
	}>;
	timeZone: string;
	uuid: string;
	isPinned: boolean;
	isAllDay: boolean;
	weather: Record<string, unknown>;
	text: string;
};

type JournalFile = {
	metadata: { version: string };
	entries: JournalEntry[];
};

type Journal = {
	name: string;
	data: JournalFile[];
};

function App(): React.JSX.Element {
	const [activeJournal, setActiveJournal] = useState<Journal>({});

	return (
		<JournalContext value={{ activeJournal, setActiveJournal }}>
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
		</JournalContext>
	);
}

export default App;
