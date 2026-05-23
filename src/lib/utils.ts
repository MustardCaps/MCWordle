import type { TRowItemArray, TFrequencyMap } from "../types/rowItems";

function returnRandomWord(words: readonly string[]) {
	return words[Math.floor(Math.random() * words.length)];
}

function returnWordleRowArray(word: string, guess: string): TRowItemArray {

	const rowArray: TRowItemArray = new Array(guess.length);
	const freqMap: TFrequencyMap = {};

	for (const letter of word) {
		freqMap[letter] = (freqMap[letter] || 0) + 1;
	}

	// Pass 1: claim correct positions first so their freqMap budget isn't consumed by present
	for (let i = 0; i < guess.length; i++) {
		if (guess[i] === word[i]) {
			rowArray[i] = { letter: guess[i], index: i, status: "correct" };
			freqMap[guess[i]] -= 1;
		}
	}

	// Pass 2: mark present/absent for the remaining positions
	for (let i = 0; i < guess.length; i++) {
		if (rowArray[i]) continue;
		if (freqMap[guess[i]] > 0) {
			rowArray[i] = { letter: guess[i], index: i, status: "present" };
			freqMap[guess[i]] -= 1;
		} else {
			rowArray[i] = { letter: guess[i], index: i, status: "absent" };
		}
	}

	return rowArray;
}

export { returnRandomWord, returnWordleRowArray };

