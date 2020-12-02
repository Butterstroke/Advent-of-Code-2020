const fs = require("fs");

var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

class passwordValidation {
    /**
     * @param {Number} min 
     * @param {Number} max 
     * @param {String} validChar 
     * @param {String} password 
     */
    constructor(min, max, validChar, password) {
        this.min = min;
        this.max = max;
        this.validChar = validChar;
        this.password = password;
    };

    testValidity() {
        var numChars = this.password.split(this.validChar).length - 1;
        return (numChars >= this.min && numChars <= this.max) 
    }
}

var count = 0;

for (var x = 0; x < values.length; x++) {
    var parsedValues = values[x].split(" ");
    var min = Number.parseInt(parsedValues[0].split("-")[0]);
    var max = Number.parseInt(parsedValues[0].split("-")[1]);

    var validChar = parsedValues[1].substring(0, 1);
    var password = parsedValues[2];

    var tempPass = new passwordValidation(min, max, validChar, password);

    if (tempPass.testValidity()) { count++; }
}

console.log(count);