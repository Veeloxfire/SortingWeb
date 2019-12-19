"use strict";

var Algorithms = function (){
    var Output;

    function Start(SortingMethod,SortingType,Length,Range,Seed) {
        Output = {
            array: [],
            operations: []
        }

        var UnsortedArray = RandomizedArray(Length,Range,Seed);

       Output.array = UnsortedArray.slice();

        switch (SortingMethod) {
            case "QuickSort":
                if (SortingType == "HoarePartition") { QuickSort(UnsortedArray, 0, UnsortedArray.length - 1, HoarePartition); }
                else if (SortingType == "LomutoPartition") { QuickSort(UnsortedArray, 0, UnsortedArray.length - 1, LomutoPartition); }
                else {console.log("Incorrect Partition Specified")}
                break;

            case "MergeSort":
                if (SortingType == "InLine") { MergeSort(UnsortedArray, 0, UnsortedArray.length - 1, InLineSort); }
                else { console.log("Incorrect Partition Specified") }
                break;

            case "HeapSort":
                HeapSort(UnsortedArray, 0, UnsortedArray.length - 1);
                break;

            case "InsertionSort":
                InsertionSort(UnsortedArray, 0, UnsortedArray.length - 1);
                break;

            case "IntroSort":
                if (SortingType == "HoarePartition") { IntroSortInnit(UnsortedArray, 0, UnsortedArray.length - 1, HoarePartition); }
                else if (SortingType == "LomutoPartition") { IntroSortInnit(UnsortedArray, 0, UnsortedArray.length - 1, LomutoPartition); }
                else { console.log("Incorrect Partition Specified") }

                break;

            case "SelectionSort":
                SelectionSort(UnsortedArray, 0, UnsortedArray.length - 1);
                break;

            case "BubbleSort":
                BubbleSort(UnsortedArray, 0, UnsortedArray.length - 1);
                break;

            default:
                console.log("No Sorting Function Specified");
                               
        }
        return Output;
    }

    // To Start Quick Sort: QuickSort(Array,0,Array.length-1,PartitionAlgorithm)
    function  QuickSort(Array, low, high, PartitionAlgorithm) {
        if (low < high) {
            // Split original array in to smaller partitions
            var partition = PartitionAlgorithm(Array, low, high);

            //Sort Smaller Partitions
            if (PartitionAlgorithm == HoarePartition) { QuickSort(Array, low, partition, PartitionAlgorithm); }
            if (PartitionAlgorithm == LomutoPartition) { QuickSort(Array, low, partition - 1, PartitionAlgorithm); }

            QuickSort(Array, partition + 1, high, PartitionAlgorithm);
        }
    }

    function HoarePartition(Array, low, high) {
        // Find Pivot
        var pivot = Array[low + Math.floor((high - low) / 2)];
        var i = low - 1;
        var j = high + 1;
        while (true) {
            // Loops to find elements to swap
            do {
                i++;
                highlight("None", [i, j]);
            }
            while (Array[i] < pivot)
            do {
                j--;
                highlight("None", [i, j]);
            }
            while (Array[j] > pivot)

            // Check if iterators have gone past each other
            if (i >= j) {
                return j;
            }

            //Swap Elements
            Swap(Array, i, j);
        }
    }

    function LomutoPartition(Array, low, high) {
        // Find Pivot
        var pivot = Array[high];
        //Set Index
        var  i = low;
        for (var j = low; j < high; j++) {
            if (Array[j] < pivot) {
                Swap(Array, i, j);
                i++
            }
            else {
                highlight("None", [i, j]);
            }
        }
        Swap(Array, i, high);
        return i;
    }

    function Swap(Array, i, j) {
        var holder = Array[i];
        Array[i] = Array[j];
        Array[j] = holder;
        highlight("Swap", [i, j]);
    }

    function MergeSort(Array, high, low, SortFunction) {
        // Sort Array
        if (SortFunction == TopDownSort) {
            var SortedArray = SortFunction(Array);

            // Output Array
            SortedArrayLength = SortedArray.length
            for (var i = 0; i < SortedArrayLength; i++) {
                Array[i] = SortedArray[i];
            }
        }

        if (SortFunction == InLineSort) {
            SortFunction(Array, high, low);
            console.log(Array);
        }


    }

    // Init by high = Array length - 1 and Low = 0
    function InLineSort(Array, high, low) {
        if (high - low < 1) {
            return;
        }

        var midpoint = low + Math.floor((high - low) / 2);

        InLineSort(Array, midpoint, low);
        InLineSort(Array, high, midpoint + 1);

        InLineMerge(Array, high, midpoint, low);
    }

    function InLineMerge(Array, high, midpoint, low) {
        while (midpoint >= low && high > midpoint) {
            if (Array[low] > Array[midpoint + 1]) {
                for (var j = 0; j <= midpoint - low; j++) {
                    Swap(Array, midpoint - j, midpoint + 1 - j);
                }
                midpoint++;
            }
            low++;
        }
    }

    function TopDownSort(Array) {
        // Zero and One length array are already sorted
        if (Array.length < 2) {
            return Array;
        }

        var ArrayLength = Array.length;
        var left = [];
        var right = [];

        // Split Array in half
        for (var i = 0; i < ArrayLength; i++) {
            if (i < ArrayLength / 2) {
                left.push(Array[i]);
            }
            else {
                right.push(Array[i]);
            }
        }

        // Sort the half arrays
        left = TopDownSort(left);
        right = TopDownSort(right);

        // Return combined sorted Arrays
        return TopDownMerge(left, right);
    }

    function TopDownMerge(left, right) {
        var result = [];

        // Put smallest element leftmost until one array empty
        while (left.length > 0 && right.length > 0) {
            if (left[0] <= right[0]) {
                result.push(left[0]);
                left.shift();
            }
            else {
                result.push(right[0]);
                right.shift();
            }
        }

        // Put any elements remainting to the right
        result = result.concat(left);
        result = result.concat(right);

        return result;
    }

    function HeapSort(Array, low, high) {
        // Form the Array in to a binary Heap
        BuildHeap(Array, low, high);

        for (var i = high; i > low; i--) {
            // Swap First and Last number in Heap but leave ordered elements
            Swap(Array, low, i);
            SiftDown(Array, low, low, i - 1);
        }
    }

    function BuildHeap(Array, low, high) {
        // Itterate up the array from the back enact SiftDown on each valid element
        for (var i = high; i >= low; i--) {
            SiftDown(Array, i, low, high);
        }
    }

    function SiftDown(Array, index, low, high) {
        if (high >= (2 * (index) + 1) - low) {
            var LargestChildIndex;
            // Get pair where child nodes should be. If second one is bigger and is actually in the heap then return second else return first
            LargestChildIndex = (Array[2 * (index) + 1 - low] < Array[2 * (index) + 2 - low] && high >= 2 * (index) + 2 - low) ? 2 * (index) + 2 - low : 2 * (index) + 1 - low;

            highlight("None", [index, LargestChildIndex]);

            // Check if child is larger than parent
            if (Array[index] < Array[LargestChildIndex]) {
                // If child is larger swap
                Swap(Array, index, LargestChildIndex);
                // As the elements have swapped check the new child to see if correct
                SiftDown(Array, LargestChildIndex, low, high);
            }
        }
        else {
            highlight("None",[index, high]);
        }
    }

    function InsertionSort(Array, low, high) {
        var Length = high - low + 1;
        //Itterate through array
        for (var i = low; i < Length; i++) {
            // Move element till it is inline
            Insert(Array, i);
        }
    }

    function Insert(Array, index) {
        // Find the position where the element is higher than next element
        while (Array[index] > Array[index + 1] && index >= 0) {
            Swap(Array, index, index + 1);
            index--
        }
    }

    function IntroSortInnit(Array,low,high, PartitionAlgorithm) {
        //Get Max depth and start
        var maxDepth = Math.floor(Math.log(high - low + 1)) * 2;
        IntroSort(Array,low, high, PartitionAlgorithm, maxDepth);
    }

    function IntroSort(Array, low, high, PartitionAlgorithm, Maxdepth) {
        var length = high - low + 1;
        // Already sorted if length 1 or less
        if (length <= 1) {
            return;
        }
        // For max depth do heapsort
        else if (Maxdepth == 0) {
            HeapSort(Array, low, high);
        }
        // For larger sections do quicksort
        else {
            var partition = PartitionAlgorithm(Array, low, high);

            //Sort Smaller Partitions
            if (PartitionAlgorithm == HoarePartition) { IntroSort(Array, low, partition, PartitionAlgorithm, Maxdepth - 1); }
            else if (PartitionAlgorithm == LomutoPartition) { IntroSort(Array, low, partition - 1, PartitionAlgorithm, Maxdepth - 1); }

            IntroSort(Array, partition + 1, high, PartitionAlgorithm, Maxdepth - 1);
        }
    }

    function SelectionSort(Array, low, high) {
        var ArrayLength = high - low + 1;
        for (var i = low; i < ArrayLength; i++) {
            var nextlowest = i;
            for (var j = i; j < ArrayLength; j++) {
                if (Array[nextlowest] > Array[j]) {
                    nextlowest = j;
                }
                highlight("None", [i, j]);

            }
            if (i != nextlowest) {
                Swap(Array, i, nextlowest)
            }
        }
    }

    function BubbleSort(Array,low,high) {
        var n = high-low+1
        while (n >= 1) {
            var newn = 0;
            for (var i = low+1; i < n; i++) {
                if (Array[i - 1] > Array[i]) {
                    Swap(Array, i - 1, i);
                    newn = i;
                }
                else {
                    highlight("None", [i - 1, i]);
                }
            }
            n = newn;
        }
    }

    function highlight(Type, Array) {
        Output.operations.push({ type: Type, highlight: Array });
    }

    function RandomFloat(seed,Range) {
        var num = Math.round(Range * Math.abs(seed / (Number.MAX_SAFE_INTEGER)));

        seed = (25214903917 * seed + 11) % (Number.MAX_SAFE_INTEGER);

        return [seed,num];
    }

    function RandomizedArray(Length, Range, seed) {

        var UnsortedArray = [];
        var seed = seed;
        var RandNumber;

        for (var i = 0; i < Length; i++) {
            [seed,RandNumber] = RandomFloat(seed,Range);

            UnsortedArray[i] = RandNumber;
        }
        return UnsortedArray;
    }

    return {
        Start: Start
    }

}();

module.exports.Algorithms = Algorithms;