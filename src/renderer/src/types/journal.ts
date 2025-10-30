export type JournalEntry = {
	uuid: string;
	text: string;
	creationDate: string;
	modifiedDate?: string;
	timeZone?: string;
	starred?: boolean;
	tags?: string[];
	weather?: Record<string, unknown>;
	location?: {
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
	photos?: Array<{
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
	// Additional fields from App.tsx
	duration?: number;
	richText?: string;
	creationOSName?: string;
	creationDeviceModel?: string;
	creationDevice?: string;
	editingTime?: number;
	creationDeviceType?: string;
	creationOSVersion?: string;
	isPinned?: boolean;
	isAllDay?: boolean;
};

export type RichTextContentEmbeddedObjects = {
	identifier: string;
	type: string;
};

export type RichTextContent = {
	// attributes?: {};
	text?: string;
	embeddedObjects?: RichTextContentEmbeddedObjects[];
};

export type RichText = {
	contents: RichTextContent[];
	meta: {
		created: {
			platform: string;
			version: number;
		};
		"small-lines-removed": bool;
		version: number;
	};
};

export type JournalFile = {
	metadata: { version: string };
	entries: JournalEntry[];
};

export type Journal = {
	name: string;
	data: JournalFile;
};

export type JournalContextType = {
	activeJournal?: Journal | null;
	setActiveJournal?: (journal: Journal | null) => void;
};
