import { useState } from "react";
import { useNavigate } from "react-router";
import electronLogo from "../assets/electron.svg";

function Home(): React.JSX.Element {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSelectJournal() {
		setIsLoading(true);
		try {
			const result = await window.electron.ipcRenderer.invoke("selectJournal");

			if (result?.journalPath) {
				console.log("Journal loaded successfully:", result.data);
				// Navigate to journal page with the journal data
				navigate("/journal", { state: { journalData: result } });
			}
		} catch (error) {
			console.error("Failed to select journal:", error);
			// Navigate to journal page with error data
			navigate("/journal", {
				state: {
					journalData: {
						success: false,
						error:
							error instanceof Error ? error.message : "Unknown error occurred",
					},
				},
			});
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="flex flex-col items-center justify-center space-y-6">
			<img alt="logo" className="logo w-24 h-24" src={electronLogo} />
			<div className="creator text-gray-600">Powered by electron-vite</div>
			<div className="text text-center max-w-md">
				Build an Electron app with <span className="react text-blue-600 font-semibold">React</span>
				&nbsp;and <span className="ts text-green-600 font-semibold">TypeScript</span>
			</div>
			<p className="tip text-sm text-gray-500 text-center">
				Please try pressing <code className="bg-gray-200 px-2 py-1 rounded text-xs">F12</code> to open the devTool
			</p>
			<div className="actions">
				<button
					onClick={handleSelectJournal}
					disabled={isLoading}
					type="button"
					className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors duration-200"
				>
					{isLoading ? "Loading..." : "Select Journal"}
				</button>
			</div>
		</div>
	);
}

export default Home;
