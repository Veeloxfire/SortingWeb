// JavaScript source code
var Animate = function () {
    var Canvas = document.getElementById("animation");
    var ctx = Canvas.getContext("2d");
    var speed = 1;

    var Barwidth = 0;
    var height = 0;
    var highlight = [];
    var Timer;

    function addhighlight(array) {
        highlight.push(array.concat([performance.now()-Timer]));
    }


    function setSize(Array) {
        Canvas.width = 1000;
        Canvas.height = 500;
        Barwidth = 1000 / Array.length - 1;
        height = Math.ceil(Canvas.height / document.getElementById("range").value);
    }

    function reset(inputArray) {
        setSize(inputArray);

        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        ctx.fillStyle = "#000000";

        inputArraylength = inputArray.length

        for (var j = 0; j < inputArraylength; j++) {
            ctx.fillRect((Barwidth + 1) * j, 0, Barwidth, height * inputArray[j]);
        }
    }


    function QuickSortHighlight(inputArray) {
        var UnsortedArray = [...inputArray];

        var SelectorValue = document.getElementById("QuickSortPartition").value;
        
        if (SelectorValue == "Hoare") { Algorithms.QuickSort(UnsortedArray, 0, UnsortedArray.length - 1, Algorithms.HoarePartition) }
        if (SelectorValue == "Lomuto") { Algorithms.QuickSort(UnsortedArray, 0, UnsortedArray.length - 1, Algorithms.LomutoPartition) }
    }

    function IntroSortHighlight(inputArray) {
        var UnsortedArray = [...inputArray];

        var SelectorValue = document.getElementById("IntroSortPartition").value;

        if (SelectorValue == "Hoare") { Algorithms.IntroSort(UnsortedArray, Algorithms.HoarePartition) }
        if (SelectorValue == "Lomuto") { Algorithms.IntroSort(UnsortedArray, Algorithms.LomutoPartition) }


    }

    function HeapSortHighlight(inputArray) {
        var UnsortedArray = [...inputArray];
        Algorithms.HeapSort(UnsortedArray,0,UnsortedArray.length-1);
    }

    function MergeSortHighlight(inputArray) {
        var UnsortedArray = [...inputArray];
        Algorithms.MergeSort(UnsortedArray, UnsortedArray.length - 1, 0, Algorithms.InLineSort);
    }

    function InsertSortHighlight(inputArray) {
        var UnsortedArray = [...inputArray];
        Algorithms.InsertionSort(UnsortedArray);
    }

    function BubbleSortHightlight(inputArray) {
        var UnsortedArray = [...inputArray];
        Algorithms.BubbleSort(UnsortedArray);
    }

    function SelectionSortHightlight(inputArray) {
        var UnsortedArray = [...inputArray];
        Algorithms.SelectionSort(UnsortedArray);
    }

    function NoSort() {
        addhighlight(["nothing"]);
    }



    async function Draw(inputArray, Sorter) {

        speed = document.getElementById("speed").value;
        Timer = performance.now()
        Sorter(inputArray)

        inputArraylength = inputArray.length;
        
        for (i in highlight) {
            iLength = highlight[i].length;
            setTimeout(function () {
                const step = highlight[0];
                if (step[0] == "swap") { Swap(inputArray, step[1], step[2]); }
                else if (step[0] == "nothing") { }

                ctx.clearRect(0, 0, Canvas.width, Canvas.height);

                for (var j = 0; j < inputArraylength; j++) {
                    ctx.fillStyle = "#000000";
                    for (var k = 1; k < step.length;k++) {
                        if (j == step[k]) {
                            ctx.fillStyle = "#FF0000";
                        }
                    }

                    ctx.fillRect((Barwidth+1) * j, 0, Barwidth, height * inputArray[j]);
                }
                highlight.shift();
            }, highlight[i][iLength-1] * 200000 / speed);
        }
    }
    

    function Swap(Array, i, j) {
        var holder = Array[i];
        Array[i] = Array[j];
        Array[j] = holder;
    }

    return {
        QuickSort: QuickSortHighlight,
        HeapSort: HeapSortHighlight,
        MergeSort: MergeSortHighlight,
        InsertionSort: InsertSortHighlight,
        NoSort: NoSort,
        IntroSort: IntroSortHighlight,
        BubbleSort: BubbleSortHightlight,
        SelectionSort: SelectionSortHightlight,

        Draw: Draw,
        addhighlight: addhighlight,
        Reset: reset
    }

}();


Algorithms = function () {
    var Output = {
        array: [],
        operations: []
    }

    var IndividualHighlight = {
        type : "",
        highlight: []
    }

    // To Start Quick Sort: QuickSort(Array,0,Array.length-1,PartitionAlgorithm)
    function QuickSort(Array, low, high, PartitionAlgorithm) {
        if (low < high) {
            // Split original array in to smaller partitions
            partition = PartitionAlgorithm(Array, low, high);

            //Sort Smaller Partitions
            if (PartitionAlgorithm == HoarePartition) { QuickSort(Array, low, partition, PartitionAlgorithm); }
            if (PartitionAlgorithm == LomutoPartition) { QuickSort(Array, low, partition - 1, PartitionAlgorithm); }

            QuickSort(Array, partition + 1, high, PartitionAlgorithm);
        }
    }

    function HoarePartition(Array, low, high) {
        // Find Pivot
        pivot = Array[low + Math.floor((high - low) / 2)];
        i = low - 1;
        j = high + 1;
        while (true) {
            // Loops to find elements to swap
            do {
                i++;
            }
            while (Array[i] < pivot)
            do {
                j--;
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
        pivot = Array[high];
        //Set Index
        var i = low;
        for (var j = low; j < high; j++) {
            if (Array[j] < pivot) {
                Swap(Array, i, j);
                i++
            }
        }
        Swap(Array, i, high);
        return i;
    }

    function Swap(Array, i, j) {
        var holder = Array[i];
        Array[i] = Array[j];
        Array[j] = holder;
        Animate.addhighlight(["swap",i, j]);
    }

    function MergeSort(Array,high,low, SortFunction) {
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
        while (midpoint >= low && high > midpoint ) {
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

    function HeapSort(Array,low,high) {
        // Form the Array in to a binary Heap
        BuildHeap(Array,low,high);

        for (var i = high; i > low; i--) {
            // Swap First and Last number in Heap but leave ordered elements
            Swap(Array, low, i);
            SiftDown(Array, low,low, i-1);
        }
    }

    function BuildHeap(Array,low,high) {
        // Itterate up the array from the back enact SiftDown on each valid element
        for (var i = Math.ceil(high-low/2); i >= low; i--) {
            SiftDown(Array, i,low, high);
        }
    }

    function SiftDown(Array, index,low, high) {
        if (high >= (2 * (index) + 1)-low) {
            var LargestChildIndex;
            // Get pair where child nodes should be. If second one is bigger and is actually in the heap then return second else return first
            LargestChildIndex = (Array[2 * (index) + 1 - low] < Array[2 * (index) + 2 - low] && high >= 2 * (index) + 2 - low) ? 2 * (index) + 2 - low : 2 * (index) + 1 - low;
            
            // Check if child is larger than parent
            if (Array[index] < Array[LargestChildIndex]) {
                // If child is larger swap
                Swap(Array, index, LargestChildIndex);
                // As the elements have swapped check the new child to see if correct
                SiftDown(Array, LargestChildIndex,low,high);
            }
        }
    }

    function InsertionSort(Array) {
        var Length = Array.length
        //Itterate through array
        for (var i = 0; i < Length; i++) {
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

    function IntroSortInnit(Array, PartitionAlgorithm) {
        //Get Max depth and start
        var maxDepth = Math.floor(Math.log(Array.length)) * 2;
        IntroSort(Array, 0, Array.length - 1, PartitionAlgorithm, maxDepth);
    }

    function IntroSort(Array, low, high, PartitionAlgorithm, Maxdepth) {
        var length = high-low;
        // Already sorted if length 1 or less
        if (length < 1) {
            return;
        }
        // For max depth do heapsort
        else if (Maxdepth == 0) {
            HeapSort(Array, low, high);
        }
        // For larger sections do quicksort
        else {
            partition = PartitionAlgorithm(Array,low,high)

            //Sort Smaller Partitions
            if (PartitionAlgorithm == HoarePartition) { IntroSort(Array, low, partition, PartitionAlgorithm,Maxdepth-1); }
            if (PartitionAlgorithm == LomutoPartition) { IntroSort(Array, low, partition - 1, PartitionAlgorithm, Maxdepth - 1); }

            IntroSort(Array, partition + 1, high, PartitionAlgorithm);
        }
    }

    function SelectionSort(Array) {
        ArrayLength = Array.length;
        for (var i = 0; i < ArrayLength; i++) {
            var nextlowest = i;
            for (var j = i; j < ArrayLength; j++) {
                if (Array[nextlowest] > Array[j]) {
                    nextlowest = j;
                }

            }
            if (i != nextlowest) {
                Swap(Array, i, nextlowest)
            }
        }
    }

    function BubbleSort(Array) {
        n = Array.length;
        while (n >= 1) {
            var newn = 0;
            for (var i = 1; i < n; i++) {
                if (Array[i - 1] > Array[i]) {
                    Swap(Array, i - 1, i);
                    newn = i;
                }
            }
            n = newn;
        }
    }

    function RandomizedArray() {
        

        var UnsortedArray = [];

        var length = document.getElementById("len").value;
        var range = document.getElementById("range").value;

        for (var i = 0; i < length; i++) {
            UnsortedArray[i] = Math.round(Math.random() * range);
        }

        return UnsortedArray;
    }

    return {
        QuickSort: QuickSort,
        HoarePartition: HoarePartition,
        LomutoPartition: LomutoPartition,
        TopDownSort: TopDownSort,
        InLineSort: InLineSort,
        MergeSort: MergeSort,
        HeapSort: HeapSort,
        InsertionSort: InsertionSort,
        IntroSort: IntroSortInnit,
        BubbleSort: BubbleSort,
        SelectionSort: SelectionSort,

        Reset: RandomizedArray
    }
}();

var Unsorted;

var Testing;

document.getElementById("main").addEventListener("load", function () {
    Unsorted = Algorithms.Reset()
})

document.getElementById("QuickSort").addEventListener("click", function () {
    Animate.Draw(Unsorted, Animate.QuickSort);
});

document.getElementById("InLineMergeSort").addEventListener("click", function () {
    Animate.Draw(Unsorted, Animate.MergeSort);
});

document.getElementById("HeapSort").addEventListener("click", function () {
    Animate.Draw(Unsorted,Animate.HeapSort);
});

document.getElementById("InsertionSort").addEventListener("click", function () {
    Animate.Draw(Unsorted, Animate.InsertionSort);
});

document.getElementById("IntroSort").addEventListener("click", function () {
    Animate.Draw(Unsorted, Animate.IntroSort);
});

document.getElementById("BubbleSort").addEventListener("click", function () {
    Animate.Draw(Unsorted, Animate.BubbleSort);
});

document.getElementById("SelectionSort").addEventListener("click", function () {
    Animate.Draw(Unsorted, Animate.SelectionSort);
});

document.getElementById("reset").addEventListener("click", function () {
    Unsorted = Algorithms.Reset(); 
    Testing = [...Unsorted];
    Animate.Reset(Unsorted);
});

document.getElementById("test").addEventListener("click", function () {
    Testing.sort(function (a, b) { return a - b;});
    console.log(Testing);
    console.log(Unsorted);
    var same = true;
    for (var i = 0; i < Testing.length; i++) {
        if (Testing[i] != Unsorted[i]) {
            same = false;
        }
    }
    if (same) {
        alert("same");
    }
    else {
        alert("not same");
    }
});