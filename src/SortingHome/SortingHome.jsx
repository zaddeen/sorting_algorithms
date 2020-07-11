// Created by Zaddeen Benaissa, July 2020.

import React from 'react';
import './SortingHome.css';
import {animateMergeSort} from '../SortingAlgorithms/MergeSort.js'
import {animateQuickSort, quick_sort} from "../SortingAlgorithms/QuickSort.js";
import {animateInsertionSort} from "../SortingAlgorithms/InsertionSort.js";
import {animateBubbleSort} from "../SortingAlgorithms/BubbleSort.js";
import {animateHeapSort} from "../SortingAlgorithms/HeapSort.js";
import {animateSelectionSort} from "../SortingAlgorithms/SelectionSort.js";

// A few global constants, placed first so that they are easily 
// modifiable if needed.
const ORIGINAL_ELEMENT_COLOR = "burlywood";
const CHANGED_ELEMENT_COLOR = "blue";
const SORTING_SPEED = 3;
const ELEMENTS_PER_ARRAY = 150;

// This allows us to store all the animations in one place - 
// this is helpful when we are trying to skip past them.
var TIMEOUT_ARRAY = [];

export default class SortingHome extends React.Component {
    // Initializes the state to an empty array, allows for later re-assignment.
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    // Initializes a new array of randomized entries.
    componentDidMount() {
        this.newArray();
    }

    //
    // SORTING ALGORITHM FUNCTIONS:
    //

    // General Guide:

    // Each sorting function has a very similar structure: they are called on the state
    // array if their respective button is clicked, and they each start by calling an external
    // helper function. The helper function sorts the state array, but at the same time it records
    // animations of relevant parts (swapping two elements, selecting a new minimum) within the
    // "animationsArray". The information stored in animationsArray is then used in order to
    // create the visual animations that are seen in real time (as the actual sort takes fractions
    // of a second). The animations conclude with the sorted array, at which point the function
    // highlights every element green (in order) and returns button functionality to the user.

    // Animations Explained:

    // Animations are read from the animationsArray in the following style:
    // const [keyword, element1, element2] = animationsArray[i];
    // Where {keyword} is a string that indicates the animation type. 
    // 1. If {keyword} is either "highlight" or "unhighlight", then element1 and element2 are both 
        // simply the index of the element that we want to change - and we call the corresponding function 
        // to change/revert their color color.
    // 2. If {keyword} is "swap", then element1 and element2 are the indices of the swapped elements,
        // and animationsArray[i+1] (the directly following entry) contains the heights of the two
        // elements. We can then pass this to this.elementSwap() to animate the swap.
    // Note: The animations are really just CSS style changes to either "height" or "backgroundColor".
    
    // Quick Sort.
    // The full algorithm description can be found in SortingAlgorithms/QuickSort.js.
    quickSort() {
        this.disableButtons();
        const algDescription = document.getElementById("algorithm_info");
        algDescription.innerHTML = 
        `<h2 id="algorithm_title"> Algorithm: Quicksort</h2>
        <h4> (Scroll down for more info!) </h4>
            <p> Quicksort relies primarily on the idea of the "partition algorithm" - the algorithm
                selects a pivot element within the array and places it in its correct position
                in the sorted array. In the process, the algorithm ensures that every element to the
                left of the pivot is smaller than it is, and every element to the right of the
                pivot is larger than it is. By repeating this process on each pair of left and right
                partitions, we successfully sort the entire array. </p>
        <h2> Time Complexity </h2>
        <div id="complexity_table">
            <table>
                <tr>
                    <td> Worst Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
                <tr>
                    <td> Average Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
                <tr>
                    <td> Best Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
            </table>
        </div>
        <p> Note: Even though Quicksort runs in O(n<sup>2</sup>) time in the worst case,
            it almost never runs this slow due to the many ways a pivot can be selected
            (first element, last element, random element, etc). Because it almost never runs
            in the worst case time it is quite popular, and the fact that it often runs much 
            faster than alternative algorithms explains its namesake! </p>`;
        TIMEOUT_ARRAY = [];
        const animationsArray = animateQuickSort(this.state.array);
        let i = 0;
        const arrayElements = document.getElementsByClassName("array_element");
        while (i < animationsArray.length) {
            const [keyword, element1, element2] = animationsArray[i];
            // Highlight pivot elements
            if (keyword === "pivot_highlight") {
                this.singleElementHighlight(arrayElements, element1, i, "red");
                i++;
            }
            // Unhighlight pivot element (often after many swaps).
            else if (keyword === "pivot_unhighlight") {
                this.singleElementUnHighlight(arrayElements, element1, i);
                i++;
            }
            // Swap the two compared elements.
            else if (keyword === "swap_compared") {
                const [, element1Height, element2Height] = animationsArray[i+1];
                this.elementSwap(arrayElements, element1, element1Height, element2, element2Height, i)
                i += 2;
            }
        }
        this.completeSorting(i, arrayElements);
    }

    // Merge Sort. 
    // The full algorithm description can be found in SortingAlgorithms/MergeSort.js.
    mergeSort() {
        this.disableButtons();
        const algDescription = document.getElementById("algorithm_info");
        algDescription.innerHTML = 
        `<h2 id="algorithm_title"> Algorithm: Merge Sort</h2>
        <h4> (Scroll down for more info!) </h4> 
            <p>Merge Sort works by recursively splitting the array in half until we reach
                a single element, at which point we begin comparing element by element.
                This allows each portion of the array to be sorted in a row, which explains
                the "chunks" that you can see while the algorithm runs. </p>
        <h2> Time Complexity </h2>
        <div id="complexity_table">
            <table>
                <tr>
                    <td> Worst Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
                <tr>
                    <td> Average Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
                <tr>
                    <td> Best Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
            </table>
        </div>
        <p> Note: Merge Sort always runs in the same time - O(nlog(n)) - due to the fact that 
            it separates the array in half every time, no matter what. This makes it quite 
            effective for larger arrays/lists, as you can guarantee a fast run time. </p>`;
        TIMEOUT_ARRAY = [];
        const animationsArray = animateMergeSort(this.state.array);
        let i = 0;
        const arrayElements = document.getElementsByClassName("array_element");
        while (i < animationsArray.length) {
            const [keyword, element1, element2] = animationsArray[i];
            // Highlight, then unhighlight the compared items.
            if (keyword === "comparison") {
                this.singleElementHighlight(arrayElements, element1, i, CHANGED_ELEMENT_COLOR);
                this.singleElementHighlight(arrayElements, element2, i, CHANGED_ELEMENT_COLOR);
                this.singleElementUnHighlight(arrayElements, element1, i+1, CHANGED_ELEMENT_COLOR);
                this.singleElementUnHighlight(arrayElements, element2, i+1, CHANGED_ELEMENT_COLOR);
            }
            // Merge Sort has a special swap animation - since it is not sorting in place,
            // we only change the height of one of the entries (copy it over).
            else if (keyword === "swap") {
                const element1Style = arrayElements[element1].style;
                const element2Style = arrayElements[element2].style;
                // Color change.
                TIMEOUT_ARRAY.push(
                  setTimeout(() => {
                    element1Style.backgroundColor = CHANGED_ELEMENT_COLOR;
                    element2Style.backgroundColor = CHANGED_ELEMENT_COLOR;
                  }, i * SORTING_SPEED)
                );
                const [, element1height] = animationsArray[i + 1];
                // Height change (not the same as other swaps) and color revert.
                TIMEOUT_ARRAY.push(
                  setTimeout(() => {
                    //element1Style.height = `${2 * element2height}px`;
                    element2Style.height = `${2 * element1height}px`;
                    element1Style.backgroundColor = ORIGINAL_ELEMENT_COLOR;
                    element2Style.backgroundColor = ORIGINAL_ELEMENT_COLOR;
                  }, (i + 1) * SORTING_SPEED)
                );
            }
            i += 2;
        }
        this.completeSorting(i, arrayElements);
    }

    // Insertion Sort.
    // The full algorithm description can be found in SortingAlgorithms/InsertionSort.js.
    insertionSort () {
        this.disableButtons();
        const algDescription = document.getElementById("algorithm_info");
        algDescription.innerHTML = 
        `<h2 id="algorithm_title"> Algorithm: Insertion Sort </h2>
        <h4> (Scroll down for more info!) </h4> 
            <p> Insertion Sort is one of the simpler sorting algorithms: it iterates across the full
                array and sorts it one element at a time, guaranteeing that the first n+1 elements are
                sorted on the "nth" iteration. Though usually inefficient, its advantages are in the fact
                that it is not difficult to implement and that it requires no additional space to sort.</p>
        <h2> Time Complexity </h2>
        <div id="complexity_table">
            <table>
                <tr>
                    <td> Worst Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
                <tr>
                    <td> Average Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
                <tr>
                    <td> Best Case </td>
                    <td> O(n) </td>
                </tr>
            </table>
        </div>
        <p> Note: Insertion Sort is quite slow on large arrays, but its saving grace is that
            it has O(n) runtime on sorted arrays. So, on very small arrays (<10 entries), Insertion
            Sort can outperform almost every other Sorting Algorithm! In fact, some versions of Quick Sort
            actually use Insertion Sort as array partitions approach this size!</p>`;
        TIMEOUT_ARRAY = [];
        const animationsArray = animateInsertionSort(this.state.array);
        let i = 0;
        const arrayElements = document.getElementsByClassName("array_element");
        while (i < animationsArray.length) {
            const [keyword, element1, element2] = animationsArray[i];
            // Swap the two compared elements.
            if (keyword === "swap") {
                const [, element1Height, element2Height] = animationsArray[i+1];
                this.elementSwap(arrayElements, element1, element1Height, element2, element2Height, i)
                i += 2;
            }

            else if (keyword === "reassign") {
                const element1Style = arrayElements[element1].style;
                TIMEOUT_ARRAY.push(
                  setTimeout(() => {
                    element1Style.height = `${2*element2}px`;
                  }, i * SORTING_SPEED)
                );
                i += 1;
            }
        }
        this.completeSorting(i, arrayElements);
    }

    // Bubble Sort.
    // The full algorithm description can be found in SortingAlgorithms/BubbleSort.js.
    bubbleSort() {
        this.disableButtons();
        const algDescription = document.getElementById("algorithm_info");
        algDescription.innerHTML = 
        `<h2 id="algorithm_title"> Algorithm: Bubble Sort</h2>
        <h4> (Scroll down for more info!) </h4>
            <p> Bubble Sort is the most simple sorting algorithm, usually used more to teach
                concepts than to effectively sort arrays. It works by comparing each pair of elements,
                swapping if they are in the wrong order. This guarantees that the final n elements
                will be sorted on the "nth" pass through the array, but can lead to extremely
                slow sorting times.</p>
        <h2> Time Complexity </h2>
        <div id="complexity_table">
            <table>
                <tr>
                    <td> Worst Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
                <tr>
                    <td> Average Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
                <tr>
                    <td> Best Case </td>
                    <td> O(n) </td>
                </tr>
            </table>
        </div>
        <p> Note: Bubble Sort, similar to Insertion Sort, also runs in O(n) time when the 
            array is already sorted. As a result it can also be used on mostly sorted arrays, 
            but Insertion Sort is often preferred. </p>`;
        TIMEOUT_ARRAY = [];
        const animationsArray = animateBubbleSort(this.state.array);
        let i = 0;
        const arrayElements = document.getElementsByClassName("array_element");
        while (i < animationsArray.length) {
            const [keyword, element1, element2] = animationsArray[i];
            if (keyword === "swap") {
                const [, element1Height, element2Height] = animationsArray[i+1];
                this.elementSwap(arrayElements, element1, element1Height, element2, element2Height, i)
                i += 2;
            }
        }
        this.completeSorting(i, arrayElements);
    }

    // Heapsort.
    // The full algorithm description can be found in SortingAlgorithms/HeapSort.js.
    heapSort() {
        this.disableButtons();
        const algDescription = document.getElementById("algorithm_info");
        algDescription.innerHTML = 
        `<h2 id="algorithm_title"> Algorithm: Heapsort</h2>
        <h4> (Scroll down for more info!) </h4>
            <p> Heapsort sorts by first constructing a Max Heap data structure, and then afterwards
                makes sure that the Heap invariant is preserved - this invariant being the idea that
                if one node is a parent of another, the parent value is greater than or equal to
                the child value. This causes the array to become sorted from back to front, as the 
                largest values are processed first (as parent nodes) followed by the smaller ones (children). </p>
        <h2> Time Complexity </h2>
        <div id="complexity_table">
            <table>
                <tr>
                    <td> Worst Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
                <tr>
                    <td> Average Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
                <tr>
                    <td> Best Case </td>
                    <td> O(nlog(n)) </td>
                </tr>
            </table>
        </div>
        <p> Note: Though Heapsort itself is not popular in comparison with strong alternatives
            like Quick Sort or Merge Sort, it is quite useful because it produces a Heap, which
            has lots of uses in Computer Science (including Djikstra's algorithm for path-finding).
            Additionally, though Quick Sort is almost always faster, the fact that its worst case runtime
            is O(n<sup>2</sup>) makes Heapsort a much better option when maximum time is a real concern. </p>`;
        TIMEOUT_ARRAY = [];
        const animationsArray = animateHeapSort(this.state.array);
        let i = 0;
        const arrayElements = document.getElementsByClassName("array_element");
        while (i < animationsArray.length) {
            const [keyword, element1, element2] = animationsArray[i];
            if (keyword === "swap") {
                const [, element1Height, element2Height] = animationsArray[i+1];
                this.elementSwap(arrayElements, element1, element1Height, element2, element2Height, i);
                i += 2;
            }
            
        }
        this.completeSorting(i, arrayElements);
    }

    // Selection Sort.
    // The full algorithm description can be found in SortingAlgorithms/SelectionSort.js.
    selectionSort() {
        this.disableButtons();
        const algDescription = document.getElementById("algorithm_info");
        algDescription.innerHTML = 
        `<h2 id="algorithm_title"> Algorithm: Selection Sort</h2>
        <h4> (Scroll down for more info!) </h4>
            <p> Selection Sort sorts by dividing the array into two parts: on the "nth"
                pass through the array, the first n items are sorted, and the remaining
                subarray (everything to the right of entry n) are not. It works by
                calculating the minimum remaining entry in the unsorted subarray and 
                moving it to the end of the sorted subarray, until the entire array is sorted.</p>
        <h2> Time Complexity </h2>
        <div id="complexity_table">
            <table>
                <tr>
                    <td> Worst Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
                <tr>
                    <td> Average Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
                <tr>
                    <td> Best Case </td>
                    <td> O(n<sup>2</sup>) </td>
                </tr>
            </table>
        </div>
        <p> Note: Selection Sort runs in O(n<sup>2</sup>) time no matter what. However, it 
            can be preferred in certain situations due to the fact that it makes n-1 swaps
            in the worst case. This is paired with the fact that Selection Sort sorts in place 
            (no extra required). So, if memory is an issue, it is quite handy! </p>`;
        TIMEOUT_ARRAY = [];
        const animationsArray = animateSelectionSort(this.state.array);
        let i = 0;
        const arrayElements = document.getElementsByClassName("array_element");
        while (i < animationsArray.length) {
            const [keyword, element1, element2] = animationsArray[i];
            if (keyword === "swap") {
                const [, element1Height, element2Height] = animationsArray[i+1];
                this.elementSwap(arrayElements, element1, element1Height, element2, element2Height, i);
                i += 2;
            }
            else if (keyword === "current_highlight") {
                this.singleElementHighlight(arrayElements, element1, i, CHANGED_ELEMENT_COLOR);
                i++;
            }
            else if (keyword === "current_unhighlight") {
                this.singleElementUnHighlight(arrayElements, element1, i);
                i++;
            }
        }
        this.completeSorting(i, arrayElements);
    }

    //
    // ANIMATION FUNCTIONS
    //

     // Animation for highlighting a single array element, also takes color as input.
     // We store the animation within the TIMEOUT_ARRAY in case we want to skip it.
    singleElementHighlight(arrayElements, element1, i, highlightColor) {
        const element1Style = arrayElements[element1].style;
        TIMEOUT_ARRAY.push(
          setTimeout(() => {
            element1Style.backgroundColor = highlightColor;
          }, i * SORTING_SPEED)
        );
    }

    // Animation for unhighlighting a single array element (change color to original).
    // We store the animation within the TIMEOUT_ARRAY in case we want to skip it.
    singleElementUnHighlight(arrayElements, element1, i) {
        const element1Style = arrayElements[element1].style;
        TIMEOUT_ARRAY.push(
          setTimeout(() => {
            element1Style.backgroundColor = ORIGINAL_ELEMENT_COLOR;
          }, i * SORTING_SPEED)
        );
    }

    // Animation for highlighting and swapping two array elements.
    // The swap animation has a few parts:
        // 1. Highlight the two elements to be swapped (change their color).
        // 2. Swap the two elements heights.
        // 3. Revert the two elements' colors.
    // We store the animations within the TIMEOUT_ARRAY in case we want to skip it.
    elementSwap(arrayElements, element1, element1Height, element2, element2Height, i) {
        const element1Style = arrayElements[element1].style;
        const element2Style = arrayElements[element2].style;
        // Color change.
        TIMEOUT_ARRAY.push(
          setTimeout(() => {
            element1Style.backgroundColor = CHANGED_ELEMENT_COLOR;
            element2Style.backgroundColor = CHANGED_ELEMENT_COLOR;
          }, i * SORTING_SPEED)
        );
        // Height swap and color revert.
        TIMEOUT_ARRAY.push(
          setTimeout(() => {
            element1Style.height = `${2 * element2Height}px`;
            element2Style.height = `${2 * element1Height}px`;
            element1Style.backgroundColor = ORIGINAL_ELEMENT_COLOR;
            element2Style.backgroundColor = ORIGINAL_ELEMENT_COLOR;
          }, (i + 1) * SORTING_SPEED)
        );
    }

    // Re-enables button functionality once the animations are complete.
    completeSorting(i, arrayElements) {
        for (let j = 0; j < arrayElements.length; j++) {
            this.singleElementHighlight(arrayElements, j, i+j+1, "rgb(48, 150, 48)");
        }
        for (let k = 0; k < arrayElements.length; k++) {
            this.singleElementUnHighlight(arrayElements, k, i+arrayElements.length+1);
        }
        TIMEOUT_ARRAY.push(
          setTimeout(() => {
            this.enableButtons();
          }, (i + arrayElements.length + 1) * SORTING_SPEED)
        );
        
    }

    //
    // MAIN RENDER FUNCTION:
    //

    // Renders the current state - this includes the sort buttons, array visualization, display toggle,
    // and algorithm descriptions. 
    render() {
        const {array} = this.state;
        return (
          <>
            <div className="buttons">
              <button id="shuffle" onClick={() => this.newArray()}>
                Shuffle Array
              </button>
              <button id="quick" onClick={() => this.quickSort()}>
                Quicksort
              </button>
              <button id="merge" onClick={() => this.mergeSort()}>
                Merge Sort
              </button>
              <button id="insertion" onClick={() => this.insertionSort()}>
                Insertion Sort
              </button>
              <button id="bubble" onClick={() => this.bubbleSort()}>
                Bubble Sort
              </button>
              <button id="heap" onClick={() => this.heapSort()}>
                Heapsort
              </button>
              <button id="selection" onClick={() => this.selectionSort()}>
                Selection Sort
              </button>
              <button id="skip" onClick={() => this.skipAnimations()}>
                {" "}
                Skip{" "}
              </button>
            </div>

            <div id="array_area" style={{ alignItems: "center" }}>
              {array.map((value, idx) => (
                <div
                  className="array_element"
                  key={idx}
                  style={{ height: `${2 * value}px` }}
                ></div>
              ))}
            </div>
            <div className="stylebuttons">
              <h3> Toggle Array Orientation </h3>
              <button onClick={() => this.arrayStyle("flex-start")}>
                Upper (Icicles)
              </button>
              <button onClick={() => this.arrayStyle("center")}>
                Middle (Signal)
              </button>
              <button onClick={() => this.arrayStyle("flex-end")}>
                Lower (Traditional)
              </button>
            </div>
            <div id="algorithm_info"></div>
          </>
        );
    }

    //
    // HELPER FUNCTIONS:
    //

    // Creates a new array of random numbers - convenient for the "reset array" feature.
    newArray() {
        this.enableButtons();
        const array = [];
        for (let i = 0; i < ELEMENTS_PER_ARRAY; i++) {
            array.push(randomIntGenerator(10, 200));
        }
        this.setState({array});
    }

    // Changes the style of the array depending on which style button has been selected.
    // Possible options are : upper ("flex-start"), center ("center"), and lower ("flex-end").
    arrayStyle(styleChange) {
        const arrayAreaStyle = document.getElementById("array_area").style;
        arrayAreaStyle.alignItems = styleChange;
    }

    // Disables all sorting/shuffle button functionality. Enables skip.
    disableButtons() {
        var list = [
          "shuffle",
          "quick",
          "merge",
          "insertion",
          "bubble",
          "heap",
          "selection"
        ];
        for (let i = 0; i < list.length; i++) {
          document.getElementById(list[i]).disabled = true;
        }
        document.getElementById("skip").disabled = false;
    }

    // Re-enables all sorting/shuffle button functionality. Disables skip.
    enableButtons() {
        var list = [
          "shuffle",
          "quick",
          "merge",
          "insertion",
          "bubble",
          "heap",
          "selection"
        ];
        for (let i = 0; i < list.length; i++) {
          document.getElementById(list[i]).disabled = false;
        }
        document.getElementById("skip").disabled = true;
    }
    
    // Skips the sorting animations and displays the sorted array (re-enables buttons if disabled).
    skipAnimations() {
        for (let i=0; i<TIMEOUT_ARRAY.length; i++) {
            clearTimeout(TIMEOUT_ARRAY[i]);
        }
        TIMEOUT_ARRAY = [];
        const sortedArray = quick_sort(this.state.array);
        const arrayElements = document.getElementsByClassName("array_element");
        for (let i=0; i<arrayElements.length; i++) {
            arrayElements[i].style.backgroundColor = ORIGINAL_ELEMENT_COLOR;
            arrayElements[i].style.height = `${2*sortedArray[i]}px`;
        }
        this.setState({ sortedArray });
        this.enableButtons();
    }
}

// This function was found on StackOverflow, thanks to everyone involved.
// https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomIntGenerator(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1) + lower);
}