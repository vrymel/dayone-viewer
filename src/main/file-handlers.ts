import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

export interface FileHandlerConfig {
	allowedExtensions: string[];
	subFolder: string;
	getMimeType: (extension: string) => string;
}

export async function getFileAsDataUrl(
	baseLocation: string,
	filename: string,
	config: FileHandlerConfig,
): Promise<string | null> {
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
		if (!config.allowedExtensions.includes(ext)) {
			throw new Error(`Unsupported file format: ${ext}`);
		}

		// Construct file path
		const filePath = join(baseLocation, config.subFolder, filename);
		
		// Read the file
		const fileBuffer = await readFile(filePath);

		// Convert to base64 data URL
		const mimeType = config.getMimeType(ext);
		const base64 = fileBuffer.toString("base64");
		const dataUrl = `data:${mimeType};base64,${base64}`;

		return dataUrl;
	} catch (error) {
		console.error(`Error reading file ${filename}:`, error);
		return null;
	}
}

export function getImageMimeType(extension: string): string {
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

export function getVideoMimeType(extension: string): string {
	const mimeTypes: Record<string, string> = {
		".mp4": "video/mp4",
		".mov": "video/quicktime",
		".avi": "video/x-msvideo",
		".wmv": "video/x-ms-wmv",
		".flv": "video/x-flv",
		".webm": "video/webm",
		".mkv": "video/x-matroska",
		".m4v": "video/x-m4v",
	};

	return mimeTypes[extension] || "video/mp4";
}