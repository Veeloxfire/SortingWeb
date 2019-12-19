"use strict";

var Selector = function () {
    var selectorElement = document.getElementById("selector");

    function add(SortingType, SortingPartition) {
        var node1 = document.createElement("div");
        node1.innerHTML = SortingType;

        var type = document.createAttribute("SortingType");
        var part = document.createAttribute("Partition");
        type.value = SortingType;
        part.value = SortingPartition;

        node1.setAttributeNode(type);
        node1.setAttributeNode(part);

        var exiter = document.createElement("span");
        exiter.classList.add("closebtn");
        exiter.onclick = function () { this.parentElement.parentElement.removeChild(this.parentElement) };
        exiter.innerHTML = "&times;";
        node1.appendChild(exiter);
        selectorElement.appendChild(node1);
    }

    function get() {
        var children = selectorElement.childNodes;

        var SortingTypes = [];
        var SortingPartitions = []

        for (var i = 0; i < children.length; i++) {
            SortingTypes.push(children[i].getAttribute("SortingType"));
            SortingPartitions.push(children[i].getAttribute("Partition"));
        }

        return [SortingTypes, SortingPartitions];
    }

    return {
        add: add,
        get: get
    }
}();