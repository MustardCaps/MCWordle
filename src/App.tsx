import { useRef, useState } from "react";
import "./App.css";
import { wordsList } from "./lib/constants";
import { returnRandomWord } from "./lib/utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RowGenerator from "./components/RowGenerator";

function App() {
	const [word, setWord] = useState(returnRandomWord(wordsList));
	const [wordGuessesArray, setWordGuessesArray] = useState<{ id: number; guess: string }[]>([]);
	const [inputValue, setInputValue] = useState("");
	const [hasWon, setHasWon] = useState(false);
	const idCounter = useRef(0);

	const gameOver = hasWon || wordGuessesArray.length >= 6;

	const handleSearch = () => {
	    if (gameOver) return;

		if (inputValue.length === 5) {
			const newGuesses = [...wordGuessesArray, { id: idCounter.current++, guess: inputValue }];
			setWordGuessesArray(newGuesses);
			setInputValue("");

			if (inputValue === word) {
				setHasWon(true);
			}
		}
	};

	const handleReset = () => {
		setWord(returnRandomWord(wordsList));
		setWordGuessesArray([]);
		setInputValue("");
		setHasWon(false);
		idCounter.current = 0;
	};


		
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				pt: 8,
				px: 2,
				width: '400px',
				mx: 'auto'
			}}
		>
			<TextField
				fullWidth
				label="Search"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value.toUpperCase())}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton aria-label="Search" onClick={handleSearch}>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						),
					},
					htmlInput: {
						maxLength: 5,
					},
				}}
			/>
			{wordGuessesArray.map((item) => (
				<Box key={item.id} sx={{ pt: 2 }}>
					<RowGenerator wod={word} guess={item.guess} />
				</Box>
			))}
			{gameOver && (
				<>
					<Typography variant="body1" sx={{ pt: 2 }}>
						{hasWon ? "Congratulations! You've guessed the word!" : `Game Over! The word was: ${word}`}
					</Typography>
					<Box sx={{ pt: 2 }}>
						<Button variant="contained" onClick={handleReset}>
							Play Again
						</Button>
					</Box>
				</>
			)}
		</Box>
	);
}

export default App;
