export const getHeapSortAnimations = (array) => {
  const animations = [];
  if (array.length <= 1) return animations;
  const n = array.length;

  heapSort(array, n, animations);
  return animations;
};

function heapSort(array, n, animations) {
  for (let i = n / 2 - 1; i >= 0; i--) {
    heapify(array, n, i, animations);
  }

  for (let i = n - 1; i >= 0; i--) {
    swap(array, 0, i, animations);
    heapify(array, i, 0, animations);
  }
}

function heapify(array, n, idx, animations) {
  var largest = idx;
  const l = 2 * idx + 1;
  const r = 2 * idx + 2;
  animations.push(["compare", l, r, idx]);
  animations.push(["changeBack", l, r, idx]);

  if (l < n && array[largest] < array[l]) {
    largest = l;
  }

  if (r < n && array[largest] < array[r]) {
    largest = r;
  }

  if (largest != idx) {
    swap(array, idx, largest, animations);
    heapify(array, n, largest, animations);
  }
}

function swap(array, a, b, animations) {
  animations.push(["highlight", a, b]);
  animations.push(["swap", a, b, array[a], array[b]]);
  animations.push(["revertColor", a, b]);

  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
