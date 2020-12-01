const fs = require("fs");

var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

for (var x = 0; x < values.length; x++) {
    var firstNum = Number(values[x]);

    for (var y = 0; y < values.length; y++) {
        var secondNum = Number(values[y]);

        for (var z = 0; z < values.length; z++) {
            var thirdNum = Number(values[z]);

            if (firstNum + secondNum + thirdNum === 2020) {
                return console.log(firstNum * secondNum * thirdNum);
            }
        }
    }
}