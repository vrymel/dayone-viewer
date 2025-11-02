import { useMemo } from "react";
import PhotoEmbed from "@/components/PhotoEmbed";
import VideoEmbed from "@/components/VideoEmbed";
import type { JournalEntry, RichText } from "@/types/journal";

type JournalEntryViewProps = {
	entry: JournalEntry;
};

export default function JournalEntryView({ entry }: JournalEntryViewProps) {
	const data = useMemo(() => {
		const richTextContent: RichText = JSON.parse(entry.richText);

		return richTextContent;
	}, [entry]);

	const photosMap = useMemo(() => {
		const mp = {};

		entry?.photos?.forEach((p) => {
			mp[p.identifier] = p;
		});

		return mp;
	}, [entry]);

	const videosMap = useMemo(() => {
		const mp = {};

		entry?.videos?.forEach((p) => {
			mp[p.identifier] = p;
		});

		return mp;
	}, [entry]);

	return (
		<div>
			{data.contents.map((content) => {
				if (content.text) {
					return <p key={content.text}>{content.text}</p>;
				}

				if (content.embeddedObjects) {
					return content.embeddedObjects.map((ob) => {
						if (ob.type === "photo") {
							const photo = photosMap[ob.identifier];

							return <PhotoEmbed key={ob.identifier} photo={photo} />;
						}

						if (ob.type === "video") {
							const video = videosMap[ob.identifier];

							return <VideoEmbed key={ob.identifier} video={video} />;
						}

						return null;
					});
				}

				return null;
			})}
		</div>
	);
}
