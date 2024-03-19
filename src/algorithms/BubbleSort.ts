import { objectsAreEqual } from "../utils/isEqual";

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

export const bubbleSortCall = (bar: number[]) => {
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
    // if (i === animation.length - 1) setIsSorting(false);
  }
};
