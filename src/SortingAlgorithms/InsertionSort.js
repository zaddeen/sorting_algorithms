// Created by Zaddeen Benaissa, July 2020.

// Returns the animationsArray to the main function in SortingHome.
// Calls the insertionHelper function.
export function animateInsertionSort(stateArray) {
    const animationsArray = [];
    insertionHelper(stateArray, animationsArray);
    return animationsArray;
}
// Runs the Insertion Sort algorithm and records the animations.
// These are simply:
// 1. Swap element with its neighbor (moving it to the left).
// 2. Reassign a value (usually unnecessary, but particularly needed for edge cases).
// This sorts the stateArray and pushes to the animationsArray.
function insertionHelper (stateArray, animationsArray) {
    for (let i = 1; i < stateArray.length; i++) {
        const current = stateArray[i];
        let j = i - 1;
        while (j >= 0 && current < stateArray[j]) {
            // Within this loop, we move small elements leftward until they are smaller
            // than anything on their right but larger than anything on their left.
            animationsArray.push(["swap", j+1, j]);
            animationsArray.push(["swap2", stateArray[j+1], stateArray[j]]);
            stateArray[j + 1] = stateArray[j];
            j -= 1;
        }
        // Now that we have moved an entry as much as we can, we do one final swap
        // to ensure it is in place.
        animationsArray.push(["reassign", j+1, current]);
        stateArray[j + 1] = current;
    }
}