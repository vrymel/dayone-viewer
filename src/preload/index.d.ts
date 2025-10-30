import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			getPhoto: (filename: string) => Promise<string | null>;
		};
	}
}
