import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

vi.mock("./lib/utils", async (importOriginal) => {
	const actual = await importOriginal<typeof import("./lib/utils")>();
	return {
		...actual,
		returnRandomWord: vi.fn(() => "STARE"),
	};
});

async function submitGuess(guess: string) {
	const input = screen.getByRole("textbox");
	await userEvent.type(input, guess);
	await userEvent.click(screen.getByRole("button", { name: /search/i }));
}

describe("App", () => {
	beforeEach(() => {
		render(<App />);
	});

	it("renders the guess input", () => {
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("displays a row after a valid 5-letter guess is submitted", async () => {
		await submitGuess("CLIMB");
		expect(screen.getByText("C")).toBeInTheDocument();
	});

	it("clears the input after submitting a guess", async () => {
		await submitGuess("CLIMB");
		expect(screen.getByRole("textbox")).toHaveValue("");
	});

	it("does not add a row for a guess shorter than 5 letters", async () => {
		await submitGuess("CAT");
		expect(screen.queryByText("C")).not.toBeInTheDocument();
	});

	it("shows the win message when the correct word is guessed", async () => {
		await submitGuess("STARE");
		expect(screen.getByText(/congratulations/i)).toBeInTheDocument();
	});

	it("shows the game over message after 6 wrong guesses", async () => {
		for (let i = 0; i < 6; i++) await submitGuess("CLIMB");
		expect(screen.getByText(/game over/i)).toBeInTheDocument();
	});

	it("reveals the word in the game over message", async () => {
		for (let i = 0; i < 6; i++) await submitGuess("CLIMB");
		expect(screen.getByText(/STARE/)).toBeInTheDocument();
	});

	it("blocks further guesses after the game is won", async () => {
		await submitGuess("STARE");
		await submitGuess("CLIMB");
		expect(screen.queryAllByText("C")).toHaveLength(0);
	});

	it("resets the game when Play Again is clicked", async () => {
		await submitGuess("STARE");
		await userEvent.click(screen.getByRole("button", { name: /play again/i }));
		expect(screen.queryByText(/congratulations/i)).not.toBeInTheDocument();
	});
});
