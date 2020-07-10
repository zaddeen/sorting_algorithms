// Created by Zaddeen Benaissa, July 2020.

// Returns the animationsArray to the main function in SortingHome.
// Calls the bubbleHelper function.
export function animateBubbleSort(stateArray) {
    const animationsArray = [];
    bubbleHelper(animationsArray, stateArray);
    return animationsArray;
}

// Runs Bubble Sort and returns the animations. 
// We iterate over the entire array and sort the elements pairwise - 
    // if one is larger than the other, it is moved to the right.
    // This guarantees that the last i elements are sorted on the ith pass.
//
// The only animations for this process are the swaps each time - we don't need to
// animate every comparison that occurs, just successful ones. This Bubble Sort 
// implementation has also been slightly optimized - if we don't make a swap on 
// a pass through the array, we know we have finished sorting so we stop.
function bubbleHelper(animationsArray, stateArray) {
    const length = stateArray.length;
    for (let i = 0; i < length; i++) {
        // Assume a swap has not happened. If this holds, break out of the loop.
        var swapHappened = false;
        for (let j = 0; j < length - i - 1; j++) {
            // If two elements are out of order, swap them. Set swapHappened = true.
            if (stateArray[j] > stateArray[j + 1]) {
                animationsArray.push(["swap", j, j+1]);
                animationsArray.push(["heights", stateArray[j], stateArray[j+1]]);
                const temp = stateArray[j + 1];
                stateArray[j + 1] = stateArray[j];
                stateArray[j] = temp;
                swapHappened = true;
            }
        }
    if (!swapHappened) {break;}
    }
}