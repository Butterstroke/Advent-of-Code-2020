const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

class Instructions {
    constructor(ID, key, value) {
        this.ID = ID;
        this.key = key;
        this.value = Number(value);
    }

    calculateAccumulator(program, visited=[], index=0, count=0) {
        if (visited.includes(this.ID)) { return count; }
        visited.push(this.ID);

        index = (this.key === "jmp") ? index + this.value : index + 1;
        if (this.key === "acc") { count += this.value; }

        return program.get(index).calculateAccumulator(program, visited, index, count);
    }
}

var myInstructions = new Map();
for (var x = 0; x < values.length; x++) {
    myInstructions.set(x, new Instructions(x, ...values[x].split(" ")));
}

console.log(myInstructions.get(0).calculateAccumulator(myInstructions));