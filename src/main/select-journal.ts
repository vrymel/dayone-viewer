import { readdirSync, readFileSync, statSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { type BrowserWindow, dialog, ipcMain } from "electron";

export function setupJournalHandlers(mainWindow: BrowserWindow) {
	ipcMain.handle("journalList", async () => {
		const basePath = "/Users/vrymel/Developer/projects/dayone-journals";

		try {
			// Read all items in the base directory
			const items = readdirSync(basePath);
			const journalList: Array<{ name: string; path: string; data: any }> = [];

			for (const item of items) {
				const itemPath = join(basePath, item);

				// Check if the item is a directory
				try {
					const stats = statSync(itemPath);
					if (stats.isDirectory()) {
						// Read contents of the directory
						const dirContents = readdirSync(itemPath);

						// Find JSON files in the directory
						for (const file of dirContents) {
							if (extname(file).toLowerCase() === ".json") {
								const filePath = join(itemPath, file);

								try {
									// Read and parse the JSON file
									const fileContent = readFileSync(filePath, "utf-8");
									const jsonData = JSON.parse(fileContent);

									// Add to the journal list with name (filename) and data
									journalList.push({
										name: basename(file, ".json"), // filename without extension
										path: itemPath,
										data: jsonData,
									});
								} catch (parseError) {
									console.error(
										`Error parsing JSON file ${filePath}:`,
										parseError,
									);
									// Continue with other files even if one fails
								}
							}
						}
					}
				} catch (statError) {
					console.error(`Error reading directory item ${itemPath}:`, statError);
					// Continue with other items even if one fails
				}
			}

			console.log({ foo: journalList[0].data });

			return journalList;
		} catch (error) {
			console.error("Error reading journals directory:", error);
			return [];
		}
	});

	ipcMain.handle("selectJournal", async () => {
		const result = await dialog.showOpenDialog(mainWindow, {
			properties: ["openDirectory"],
			title: "Select journals directory",
			filters: [
				{ name: "JSON Files", extensions: ["json"] },
				// { name: 'All Files', extensions: ['*'] }
			],
		});

		if (result.canceled) {
			return null;
		}

		return {
			journalPath: result.filePaths[0],
		};

		// const filePath = result.filePaths[0];

		// try {
		//   // Read and parse the JSON file
		//   const fileContent = readFileSync(filePath, 'utf-8');
		//   const jsonData = JSON.parse(fileContent);

		//   return {
		//     success: true,
		//     data: jsonData,
		//     filePath: filePath
		//   };
		// } catch (error) {
		//   console.error('Error parsing JSON file:', error);
		//   return {
		//     success: false,
		//     error: error instanceof Error ? error.message : 'Unknown error occurred',
		//     filePath: filePath
		//   };
		// }
	});
}
