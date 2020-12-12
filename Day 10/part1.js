const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values
var OneChange = 0;
var ThreeChange = 0;
var prevNum = 0;

values.sort((a, b) => a - b)
    .forEach(item => {
        if (item - prevNum == 1) { OneChange++; }
        else { ThreeChange++; }
        prevNum = item;
    });

console.log(OneChange * (ThreeChange + 1)); //Include phone in formula.