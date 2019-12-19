// JavaScript source code
"use strict";

var render = function () {
    var preArray;
    var endArray;

    var Canvas = document.getElementById("animation");
    var ctx = Canvas.getContext("2d");
    var speed = 50;
    var Time;

    const square = function(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    function setSquares(inputObject) {
        var lengthJ = inputObject.JObjects.length;
        for (var i = 0; i < lengthJ; i++) {
            inputObject.Squares.push(new square(i * Canvas.width / lengthJ, 0, Canvas.width / lengthJ, Canvas.height));
        }
    }

    function setSize() {
        Canvas.width = 1000;
        Canvas.height = 500;
        speed = document.getElementById("speed").value;

    }

    function colourPick(index, highlightArray) {
        var highlightLength = highlightArray.length;
        for (var j = 0; j < highlightLength; j++) {
            if (index == highlightArray[j]) {
                return "#FF0000";
            }
        }
        return "#000000";
    }

    function render(unsortedArray, highlights, Square, Range) {

        var Barwidth = Square.width / unsortedArray.length - 1;
        var Barheight = Square.height / Range;

        var ctx = Canvas.getContext('2d');
        var arrayLength = unsortedArray.length;
        ctx.clearRect(Square.x, Square.y, Square.width, Square.height);
        for (var i = 0; i < arrayLength; i++) {
            ctx.fillStyle = colourPick(i, highlights);
            ctx.fillRect(Math.floor((Barwidth + 1) * i + Square.x), Math.floor(Square.y), Math.floor(Barwidth), Math.floor(Barheight * unsortedArray[i]));
        }

    }

    function swap(inputArray, index1, index2) {
        let holder = inputArray[index1];
        inputArray[index1] = inputArray[index2];
        inputArray[index2] = holder;
    }


    function draw(objectInput, NOG, Range) {
        preArray = [...objectInput.JObjects[0].array];
        endArray = objectInput.JObjects[0].array;
        setSize();
        setSquares(objectInput);



        var lengths = []

        for (var i = 0; i < NOG; i++) {
            render(objectInput.JObjects[i], [], objectInput.Squares[i]);
            lengths.push(objectInput.JObjects[i].operations.length);
            console.log(lengths[i]);
        }


        var maxlength = lengths.reduce((a, b) => Math.max(a, b));

        console.log(maxlength);


        for (var i = 0;i < maxlength; i++) {
            for (var j = 0; j < NOG; j++) {
                if (lengths[j] > i) {
                    setTimeout(resolve, (200 * (i+1) / speed), objectInput.JObjects[j], i, objectInput.Squares[j], Range);
                }
            }
        }
    }

    function resolve(objectInput, index, Square, Range) {
        var inputArray;
        var operations;
        var highlight;
        var type;

        inputArray = objectInput.array
        operations = objectInput.operations[index]
        highlight = operations.highlight;
        type = operations.type;

        if (type == "Swap") {
            swap(inputArray, highlight[0], highlight[1]);
        }
        if (type == "None") { }

        render(objectInput.array, highlight, Square, Range);
    }

    return {
        draw: draw,
        preArray: preArray,
        endArray: endArray
    }
}();