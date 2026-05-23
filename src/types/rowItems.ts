type TRowItem = {
    letter: string;
    index: number;
    status: "correct" | "present" | "absent";
    }

type TRowItemArray = TRowItem[];

type TFrequencyMap = {
  [key: string]: number;
}

export type { TFrequencyMap, TRowItem, TRowItemArray };