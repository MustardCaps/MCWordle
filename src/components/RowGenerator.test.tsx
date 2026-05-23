import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RowGenerator from "./RowGenerator";

describe("RowGenerator", () => {
	it("renders one tile per letter in the guess", () => {
		render(<RowGenerator wod="STARE" guess="CLIMB" />);
		const tiles = screen.getAllByText(/[A-Z]/);
		expect(tiles).toHaveLength(5);
	});

	it("displays each letter of the guess", () => {
		render(<RowGenerator wod="STARE" guess="CLIMB" />);
		for (const letter of "CLIMB") {
			expect(screen.getByText(letter)).toBeInTheDocument();
		}
	});

	it("applies the correct background color for a correct letter", () => {
		render(<RowGenerator wod="STARE" guess="STARE" />);
		const tile = screen.getByText("S");
		expect(tile).toHaveStyle({ backgroundColor: "#538d4e" });
	});

	it("applies the present background color for a present letter", () => {
		// A is in STARE but AROSE has A at index 0 (wrong position)
		render(<RowGenerator wod="STARE" guess="AROSE" />);
		const tile = screen.getByText("A");
		expect(tile).toHaveStyle({ backgroundColor: "#b59f3b" });
	});

	it("applies the absent background color for an absent letter", () => {
		render(<RowGenerator wod="STARE" guess="CLIMB" />);
		const tile = screen.getByText("C");
		expect(tile).toHaveStyle({ backgroundColor: "#3a3a3c" });
	});
});
