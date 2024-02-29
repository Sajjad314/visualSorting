import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";

const Navbar = ({
  buubleSortCall,
  mergeSortCall,
  selectionSortCall,
  insertionSortCall,
  length,
  handleChange,
  generateArray,
  isSorting,
  setIsSorting,
}: {
  buubleSortCall: Function;
  mergeSortCall: Function;
  selectionSortCall: Function;
  insertionSortCall: Function;
  length: number;
  handleChange: Function;
  generateArray: Function;
  isSorting: boolean;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectValue, setSelectValue] = useState<string>("");
  const handleFunctionCall = () => {
    setIsSorting(true);
    if (selectValue === "Bubble") {
      buubleSortCall();
    }
    if (selectValue === "Merge") {
      mergeSortCall();
    }
    if (selectValue === "Selection") {
      selectionSortCall();
    }
    if (selectValue === "Insertion") {
      insertionSortCall();
    }
  };
  return (
    <nav className="bg-gray-800 p-4 mb-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex-shrink-0">
            <a className="text-white font-bold text-xl">Sorting Visualizer</a>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col gap-1">
              <input
                type="range"
                min={3}
                max={32}
                value={length}
                defaultValue={length}
                disabled={isSorting}
                onChange={(e) => handleChange(e)}
              />
              <span className="text-white">length: {length}</span>
            </div>
          </div>
          <button
            disabled={isSorting}
            className=" bg-gray-800 border-[1px] border-white p-2 text-white"
            onClick={() => generateArray()}
          >
            Generate Array
          </button>
          <Select
            disabled={isSorting}
            onValueChange={(e) => {
              setSelectValue(e);
            }}
          >
            <SelectTrigger
              className="w-[180px] bg-transparent  text-white border-[1px] p-1 border-white"
              disabled={isSorting}
            >
              <SelectValue placeholder="Select an algorithm" />
            </SelectTrigger>
            <SelectContent className=" bg-gray-800 text-white ">
              <SelectGroup>
                <SelectItem value="Bubble">Bubble Sort</SelectItem>
                <SelectItem value="Merge">Merge Sort</SelectItem>
                <SelectItem value="Selection">Selection Sort</SelectItem>
                <SelectItem value="Insertion">Insertion Sort</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectValue.length > 0 && !isSorting && (
            <button
              className=" bg-gray-800 border-[1px] border-white p-2 text-white"
              onClick={handleFunctionCall}
            >
              Sort
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
