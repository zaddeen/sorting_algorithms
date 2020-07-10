// Created by Zaddeen Benaissa, July 2020.

// Returns the animationsArray to the main function in SortingHome.
// Calls the heapHelper function.
export function animateHeapSort(stateArray) {
    const animationsArray = [];
    heapHelper(animationsArray, stateArray);
    return animationsArray;
}

// The parent function for the Heapsort algorithm. First calls the Heapify
// function in a loop in order to construct a Max Heap data structure, and then
// makes sure that the invariant is preserved with the second loop.
function heapHelper(animationsArray, stateArray) {
    const length = stateArray.length;
    const mid = Math.floor((length / 2) - 1);
    // Constructs the max heap.
    for (let i = mid; i >= 0; i--) {
        heapify(animationsArray, stateArray, length, i);
    }
    // Ensures that the heap invariant is preserved.
    for (let i = length-1; i > 0; i--) {
        animationsArray.push(["swap", i, 0]);
        animationsArray.push(["heights", stateArray[i], stateArray[0]]);
        const temp = stateArray[i];
        stateArray[i] = stateArray[0];
        stateArray[0] = temp;
        heapify(animationsArray, stateArray, i, 0);
    }
}

// The Heapify function for the Heapsort algorithm. This is a simple in-place
// function to construct the Heap, it compares elements with "children"
// to ensure that the Heap has been constructed properly (also recursively
// calls itself if needed).
function heapify(animationsArray, stateArray, length, i) {
    // Calculate the position of the children of the root.
    var root = i;
    const left_child = 2*i + 1;
    const right_child = 2*i + 2;
    // If either child is larger than the root, we will need to Heapify the heap. 
    if (left_child < length && stateArray[root] < stateArray[left_child]) {
        root = left_child;
    }

    if (right_child < length && stateArray[root] < stateArray[right_child]) {
        root = right_child;
    }
    // If we do have a size problem, we swap the root with the ith element and heapify.
    if (root !== i) {
        animationsArray.push(["swap", i, root]);
        animationsArray.push(["heights", stateArray[i], stateArray[root]]);
        const temp = stateArray[root];
        stateArray[root] = stateArray[i];
        stateArray[i] = temp;
        heapify(animationsArray, stateArray, length, root);
    }
}