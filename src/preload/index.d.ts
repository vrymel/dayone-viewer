import { ElectronAPI } from "@electron-toolkit/preload";

declare global {
	interface Window {
		electron: ElectronAPI;
		api: {
			getPhoto: (baseLocation: string, filename: string) => Promise<string | null>;
			getVideo: (baseLocation: string, filename: string) => Promise<string | null>;
		};
	}
}
