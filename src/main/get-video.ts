import { access } from "node:fs/promises";
import { extname, join } from "node:path";
import { ipcMain } from "electron";

const allowedVideoExtensions = [
	".mp4",
	".mov",
	".avi",
	".wmv",
	".flv",
	".webm",
	".mkv",
	".m4v",
];

export function setupVideoHandlers(): void {
	// Handle getting video file path
	ipcMain.handle(
		"get-video",
		async (
			_event,
			baseLocation: string,
			filename: string,
		): Promise<string | null> => {
			try {
				// Validate filename to prevent directory traversal
				if (
					!filename ||
					filename.includes("..") ||
					filename.includes("/") ||
					filename.includes("\\")
				) {
					throw new Error("Invalid filename");
				}

				// Validate file extension
				const ext = extname(filename).toLowerCase();
				if (!allowedVideoExtensions.includes(ext)) {
					throw new Error(`Unsupported video format: ${ext}`);
				}

				// Construct file path
				const filePath = join(baseLocation, "videos", filename);

				// Check if file exists
				await access(filePath);

				// Return media protocol URL
				return `file://${filePath}`;
			} catch (error) {
				console.error(`Error accessing video file ${filename}:`, error);
				return null;
			}
		},
	);
}
