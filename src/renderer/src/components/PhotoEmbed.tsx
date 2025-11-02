import { useCallback, useContext, useEffect, useState } from "react";
import JournalContext from "@/contexts/journal";
import type { Photo } from "@/types/journal";

type PhotoDisplayProps = {
	photo: Photo;
};

export default function PhotoEmbed({ photo }: PhotoDisplayProps) {
	const [photoUrl, setPhotoUrl] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { activeJournal } = useContext(JournalContext);

	const loadPhoto = useCallback(
		async (imageLocation: string, imageFilename: string): Promise<void> => {
			if (!imageFilename.trim()) {
				setError("No filename provided");
				setPhotoUrl(null);
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const result = await window.api.getPhoto(
					imageLocation,
					imageFilename.trim(),
				);

				if (result) {
					setPhotoUrl(result);
				} else {
					setError(
						"Failed to load photo. Check if the file exists and is a valid image.",
					);
					setPhotoUrl(null);
				}
			} catch (err) {
				setError(
					`Error loading photo: ${err instanceof Error ? err.message : "Unknown error"}`,
				);
				setPhotoUrl(null);
			} finally {
				setLoading(false);
			}
		},
		[],
	);

	useEffect(() => {
		const filename = `${photo.md5}.${photo.type}`;

		loadPhoto(activeJournal.path, filename);
	}, [activeJournal, photo, loadPhoto]);

	return (
		<div className="">
			{loading && (
				<div className="p-3 text-blue-600 bg-blue-50 border border-blue-200 rounded">
					Loading photo...
				</div>
			)}

			{error && (
				<div className="p-3 text-red-600 bg-red-50 border border-red-200 rounded">
					{error}
				</div>
			)}

			{photoUrl && !loading && (
				<div className="">
					<img
						src={photoUrl}
						alt={photo.md5}
						className="max-w-full h-auto"
						onError={() => setError("Failed to display image")}
					/>
				</div>
			)}
		</div>
	);
}
