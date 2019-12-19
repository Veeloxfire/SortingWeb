"use strict";

var Handler = function () {
    var Object = {
        JObjects: [],
        Squares: []
    }

    function AddQuery(type, value) {
        return type + "=" + value;
    }

    function SortHttpRequest(Sorts, Types, NOG, Seed) {
        const Http = new XMLHttpRequest();
        const Range = document.getElementById("range").value;
        const Length = document.getElementById("len").value
        const url = '/?' + AddQuery("Sort", Sorts.shift()) + "&" + AddQuery("Type", Types.shift()) + "&" + AddQuery("Length", Length) + "&" + AddQuery("Range", Range) + "&" + AddQuery("Seed", Seed);

        console.log(url);

        Http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {

                Object.JObjects.push(JSON.parse(this.responseText));

                if (Object.JObjects.length < NOG) {
                    SortHttpRequest(Sorts, Types, NOG, Seed)
                }
                else {
                    render.draw(Object,NOG, Range);
                }
            }
        }

        Http.open("GET", url, true);

        Http.send();
    }

    function NumGraphs(Sorts, Types) {
        Object = {
            JObjects: [],
            Squares: []
        }

        var Seed = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

        SortHttpRequest(Sorts, Types, Sorts.length, Seed);
    }

    return {
        NumGraphs: NumGraphs
    }
}();


document.getElementById("QuickSort").addEventListener("click", function () {
    Selector.add("QuickSort", document.getElementById("QuickSortPartition").value);
});

document.getElementById("InLineMergeSort").addEventListener("click", function () {
    Selector.add("MergeSort", "InLine");
});

document.getElementById("HeapSort").addEventListener("click", function () {
    Selector.add("HeapSort", "");
});

document.getElementById("InsertionSort").addEventListener("click", function () {
    Selector.add("InsertionSort", "");
});

document.getElementById("IntroSort").addEventListener("click", function () {
    Selector.add("IntroSort", document.getElementById("IntroSortPartition").value);
});

document.getElementById("BubbleSort").addEventListener("click", function () {
    Selector.add("BubbleSort", "");
});

document.getElementById("SelectionSort").addEventListener("click", function () {
    Selector.add("SelectionSort", "");
});

document.getElementById("Start").addEventListener("click", function () {
    var SortingTypes;
    var SortingPartitions;
    [SortingTypes, SortingPartitions] = Selector.get();
    Handler.NumGraphs(SortingTypes, SortingPartitions);
});

document.getElementById("test").addEventListener("click", function () {
    var sorted = render.preArray;
    console.log(sorted);
    var maybeSorted = render.endArray;
    sorted.sort();
    if (sorted == maybeSorted) {
        alert("Sorted!");
    }
    else {
        alert("Unsorted!");
    }
 });