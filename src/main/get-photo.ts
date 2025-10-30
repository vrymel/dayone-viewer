import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { ipcMain } from "electron";

export function setupPhotoHandlers(): void {
	// Handle getting photo file
	ipcMain.handle(
		"get-photo",
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

				// Validate file extension (only allow common image formats)
				const ext = extname(filename).toLowerCase();
				const allowedExtensions = [
					".jpg",
					".jpeg",
					".png",
					".gif",
					".bmp",
					".webp",
					".svg",
				];
				if (!allowedExtensions.includes(ext)) {
					throw new Error("Unsupported image format");
				}

				// You'll need to adjust this path based on where your images are stored
				// For Day One, photos are typically in the journal's "photos" folder
				const imagePath = join(baseLocation, "photos", filename);
				// Read the image file
				const imageBuffer = await readFile(imagePath);

				// Convert to base64 data URL
				const mimeType = getMimeType(ext);
				const base64 = imageBuffer.toString("base64");
				const dataUrl = `data:${mimeType};base64,${base64}`;

				return dataUrl;
			} catch (error) {
				console.error("Error reading photo:", error);
				return null;
			}
		},
	);
}

function getMimeType(extension: string): string {
	const mimeTypes: Record<string, string> = {
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".png": "image/png",
		".gif": "image/gif",
		".bmp": "image/bmp",
		".webp": "image/webp",
		".svg": "image/svg+xml",
	};

	return mimeTypes[extension] || "image/jpeg";
}
