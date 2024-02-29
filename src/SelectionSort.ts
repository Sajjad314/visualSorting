export function SelectionSort(arr: number[]): {
  fix: number;
  compare: number;
  first: number;
  sec: number;
  swap: boolean;
}[] {
  const n = arr.length;

  const animations: {
    fix: number;
    compare: number;
    first: number;
    sec: number;
    swap: boolean;
  }[] = [];

  for (let i = 0; i < n; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      animations.push({
        fix: minIndex,
        compare: j,
        first: 0,
        sec: 0,
        swap: false,
      });
      animations.push({
        fix: minIndex,
        compare: j,
        first: 0,
        sec: 0,
        swap: false,
      });
      if (arr[j] < arr[minIndex]) {
        animations.push({ fix: j, compare: j, first: 0, sec: 0, swap: false });
        minIndex = j;
      }
    }
    animations.push({
      fix: i,
      compare: minIndex,
      first: arr[minIndex],
      sec: arr[i],
      swap: true,
    });
    animations.push({
      fix: i,
      compare: minIndex,
      first: arr[minIndex],
      sec: arr[i],
      swap: true,
    });
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
  }
  console.log(arr);
  return animations;
}
