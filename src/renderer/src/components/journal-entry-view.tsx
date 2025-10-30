import { useMemo } from "react";
import { PhotoDisplay } from "@/components/PhotoDisplay";
import type { JournalEntry } from "@/types/journal";

type JournalEntryViewProps = {
	entry: JournalEntry;
};

export default function JournalEntryView({ entry }: JournalEntryViewProps) {
	const data = useMemo(() => {
		const richTextContent: RichText = JSON.parse(entry.richText);

		console.log(richTextContent);
		console.log(entry.photos);

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
						const photo = photosMap[ob.identifier];

						return (
							<PhotoDisplay
								key={ob.identifier}
								filename={`${photo.md5}.jpeg`}
							/>
						);
					});
				}

				return null;
			})}
		</div>
	);
}
