export const getQuickSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return animations;

  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
};

function quickSortHelper(array, l, r, animations) {
  if (l < r) {
    let pi = partition(array, l, r, animations);
    quickSortHelper(array, l, pi - 1, animations);
    quickSortHelper(array, pi + 1, r, animations);
  }

  return;
}

function partition(array, l, r, animations) {
  let pivot = array[r];
  let i = l;

  animations.push(["pivot", r]);
  for (let j = l; j < r; j++) {
    if (array[j] < pivot) {
      animations.push(["pointer", i]);
      swap(array, i, j, animations);
      i++;
    }
  }
  swap(array, i, r, animations);
  return i;
}

function swap(array, a, b, animations) {
  animations.push(["colorChange", a, b]);
  animations.push(["swap", a, b, array[a], array[b]]);
  animations.push(["revertColor", a, b]);

  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
