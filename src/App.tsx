import { useEffect, useState } from "react";
import { getMergeSortAnimations } from "./MergeSort";
import { bubbleSort } from "./BubbleSort";
import { objectsAreEqual } from "./utils/isEqual";
import Navbar from "./Navbar";
import { SelectionSort } from "./SelectionSort";
import { InsertionSort } from "./InsertionSort";

function App() {
  const [bar, setBar] = useState<number[]>([]);
  const [length, setLength] = useState<number>(8);
  const [isSorting, setIsSorting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(event.target.value));
  };

  const generateArray = () => {
    const randomArray: number[] = [];

    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * 50) + 1;
      randomArray.push(randomNumber);
    }

    setBar(randomArray);
  };

  const mergeSortCall = () => {
    let t = bar;
    const animations: { first: number; second: number }[] =
      getMergeSortAnimations(t);

    const barG = document.getElementsByClassName("bar");
    for (let i = 0; i < animations.length; i++) {
      const first = animations[i].first;
      const second = animations[i].second;
      if (i % 3 !== 2) {
        const barOneStyle = barG[first] as HTMLElement;
        const barTwoStyle = barG[second] as HTMLElement;
        let color = i % 3 === 0 ? "red" : "turquoise";

        setTimeout(() => {
          barOneStyle.style.backgroundColor = color;
          barTwoStyle.style.backgroundColor = color;
        }, i * 100);
      } else {
        const barStyle = barG[first] as HTMLElement;
        const newHeight = second;
        setTimeout(() => {
          barStyle.style.height = `${newHeight * 10}px`;
          barStyle.style.marginTop = `${(Math.max(...bar) - newHeight) * 10}px`;
          barStyle.innerHTML = newHeight.toString();
        }, i * 100);
      }
      if (i === animations.length - 1) setIsSorting(false);
    }
  };

  const bubbleSortCall = () => {
    let t = bar;
    const animation = bubbleSort(t);
    const barG = document.getElementsByClassName("bar");
    for (let i = 0; i < animation.length; i++) {
      const swap = animation[i].swap;
      if (!swap) {
        const first = barG[animation[i].first] as HTMLElement;
        const sec = barG[animation[i].second] as HTMLElement;
        let color = "green";
        i !== 0 && objectsAreEqual(animation[i], animation[i - 1])
          ? (color = "turquoise")
          : (color = "green");
        setTimeout(() => {
          first.style.backgroundColor = color;
          sec.style.backgroundColor = color;
        }, i * 100);
      } else {
        const first = barG[animation[i - 1].first] as HTMLElement;
        const sec = barG[animation[i - 1].second] as HTMLElement;
        setTimeout(() => {
          first.style.backgroundColor = "red";
          sec.style.backgroundColor = "red";
          first.style.height = `${animation[i].second * 10}px`;
          sec.style.height = `${animation[i].first * 10}px`;
          first.style.marginTop = `${
            (Math.max(...bar) - animation[i].second) * 10
          }px`;
          sec.style.marginTop = `${
            (Math.max(...bar) - animation[i].first) * 10
          }px`;
          first.innerHTML = animation[i].second.toString();
          sec.innerHTML = animation[i].first.toString();
        }, i * 100);
      }
      if (i === animation.length - 1) setIsSorting(false);
    }
  };

  const selectionSortCall = () => {
    let t = bar;
    const animation: {
      fix: number;
      compare: number;
      first: number;
      sec: number;
      swap: boolean;
    }[] = SelectionSort(t);
    const barG = document.getElementsByClassName("bar");

    for (let i = 0; i < animation.length; i++) {
      const {
        fix,
        compare,
        swap,
        first: firstSwap,
        sec: secSwap,
      } = animation[i];

      if (!swap) {
        const fixColor = "#CB7337";
        if (fix === compare) {
          const prevFixElement = barG[animation[i - 1].fix] as HTMLElement;
          const fixElement = barG[fix] as HTMLElement;
          setTimeout(() => {
            prevFixElement.style.backgroundColor = "turquoise";
            fixElement.style.backgroundColor = fixColor;
          }, i * 100);
        } else {
          const fixElement = barG[fix] as HTMLElement;
          const compareElement = barG[compare] as HTMLElement;
          let compareColor = "green";
          i !== 0 && objectsAreEqual(animation[i], animation[i - 1])
            ? (compareColor = "turquoise")
            : (compareColor = "green");
          setTimeout(() => {
            // console.log(animation[i - 1].fix, " ", fix);

            if (
              animation[i - 1] &&
              animation[i - 1].fix &&
              animation[i - 1].fix !== fix
            ) {
              const prevFixElement = barG[animation[i - 1].fix] as HTMLElement;
              prevFixElement.style.backgroundColor = "turquoise";
            }
            fixElement.style.backgroundColor = fixColor;
            compareElement.style.backgroundColor = compareColor;
          }, i * 100);
        }
      } else {
        const first = barG[fix] as HTMLElement;
        const sec = barG[compare] as HTMLElement;
        if (objectsAreEqual(animation[i], animation[i - 1])) {
          setTimeout(() => {
            first.style.backgroundColor = "turquoise";
            sec.style.backgroundColor = "turquoise";
          }, i * 100);
        } else {
          setTimeout(() => {
            first.style.backgroundColor = "red";
            sec.style.backgroundColor = "red";
            first.style.height = `${firstSwap * 10}px`;
            sec.style.height = `${secSwap * 10}px`;
            first.style.marginTop = `${(Math.max(...bar) - firstSwap) * 10}px`;
            sec.style.marginTop = `${(Math.max(...bar) - secSwap) * 10}px`;
            first.innerHTML = firstSwap.toString();
            sec.innerHTML = secSwap.toString();
          }, i * 100);
        }
      }
      if (i === animation.length - 1) setIsSorting(false);
    }
  };

  const insertionSortCall = () => {
    let t = bar;
    console.log(t);
    setIsSorting(!isSorting);
    console.log();

    const animation = InsertionSort(t);
    console.log(animation, isSorting);
    const barG = document.getElementsByClassName("bar");

    for (let i = 0; i < animation.length; i++) {
      const {
        comaperdValueIndex,
        currentValueIndex,
        firstSwap,
        secSwap,
        status,
        swap,
      } = animation[i];
      const currentBar = barG[currentValueIndex] as HTMLElement;
      const compareBar = barG[comaperdValueIndex] as HTMLElement;
      if (!swap) {
        let currentCol = "#CB7337";
        if (status === "comparePrev" || status === "comparePrevEnd") {
          let compareColor = status === "comparePrev" ? "green" : "turquoise";
          setTimeout(() => {
            currentBar.style.backgroundColor = currentCol;
            compareBar.style.backgroundColor = compareColor;
          }, i * 100);
        } else {
          if (status !== "currentColor") currentCol = "turquoise";
          setTimeout(() => {
            currentBar.style.backgroundColor = currentCol;
          }, i * 100);
        }
      } else {
        if (status === "swap_begin") {
          const color = "red";
          setTimeout(() => {
            currentBar.style.backgroundColor = color;
            compareBar.style.backgroundColor = color;
            currentBar.style.height = `${firstSwap * 10}px`;
            compareBar.style.height = `${secSwap * 10}px`;
            currentBar.style.marginTop = `${
              (Math.max(...bar) - firstSwap) * 10
            }px`;
            compareBar.style.marginTop = `${
              (Math.max(...bar) - secSwap) * 10
            }px`;
            currentBar.innerHTML = firstSwap.toString();
            compareBar.innerHTML = secSwap.toString();
          }, i * 100);
        } else {
          setTimeout(() => {
            currentBar.style.backgroundColor = "#CB7337";
            compareBar.style.backgroundColor = "turquoise";
          }, i * 100);
        }
      }
      if (i === animation.length - 1) setIsSorting(false);
    }
  };

  useEffect(() => {
    generateArray();
  }, [length]);
  useEffect(() => {
    console.log(isSorting);
  }, [isSorting]);
  return (
    <div className="bg-white w-full h-screen">
      <Navbar
        buubleSortCall={bubbleSortCall}
        mergeSortCall={mergeSortCall}
        selectionSortCall={selectionSortCall}
        insertionSortCall={insertionSortCall}
        generateArray={generateArray}
        handleChange={handleChange}
        length={length}
        isSorting={isSorting}
        setIsSorting={setIsSorting}
      />
      <div className=" mt-[100] mx-12 ">
        <div className="flex flex-row w-full justify-center">
          {bar.map((b, i) => {
            return (
              <div
                key={i}
                className={`bar sm:min-w-2  lg:min-w-8 md:min-w-4`}
                style={{
                  height: `${b * 10}px`,
                  margin: "0 1px",
                  fontSize: "9px",
                  marginTop: `${(Math.max(...bar) - b) * 10}px`,
                  backgroundColor: "turquoise",
                }}
              >
                {b}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
