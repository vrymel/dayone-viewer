import { ipcMain } from "electron";
import { getFileAsDataUrl, getImageMimeType, type FileHandlerConfig } from "./file-handlers";

const photoConfig: FileHandlerConfig = {
	allowedExtensions: [
		".jpg",
		".jpeg",
		".png",
		".gif",
		".bmp",
		".webp",
		".svg",
	],
	subFolder: "photos",
	getMimeType: getImageMimeType,
};

export function setupPhotoHandlers(): void {
	// Handle getting photo file
	ipcMain.handle(
		"get-photo",
		async (
			_event,
			baseLocation: string,
			filename: string,
		): Promise<string | null> => {
			return getFileAsDataUrl(baseLocation, filename, photoConfig);
		},
	);
}
