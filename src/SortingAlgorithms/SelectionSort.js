// Created by Zaddeen Benaissa, July 2020.

// Returns the animationsArray to the main function in SortingHome.
// Calls the selectionHelper function.
export function animateSelectionSort(stateArray) {
    const animationsArray = [];
    selectionHelper(stateArray, animationsArray);
    return animationsArray;
}

// The pure Selection Sort algorithm.
// Selection sort is similar to bubble sort, but it guarantees that the first
    // i elements are sorted rather than the last i. We find and move the minimum remaining
    // element to the leftmost available spot on each iteration, but the only swap occurs
    // at the end of each pass. O(n) swaps makes selection sort quite unique.
//
// The animations that are recorded are:
// 1. An element is set as the current minimum.
// 2. An element is compared to the current minimum.
// 3. An element becomes the new current minimum.
// 4. The current minimum is set to the rightmost sorted entry
//    (at the end of each iteration).
function selectionHelper(stateArray, animationsArray) {
    for (let i=0; i<stateArray.length; i++) {
        // Store the current minimum.
        var current_min = i;
        animationsArray.push(["current_highlight", i, i]);
        for (let j=i+1; j<stateArray.length; j++) {
            animationsArray.push(["current_highlight", j, j]);
            // If a value is lower than the current minimum, it becomes the new minimum.
            if (stateArray[current_min] > stateArray[j]) {
                animationsArray.push(["current_unhighlight", current_min, current_min]);
                current_min = j;
                animationsArray.push(["current_highlight", j, j]);
            }
            // Otherwise, we ignore it.
            else {
                animationsArray.push(["current_unhighlight", j, j]);
            }
        }
        // Move the current minimum to the leftmost available spot in the array.
        animationsArray.push(["current_unhighlight", current_min, current_min]);
        animationsArray.push(["swap", i, current_min]);
        animationsArray.push(["heights", stateArray[i], stateArray[current_min]]);
        const min_value = stateArray[current_min];
        stateArray[current_min] = stateArray[i];
        stateArray[i] = min_value;
    }
}