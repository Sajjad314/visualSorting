import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../@/components/ui/select";
import { Speed } from "./const/SortingSpeed";

const Navbar = ({
  buubleSortCall,
  mergeSortCall,
  selectionSortCall,
  insertionSortCall,
  length,
  handleSpeedChange,
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
  handleSpeedChange: Function;
  generateArray: Function;
  isSorting: boolean;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [selectValue, setSelectValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [speed, setSpeed] = useState(100);

  const { MAX_SPEED, MIN_SPEED } = Speed;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

  useEffect(() => {
    if (isSorting) {
      setIsMenuOpen(false);
    }
  }, [isSorting]);
  return (
    <nav className="bg-gray-800 p-4 mb-4 w-full">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex-shrink-0">
            <a className="text-white font-bold text-xl">Sorting Visualizer</a>
          </div>
          <div className="hidden md:block ">
            <div className="flex gap-3">
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-white">length: </span>
                  <input
                    type="range"
                    min={3}
                    max={32}
                    value={length}
                    disabled={isSorting}
                    onChange={(e) => handleChange(e)}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-white">Speed: </span>
                  <input
                    type="range"
                    min={MAX_SPEED}
                    max={MIN_SPEED}
                    value={speed}
                    disabled={isSorting}
                    onChange={(e) => {
                      handleSpeedChange(e);
                      setSpeed(parseInt(e.target.value));
                    }}
                  />
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
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-200 hover:text-white focus:outline-none focus:text-white"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6h16V5H4v1zm0 6h16v-1H4v1zm0 6h16v-1H4v1z"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="flex flex-row gap-2 mt-2">
              <div className="flex items-center gap-1">
                <span className="text-white">length: </span>

                <input
                  type="range"
                  min={3}
                  max={32}
                  value={length}
                  disabled={isSorting}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex items-center gap-1">
                <span className="text-white">Speed: </span>
                <input
                  type="range"
                  min={MAX_SPEED}
                  max={MIN_SPEED}
                  value={speed}
                  disabled={isSorting}
                  onChange={(e) => {
                    handleSpeedChange(e);
                    setSpeed(parseInt(e.target.value));
                  }}
                />
              </div>
            </div>
            <button
              disabled={isSorting}
              className=" bg-gray-800 border-[1px] border-white p-2 mt-2 text-white"
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
                className="w-[180px] mt-2 bg-transparent  text-white border-[1px] p-1 border-white"
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
                className=" bg-gray-800 border-[1px] border-white mt-2 p-2 text-white"
                onClick={handleFunctionCall}
              >
                Sort
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
