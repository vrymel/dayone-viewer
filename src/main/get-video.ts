import { ipcMain } from "electron";
import { getFileAsDataUrl, getVideoMimeType, type FileHandlerConfig } from "./file-handlers";

const videoConfig: FileHandlerConfig = {
	allowedExtensions: [
		".mp4",
		".mov",
		".avi",
		".wmv",
		".flv",
		".webm",
		".mkv",
		".m4v",
	],
	subFolder: "videos", // Assuming videos are stored in a "videos" folder
	getMimeType: getVideoMimeType,
};

export function setupVideoHandlers(): void {
	// Handle getting video file
	ipcMain.handle(
		"get-video",
		async (
			_event,
			baseLocation: string,
			filename: string,
		): Promise<string | null> => {
			return getFileAsDataUrl(baseLocation, filename, videoConfig);
		},
	);
}