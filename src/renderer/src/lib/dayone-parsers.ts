export function textContent(richText) {
	// Remove newline characters
	const newLine = richText.replace(/\\n/g, "");

	// Unescape slashes
	const slash = newLine.replace(/\\(.)/g, "$1");

	// Parse JSON
	const data = JSON.parse(slash);

	// Extract text from contents, filter out empty values, and join with newlines
	return data.contents
		.map((item) => item.text)
		.filter((text) => text)
		.join("\n");
}

// Get the first line of the text content
export function textContentTitle(richText) {
	const tc = textContent(richText);

	const parts = tc.split("\n");

	return parts[0];
}
