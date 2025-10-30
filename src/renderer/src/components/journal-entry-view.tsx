import { useMemo } from "react";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import type { JournalEntry } from "@/types/journal";

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

	return (
		<div>
			{data.contents.map((content) => {
				if (content.text) {
					return <p key={content.text}>{content.text}</p>;
				}

				if (content.embeddedObjects) {
					return content.embeddedObjects.map((ob) => {
						// ob.type = video, photo
						const photo = photosMap[ob.identifier];

						return <PhotoDisplay key={ob.identifier} photo={photo} />;
					});
				}

				return null;
			})}
		</div>
	);
}
