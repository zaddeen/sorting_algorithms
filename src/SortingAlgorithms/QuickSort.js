// Created by Zaddeen Benaissa, July 2020.

// Returns the animationsArray to the main function in SortingHome.
// Calls the quickHelper function.
export function animateQuickSort (stateArray) {
    const animationsArray = [];
    quickHelper(stateArray, 0, stateArray.length-1, animationsArray);
    return animationsArray;
}

// Helper function to perform Quicksort.
// Calls the partition function and recursively calls itself with smaller
// partitions of the array.
function quickHelper(array, start, end, animationsArray) {
    if (start < end) {
        const partition = partitionHelper(array, start, end, animationsArray);
        quickHelper(array, start, partition-1, animationsArray);
        quickHelper(array, partition+1, end, animationsArray);
    }
}
// The partition function for Quicksort. 
// This function chooses a pivot element and sorts elements around it, and while
// doing so it a) pushes animations to animationsArray and b) sorts the given 
// array accordingly.
function partitionHelper(array, start, end, animationsArray) {
    let i = start-1;
    // Here we use the final entry as the pivot - but using any entry would be valid.
    // Other implementations use the start, middle, or even randomized entries.
    const pivotElement = array[end];
    animationsArray.push(["pivot_highlight", end, end])
    for (let j = start; j < end; j+=1) {
        // If an element is less than the pivot, we place it at the leftmost available
        // spot in the array. We don't care if the entries are in order right now,
        // we only examine if they are less/greater than the pivot value.
        if (array[j] < pivotElement) {
            i += 1;
            animationsArray.push(["swap_compared", i, j]);
            animationsArray.push(["swap_elements", array[i], array[j]]);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    animationsArray.push(["pivot_unhighlight", end, end]);
    animationsArray.push(["swap_compared", end, i + 1]);
    animationsArray.push(["swap_elements", array[end], array[i + 1]]);
    // We finish by swapping the final entry in the array with the our recorded
    // "ith" value - this is because the final entry is the pivot, so this swap ensures
    // that everything to the left is smaller than the pivot and everything to the
    // right is larger!
    const newTemp = array[end];
    array[end] = array[i+1];
    array[i+1] = newTemp;
    return (i+1);
}

// Produces the sorted array for Quicksort.
// Also calls the quickSortHelper function - but instead of returning
// animationsArray, it simply returns the (now sorted) array.
export function quick_sort(array) {
    const animationsArray = [];
    quickHelper(array, 0, array.length-1, animationsArray);
    return array;
}