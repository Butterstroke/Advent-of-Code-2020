const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

var NumIndex = [];
var check, targetNum;
var PreambleIndex = 0;
var PreambleAmount = 25;

for (var x = 0; x < values.length; x++) {
    var currNum = Number(values[x]);
    NumIndex.push(currNum);
    if (x >= PreambleIndex) {
        for (var y = PreambleIndex; y < PreambleAmount; y++) {
            for (var z = PreambleIndex; z < PreambleAmount; z++) {
                check = (NumIndex[y] + NumIndex[z]) == currNum;
                if (check) { break; }
            }
            if (check) { break; }
        }
        if (check === false && targetNum === undefined) {
            targetNum = currNum; 
            break;
        }
        PreambleAmount++;
    }
}

var indexFront = 0;
var indexBack = 1;
var myTotal = NumIndex[indexFront] + NumIndex[indexBack];
while (true) {
    if (myTotal < targetNum) {
        indexBack++;
        myTotal += NumIndex[indexBack];
        continue;
    } 
    if (myTotal > targetNum) {
        myTotal -= NumIndex[indexFront];
        indexFront++;
        continue;
    } 
    break;
}

var mySet = NumIndex.slice(indexFront, indexBack).sort((a, b) => a - b); 
console.log(mySet[0] + mySet[mySet.length - 1]);