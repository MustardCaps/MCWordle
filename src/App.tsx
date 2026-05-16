import { useRef, useState } from "react";
import "./App.css";
import { wordsList } from "./lib/constants";
import { returnRandomWord } from "./lib/utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RowGenerator from "./components/RowGenerator";

function App() {
	// here's what we building: wordle

	const [word] = useState(returnRandomWord(wordsList));
	const [wordGuessesArray, setWordGuessesArray] = useState<{ id: number; guess: string }[]>([]);
	const [inputValue, setInputValue] = useState("");
	const idCounter = useRef(0);

	const handleSearch = () => {
		if (inputValue.length === 5 && wordGuessesArray.length < 6) {
			setWordGuessesArray([...wordGuessesArray, { id: idCounter.current++, guess: inputValue }]);
		}
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
				onChange={(e) => setInputValue(e.target.value)}
				slotProps={{
					input: {
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={handleSearch}>
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
		</Box>
	);
}

export default App;
