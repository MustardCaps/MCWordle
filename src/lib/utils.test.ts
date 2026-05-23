import { describe, it, expect } from "vitest";
import { returnRandomWord, returnWordleRowArray } from "./utils";

describe("returnRandomWord", () => {
	it("returns a word from the list", () => {
		const words = ["REACT", "AUDIO", "STARE"] as const;
		const result = returnRandomWord(words);
		expect(words).toContain(result);
	});

	it("returns undefined for an empty list", () => {
		const result = returnRandomWord([] as const);
		expect(result).toBeUndefined();
	});

	it("always returns the only word in a single-item list", () => {
		const words = ["REACT"] as const;
		expect(returnRandomWord(words)).toBe("REACT");
	});
});

describe("returnWordleRowArray", () => {
	it("marks all letters correct when guess equals word", () => {
		const result = returnWordleRowArray("STARE", "STARE");
		expect(result).toEqual([
			{ letter: "S", index: 0, status: "correct" },
			{ letter: "T", index: 1, status: "correct" },
			{ letter: "A", index: 2, status: "correct" },
			{ letter: "R", index: 3, status: "correct" },
			{ letter: "E", index: 4, status: "correct" },
		]);
	});

	it("marks all letters absent when no letters match", () => {
		const result = returnWordleRowArray("STARE", "CLIMB");
		for (const item of result) expect(item.status).toBe("absent");
	});

	it("marks a letter present when it exists in the word but wrong position", () => {
		const result = returnWordleRowArray("STARE", "AROSE");
		expect(result[0]).toEqual({ letter: "A", index: 0, status: "present" });
	});

	it("marks a letter correct when it is in the right position", () => {
		const result = returnWordleRowArray("STARE", "SNARE");
		expect(result[0]).toEqual({ letter: "S", index: 0, status: "correct" });
	});

	it("does not mark duplicate guessed letters present beyond the word's count", () => {
		// CRANE has one E — guessing SEEDS should only give one E credit
		const result = returnWordleRowArray("CRANE", "SEEDS");
		const eResults = result.filter((item) => item.letter === "E");
		const credited = eResults.filter((item) => item.status !== "absent");
		expect(credited).toHaveLength(1);
	});

	it("does not mark a letter present if the only matching instance is at a correct position", () => {
		// CRANE has one E at index 4 — EMCEE: the E at index 0 should be absent, not present
		// because the only E budget is consumed by the correct E at index 4
		const result = returnWordleRowArray("CRANE", "EMCEE");
		expect(result[0]).toEqual({ letter: "E", index: 0, status: "absent" });
		expect(result[4]).toEqual({ letter: "E", index: 4, status: "correct" });
	});

	it("returns an item per letter with correct index values", () => {
		const result = returnWordleRowArray("STARE", "STARE");
		for (let i = 0; i < result.length; i++) expect(result[i].index).toBe(i);
	});

	it("returns an array of the same length as the guess", () => {
		const result = returnWordleRowArray("STARE", "CLIMB");
		expect(result).toHaveLength(5);
	});
});
