const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

class Instructions {
    constructor(ID, key, value) {
        this.ID = ID;
        this.key = key;
        this.value = Number(value);
    }

    calculateAccumulator(program, visited=[], index=0, count=0, changed=false) {
        if (visited.includes(this.ID)) { return false; }
        visited.push(this.ID);
        var check;

        var myIndex = (this.key === "jmp") ? index + this.value : index + 1;
        if (this.key === "acc") { count += this.value; }
        if (myIndex >= program.size) { return count; }

        if (this.key === "acc") {
            return program.get(myIndex).calculateAccumulator(program, visited, myIndex, count, changed);
        }

        if (this.key === "nop") { 
            check = program.get(myIndex).calculateAccumulator(program, visited, myIndex, count, changed);
            if (check === false && changed === false) {
                myIndex = index + this.value;
                if (myIndex >= program.size) { return count; }
                check = program.get(myIndex).calculateAccumulator(program, visited, myIndex, count, true);
            }
            return check;
        }

        // jmp is last case. 
        check = program.get(myIndex).calculateAccumulator(program, visited, myIndex, count, changed);
        if (check === false && changed === false) {
            myIndex = index + 1;
            if (myIndex >= program.size) { return count; }
            check = program.get(myIndex).calculateAccumulator(program, visited, myIndex, count, true);
        }
        return check;
    }
}

var myInstructions = new Map();
for (var x = 0; x < values.length; x++) {
    myInstructions.set(x, new Instructions(x, ...values[x].split(" ")));
}

console.log(myInstructions.get(0).calculateAccumulator(myInstructions));