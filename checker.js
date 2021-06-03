const readline = require("readline");
const ops = require("./stack");
const data = require("./data");

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
});

let data = process.argv.slice(2).map((str) => Number(str));
// console.log(process.argv);
const input = data.input;
let stackA = ops.newStack("a", input);
//console.log(ops.toArray(stackA));
let sorted = input.sort((a, b) => b - a);
//console.log(sorted);
let stackB = ops.newStack("b", []);

// ops.send(stackA, stackB);
// ops.send(stackA, stackB);
// ops.send(stackA, stackB);
// ops.r_rotate(stackB);
// ops.send(stackB, stackA);
// ops.rotate(stackB);
// ops.send(stackB, stackA);
// ops.send(stackB, stackA);
let i = 0;
rl.on("line", function (line) {
	i++;
    switch (line) {
        case "ra":
            ops.rotate(stackA);
            break;
        case "rb":
            ops.rotate(stackB);
            break;
        case "rra":
            ops.r_rotate(stackA);
            break;
        case "rrb":
            ops.r_rotate(stackB);
            break;
        case "pa":
            ops.send(stackB, stackA);
            break;
        case "pb":
            ops.send(stackA, stackB);
            break;
        case "sa":
            ops.swap(stackA);
            break;
        case "sb":
            ops.swap(stackB);
            break;
        default:
            break;
    }
}).on("close", function() {
	console.log(ops.toArray(stackA).join('') == sorted.join(''));
	console.log(ops.toArray(stackA));
	console.log(i);
})

