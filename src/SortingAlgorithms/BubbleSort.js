export const getBubbleSortAnimations = (array) => {
    const animations = [];
    if (array.length <= 1) return animations;
    const n = array.length;

    let swapped;
    for (let i = 0; i < n-1; i++){
        swapped = false;
        for (let j = 0; j < n-i-1; j++){
            animations.push(["colorChange", j, j+1]);
            if (array[j] > array[j+1]){
                swap(array, j, j+1, animations);
                swapped = true;
            }
            animations.push(["revertColor", j, j+1]);
        }

        if (swapped === false)
            break;
    }

    return animations
}

function swap(array, a, b, animations){
    animations.push(["highlight", a, b]);
    animations.push(["swap", a, b, array[a], array[b]]);

    let temp = array[a];
    array[a] = array[b];
    array[b] = temp;
}