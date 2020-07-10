// Created by Zaddeen Benaissa, July 2020.

// Returns the animationsArray to the main function in SortingHome.
// Calls the mergeHelper function.
export function animateMergeSort (stateArray) {
    const animationsArray = [];
    const tempArray = stateArray.slice();
    const final = stateArray.length - 1;
    mergeHelper(stateArray, tempArray, animationsArray, 0, final);
    return animationsArray;
}

// This function is the same as the first portion of merge sort - recursively divide
// the array into two pieces until we reach single elements, at which point we begin 
// to make comparisons.
function mergeHelper (
    stateArray, 
    tempArray, 
    animationsArray, 
    start, 
    end
) {
    if (start === end) {
        return;
    }
    const mid = Math.floor((start + end) / 2);
    // Recurse on the first half of the array.
    mergeHelper(tempArray, stateArray, animationsArray, start, mid);
    // Recuse on the second half of the array.
    mergeHelper(tempArray, stateArray, animationsArray, mid + 1, end);
    // Perform the sorting operations.
    mergeAnimations(stateArray, tempArray, animationsArray, start, mid, end)
}

// This function is the second portion of the merge sort algorithm - we compare elements
// and sort them as necessary. In this case, we are sorting the tempArray and storing the
// necessary animations in the animationsArray.
function mergeAnimations (
    stateArray,
    tempArray,
    animationsArray,
    start,
    mid,
    end
) {
    let i = start, j = mid + 1, k = start;
    while (i <= mid && j <= end) {
        animationsArray.push(["comparison", i, j]);
        animationsArray.push(["finish_compare", i, j]);
        // If array[i] <= array[j], array[i] goes first.
        if (tempArray[i] <= tempArray[j]) {
          animationsArray.push(["swap", i, k]);
          animationsArray.push(["swap2", tempArray[i], stateArray[k]]);
          stateArray[k++] = tempArray[i++];
        }
        // Otherwise, array[j] goes first.
        else {
          animationsArray.push(["swap", j, k]);
          animationsArray.push(["swap2", tempArray[j], stateArray[k]]);
          stateArray[k++] = tempArray[j++];
        }
    }
    // If there are any leftover items in the left/right halves, we now push them
    // in order into the new array (since we know they must already be sorted).
    while (i <= mid) {
        animationsArray.push(["swap", i, k]);
        animationsArray.push(["swap2", tempArray[i], stateArray[k]]);
        stateArray[k++] = tempArray[i++];
    }

    while (j <= end) {
        animationsArray.push(["swap", j, k]);
        animationsArray.push(["swap2", tempArray[j], stateArray[k]]);
        stateArray[k++] = tempArray[j++];
    }
}