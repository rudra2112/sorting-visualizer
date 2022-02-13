export const getMergeSortAnimations = (array) => {
  const animations = [];
  if(array.length<=1)
    return animations;

  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length-1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations){
  if(startIdx===endIdx)
    return;

  const middleIdx = Math.floor((startIdx + endIdx)/2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx+1, endIdx, mainArray, animations);
  merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function merge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations){

  let k = startIdx;
  let i = startIdx;
  let j = middleIdx+1;

  while(i<=middleIdx && j<=endIdx){
    //Comparing the values and changing their color
    animations.push([i, j]);
    
    //Reverting back their color
    animations.push([i, j]);
    if(auxiliaryArray[i] <= auxiliaryArray[j]){
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    else{
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  while(i<=middleIdx){
    animations.push([i, i]);
    animations.push([i, i]);
    
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
    
  }

  while(j<=endIdx){
    animations.push([j, j]);
    animations.push([j, j]);
    
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];

  }
}

export const quickSort = (array, l, r) => {
  if(l<r){
    let pi = partition(array, l, r);
    quickSort(array, l, pi-1);
    quickSort(array, pi+1, r);
  }

  return;
}

function partition(array, l, r){
  let pivot = array[r];
  let i = l-1;

  for(let j=l; j<r; j++){
    if(array[j]<pivot){
      i++;
      swap(array, i, j);
    }
  }
  swap(array, i+1, r);
  return i+1;
}

function swap(array, a, b){
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
