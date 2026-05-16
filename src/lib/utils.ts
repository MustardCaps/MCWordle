function returnRandomWord(words: readonly string[]) {
	return words[Math.floor(Math.random() * words.length)];
}

export { returnRandomWord };
