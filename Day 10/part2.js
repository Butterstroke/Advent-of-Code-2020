const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

class PowerAdapter {
    constructor(value) {
        this.voltage = value;
        this.connections = [];
        this.pathLength = 0;
    }

    addConnection(adapter) {
        this.connections.push(adapter);
    }

    findPossiblePaths() {
        if (this.connections.length === 0) { return 1; }
        if (this.pathLength != 0) { return this.pathLength; }
        for (var i = 0; i < this.connections.length; i++) {
            this.pathLength += this.connections[i].findPossiblePaths();
        }
        return this.pathLength;
    }
}

var myAdapters = new Map();
var maxAdapter = 0;
myAdapters.set(0, new PowerAdapter(0)); // Include initial start.
for (var x = 0; x < values.length; x++) {
    var currVolts = Number(values[x]);
    myAdapters.set(currVolts, new PowerAdapter(currVolts));
    if (currVolts > maxAdapter) { maxAdapter = currVolts; }
}

myAdapters.set(maxAdapter + 3, new PowerAdapter(maxAdapter + 3)); // Include phone adapter.

for (var x = 0; x <= maxAdapter; x++) {
    if (myAdapters.has(x)) {
        var currAdapter = myAdapters.get(x);
        if (myAdapters.has(x + 1)) { currAdapter.addConnection(myAdapters.get(x + 1)); }
        if (myAdapters.has(x + 2)) { currAdapter.addConnection(myAdapters.get(x + 2)); }
        if (myAdapters.has(x + 3)) { currAdapter.addConnection(myAdapters.get(x + 3)); }
    }
}

console.log(myAdapters.get(0).findPossiblePaths());