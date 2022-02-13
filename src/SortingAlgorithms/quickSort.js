export const quickSort = (array, l, r) => {
  if (l < r) {
    let pi = partition(array, l, r);
    quickSort(array, l, pi - 1);
    quickSort(array, pi + 1, r);
  }

  return;
};

function partition(array, l, r) {
  let pivot = array[r];
  let i = l - 1;

  for (let j = l; j < r; j++) {
    if (array[j] < pivot) {
      i++;
      swap(array, i, j);
    }
  }
  swap(array, i + 1, r);
  return i + 1;
}

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
