import { VideoDisplay } from "./VideoDisplay";
import type { Video } from "@renderer/types/journal";

// Example usage of VideoDisplay component
export function VideoDisplayExample() {
	// Example video data - replace with actual video data from journal entry
	const exampleVideo: Video = {
		fileSize: 1048576, // 1MB
		orderInEntry: 1,
		creationDevice: "iPhone",
		duration: 30, // 30 seconds
		favorite: false,
		type: "mp4",
		filename: "video.mp4",
		identifier: "video-123",
		date: "2024-01-01T12:00:00Z",
		height: 720,
		width: 1280,
		md5: "abcdef123456", // This would be the actual MD5 hash
	};

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-4">Video Display Example</h2>
			<VideoDisplay video={exampleVideo} />
		</div>
	);
}

// Example of how you might use it in a journal entry component
export function JournalEntryWithVideos({ entry }: { entry: any }) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold">Journal Entry</h3>
			<p>{entry.text}</p>
			
			{/* Display photos */}
			{entry.photos?.map((photo: any, index: number) => (
				<div key={photo.identifier || index}>
					{/* Use PhotoDisplay component here */}
				</div>
			))}
			
			{/* Display videos */}
			{entry.videos?.map((video: Video, index: number) => (
				<div key={video.identifier || index}>
					<VideoDisplay video={video} />
				</div>
			))}
		</div>
	);
}