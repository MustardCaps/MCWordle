import { memo } from "react";
import { returnWordleRowArray } from "../lib/utils";
import Box from "@mui/material/Box";

interface IRowGeneratorProps {
    wod: string;
    guess: string;
}

const STATUS_COLORS = {
  correct: "#538d4e",
  present: "#b59f3b",
  absent: "#3a3a3c",
};

function RowGenerator({wod, guess}: IRowGeneratorProps) {

  const rowArray = returnWordleRowArray(wod, guess);

    return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {rowArray.map((item) => (
        <Box
          key={item.index}
          sx={{
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: STATUS_COLORS[item.status],
            color: STATUS_COLORS[item.status],
            fontWeight: "bold",
            fontSize: 20,
            textTransform: "uppercase",
            border: `2px solid ${STATUS_COLORS[item.status]}`,
          }}
        >
          {item.letter}
        </Box>
      ))}
    </Box>
  );
}

RowGenerator.displayName = "RowGenerator";

export default memo(RowGenerator)