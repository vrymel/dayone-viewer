import { useContext, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/table";
import JournalContext from "../contexts/journal";
import type { JournalEntry } from "../types/journal";

export default function Main() {
	const _journalCtx = useContext(JournalContext);
	const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);

	const entries: JournalEntry[] =
		_journalCtx?.activeJournal?.data?.entries ?? [];

	const truncateText = (text: string | undefined, maxLength: number = 100) => {
		if (!text) return "No content";
		return text.length > maxLength
			? `${text.substring(0, maxLength)}...`
			: text;
	};

	const formatDate = (dateString: string) => {
		try {
			return new Date(dateString).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			});
		} catch {
			return dateString;
		}
	};

	return (
		<div className="flex h-screen">
			{/* First Column - Journal Entries Table */}
			<div className="w-1/2 border-r">
				<div className="p-4 border-b">
					<p className="text-sm text-muted-foreground">
						{entries.length} entries
					</p>
				</div>
				<div className="overflow-auto h-[calc(100vh-80px)]">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Date</TableHead>
								<TableHead>Text Preview</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{entries.map((entry) => (
								<TableRow
									key={entry.uuid}
									className={`cursor-pointer ${
										selectedEntry?.uuid === entry.uuid ? "bg-muted" : ""
									}`}
									onClick={() => setSelectedEntry(entry)}
								>
									<TableCell className="font-medium">
										{formatDate(entry.creationDate)}
									</TableCell>
									<TableCell>{truncateText(entry.text)}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>

			{/* Second Column - Selected Entry View */}
			<div className="w-1/2 bg-gray">
				{/* Reserved for selected item - currently black */}
			</div>
		</div>
	);
}
