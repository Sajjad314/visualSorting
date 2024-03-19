export function InsertionSort(arr: number[]): {
  currentValueIndex: number;
  comaperdValueIndex: number;
  firstSwap: number;
  secSwap: number;
  swap: boolean;
  status: string;
}[] {
  const animations: {
    currentValueIndex: number;
    comaperdValueIndex: number;
    firstSwap: number;
    secSwap: number;
    swap: boolean;
    status: string;
  }[] = [];

  const len = arr.length;
  let currentValIndex = 1;
  for (let i = 1; i < len; i++) {
    // let currentVal = arr[i];
    let j = i - 1;
    animations.push({
      currentValueIndex: i,
      comaperdValueIndex: j,
      firstSwap: 0,
      secSwap: 0,
      swap: false,
      status: "currentColor",
    });
    while (j >= 0) {
      animations.push({
        currentValueIndex: j + 1,
        comaperdValueIndex: j,
        firstSwap: 0,
        secSwap: 0,
        swap: false,

        status: "comparePrev",
      });
      currentValIndex = j + 1;
      animations.push({
        currentValueIndex: j + 1,
        comaperdValueIndex: j,
        firstSwap: 0,
        secSwap: 0,
        swap: false,

        status: "comparePrevEnd",
      });
      if (arr[j] > arr[j + 1]) {
        animations.push({
          currentValueIndex: j + 1,
          comaperdValueIndex: j,
          firstSwap: arr[j],
          secSwap: arr[j + 1],
          swap: true,

          status: "swap_begin",
        });

        animations.push({
          currentValueIndex: j,
          comaperdValueIndex: j + 1,
          firstSwap: arr[j],
          secSwap: arr[j + 1],
          swap: true,

          status: "swap_end",
        });
        currentValIndex = j;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        j--;
      } else {
        j--;
        break;
      }
    }
    animations.push({
      currentValueIndex: currentValIndex,
      comaperdValueIndex: j + 1,
      firstSwap: 0,
      secSwap: 0,
      swap: false,
      status: "currentColorEnd",
    });
    // arr[j + 1] = currentVal;
  }

  return animations;
}
