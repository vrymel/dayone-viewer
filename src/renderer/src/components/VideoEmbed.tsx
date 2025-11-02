import { useCallback, useContext, useEffect, useState } from "react";
import JournalContext from "@/contexts/journal";
import type { Video } from "@/types/journal";

type VideoDisplayProps = {
	video: Video;
};

export default function VideoEmbed({ video }: VideoDisplayProps) {
	const [videoUrl, setVideoUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const context = useContext(JournalContext);
	const activeJournal = context?.activeJournal;

	const loadVideo = useCallback(
		async (videoLocation: string, videoFilename: string): Promise<void> => {
			if (!videoFilename.trim()) {
				setError("No filename provided");
				setVideoUrl(null);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const result = await window.api.getVideo(
					videoLocation,
					videoFilename.trim(),
				);

				if (result) {
					setVideoUrl(result);
				} else {
					setError(
						"Failed to load video. Check if the file exists and is a valid video.",
					);
					setVideoUrl(null);
				}
			} catch (err) {
				setError(
					`Error loading video: ${err instanceof Error ? err.message : "Unknown error"}`,
				);
				setVideoUrl(null);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	// Load video when filename prop changes
	useEffect(() => {
		if (!activeJournal) {
			setError("No active journal");
			return;
		}

		const filename = `${video.md5}.${video.type}`;
		loadVideo(activeJournal.path, filename);
	}, [activeJournal, video, loadVideo]);

	return (
		<div className="space-y-4">
			{loading && (
				<div className="p-3 text-blue-600 bg-blue-50 border border-blue-200 rounded">
					Loading video...
				</div>
			)}

			{error && (
				<div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded">
					{error}
				</div>
			)}

			{videoUrl && !loading && (
				<div className="border rounded-lg overflow-hidden">
					<video
						src={videoUrl}
						controls
						className="max-w-full h-auto"
						width={video.width}
						height={video.height}
					>
						<track kind="captions" />
						Your browser does not support the video tag.
					</video>
					{video.duration > 0 && (
						<div className="p-2 bg-gray-50 text-sm text-gray-600">
							Duration: {Math.round(video.duration)}s
						</div>
					)}
				</div>
			)}
		</div>
	);
}
