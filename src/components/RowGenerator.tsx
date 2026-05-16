
interface IRowGeneratorProps {
    wod: string;
    guess: string;
}


function RowGenerator({wod, guess}: IRowGeneratorProps) {
  return (
    <div>{guess}</div>
  )
}

RowGenerator.displayName = "RowGenerator";

export default RowGenerator