const fs = require("fs");
var values = fs.readFileSync("input.txt", "utf8").split("\r\n"); //Reads the values

class BagConnection {
    constructor(bag, amount) {
        this.bag = bag;
        this.amount = amount;
    }
};

class LuggageBag {
    constructor(colour) {
        this.colour = colour;
        this.connections = [];
    }

    addConnection(bag, amount) {
        this.connections.push(new BagConnection(bag, amount));
    }

    findShinyGold(ShinyGold = false) {
        if (this.colour == "shiny gold") { return true; }
        if (this.connections.length == 0) { return false; }
        for (var x = 0; x < this.connections.length; x++) {
            if (this.connections[x].bag.findShinyGold(ShinyGold)) { 
                ShinyGold = true; 
            }
        }
        return ShinyGold;
    }

    bagsInside(amount=0) {
        if (this.connections.length == 0) { return 1; }
        var myConnectionAmount = 0;
        for (var x = 0; x < this.connections.length; x++) {
            myConnectionAmount += this.connections[x].bag.bagsInside(amount) * this.connections[x].amount;
        }
        //Include self at the end if not shiny gold.
        return myConnectionAmount + (this.colour != "shiny gold");
    }
};

var myBags = new Map();
for (var x = 0; x < values.length; x++) {
    var bagColour = values[x].split("bags contain")[0].trim();
    var bagContents = values[x].split("contain")[1].split(",");
    var currBag;

    if (!myBags.has(bagColour)) {
        currBag = new LuggageBag(bagColour);
        myBags.set(bagColour, currBag);
    } else {
        currBag = myBags.get(bagColour);
    }

    for (var y = 0; y < bagContents.length; y++) {
        var currConnect, currColour = null;
        var currContent = bagContents[y].trim();

        if (currContent != "no other bags.") {
            currColour = currContent.substring(2, currContent.indexOf("bag")).trim();
            
            if (!myBags.has(currColour)) {
                currConnect = new LuggageBag(currColour);
                myBags.set(currColour, currConnect);
            } else {
                currConnect = myBags.get(currColour);
            }    
            
            currBag.addConnection(currConnect, Number(currContent.substring(0, 2)));
        }        
    }     
}

console.log(myBags.get("shiny gold").bagsInside());