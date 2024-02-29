export function bubbleSort(
  arr: number[]
): { first: number; second: number; swap: boolean }[] {
  const n = arr.length;
  let swapped: boolean = true;
  const animations: { first: number; second: number; swap: boolean }[] = [];

  for (let i = 0; i < n - 1 && swapped; i++) {
    swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      animations.push({ first: j, second: j + 1, swap: false });
      animations.push({ first: j, second: j + 1, swap: false });
      if (arr[j] > arr[j + 1]) {
        animations.push({ first: arr[j], second: arr[j + 1], swap: true });
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
        animations.push({ first: j, second: j + 1, swap: false });
        animations.push({ first: j, second: j + 1, swap: false });
      }
    }
  }

  return animations;
}
