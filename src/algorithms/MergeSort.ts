// const animations: { first: number; second: number }[] = [];

// export function mergeSort(
//   arr: number[],
//   start: number = 0,
//   end: number = arr.length - 1
// ): { first: number; second: number }[] {
//   if (start < end) {
//     const mid = Math.floor((start + end) / 2);
//     mergeSort(arr, start, mid);
//     mergeSort(arr, mid + 1, end);
//     merge(arr, start, mid, end, animations);
//   }
//   return animations;
// }

// function merge(
//   arr: number[],
//   start: number,
//   mid: number,
//   end: number,
//   animations: { first: number; second: number }[]
// ): void {
//   const leftLength = mid - start + 1;
//   const rightLength = end - mid;

//   const leftArray = arr.slice(start, mid + 1);
//   const rightArray = arr.slice(mid + 1, end + 1);

//   let i = 0;
//   let j = 0;
//   let k = start;

//   while (i < leftLength && j < rightLength) {
//     animations.push({ first: i + start, second: j + mid + 1 });
//     animations.push({ first: i + start, second: j + mid + 1 });
//     if (leftArray[i] <= rightArray[j]) {
//       arr[k] = leftArray[i];
//       animations.push({ first: k, second: arr[k] });
//       i++;
//     } else {
//       arr[k] = rightArray[j];
//       animations.push({ first: k, second: arr[k] });

//       j++;
//     }
//     k++;
//   }

//   while (i < leftLength) {
//     arr[k] = leftArray[i];
//     animations.push({ first: i, second: i });
//     animations.push({ first: i, second: i });
//     animations.push({ first: k, second: arr[k] });

//     i++;
//     k++;
//   }

//   while (j < rightLength) {
//     arr[k] = rightArray[j];
//     animations.push({ first: j, second: j });
//     animations.push({ first: j, second: j });
//     animations.push({ first: k, second: arr[k] });

//     j++;
//     k++;
//   }
// }
export function getMergeSortAnimations(array: number[]) {
  const animations: { first: number; second: number }[] = [];
  if (array.length > 1) {
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  }
  return animations;
}

function mergeSortHelper(
  mainArray: number[],
  startIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: { first: number; second: number }[]
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray: number[],
  startIdx: number,
  middleIdx: number,
  endIdx: number,
  auxiliaryArray: number[],
  animations: { first: number; second: number }[]
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push({ first: i, second: j });
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push({ first: i, second: j });
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push({ first: k, second: auxiliaryArray[i] });
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push({ first: k, second: auxiliaryArray[j] });
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push({ first: i, second: i });
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push({ first: i, second: i });
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push({ first: k, second: auxiliaryArray[i] });
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push({ first: j, second: j });
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push({ first: j, second: j });
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push({ first: k, second: auxiliaryArray[j] });
    mainArray[k++] = auxiliaryArray[j++];
  }
}
