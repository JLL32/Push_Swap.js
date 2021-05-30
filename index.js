const Node = {
	value: null,
	prev: null,
	next: null,
};

const Stack = {
	bottom: null,
	top: null,
	length: 0,
}

const newNode = function(val) {
	const node = Object.create(Node);
	node.value = val;
	node.prev = null;
	node.next = null;
	return node;
}

const newStack = function([...data]) {
	const stack = Object.create(Stack);
	stack.bottom = null;
	stack.top = null;
	stack.length = 0;
	initStack(stack, data);
	return stack;
}

const initStack = (stack, [...data]) => {
	data.forEach(e => append(stack, e));
}

const append = function(stack, value) {
	const node = newNode(value);

	if (stack.bottom == null) {
		stack.bottom = node;
		stack.top = stack.bottom;
	} else {
		node.prev = stack.top;
		stack.top.next = node;
		stack.top = node;
	}

	stack.length++;
}

const prepend = function(stack, value) {
	const node = newNode(value);
	node.next = stack.bottom;
	stack.bottom.previous = node;
	stack.bottom = node;
	stack.length++;
}

const pop = function(stack) {
	const val = stack.top.value;
	const temp = stack.top;
	stack.top = temp.prev;
	stack.top.next = null;
	stack.length--;
	return val;
}

const swap = function(stack) {
	if (stack.length > 1) {
		const tmp = stack.top.value
		stack.top.value = stack.top.prev.value
		stack.top.prev.value = tmp;	
	}
}

const rotate = function(stack) {
	if (stack.length > 1) {
		prepend(stack, pop(stack));
	}
}

const removeFirst = function(stack) {
	if (stack.length > 1) {
		const tmp = stack.bottom.next;
		tmp.prev = null;
		stack.bottom = tmp;
		stack.length--;
	}
}

const r_rotate = function(stack) {
	if (stack.length > 1) {
		append(stack, stack.bottom.value);
		removeFirst(stack);
	}
}

const send = function(stackA, stackB) {
	append(stackB, pop(stackA));
}

const toArray = function(stack) {
	let nodeArray = [];
	let currentNode = stack.bottom;
	while (currentNode) {
		nodeArray.push(currentNode.value);
		if (currentNode.next) {
			currentNode = currentNode.next;
		} else {
			break;
		}
	}
	return nodeArray;
}

const printStack = function(stack) {
	console.log("----------");
	console.log(toArray(stack).map(c => c.toString()).reverse().join('\n'))
}

function ss(stackA, stackB) {
	swap(stackA);
	swap(stackB);
}

function rr(stackA, stackB) {
	rotate(stackA);
	rotate(stackB);
}

function rrr(stackA, stackB) {
	r_rotate(stackA);
	r_rotate(stackB);
}

/*TESTS*/
const stackA = newStack([3,55]);
const stackB = newStack([]);
printStack(stackA);
rotate(stackA)


// if (stackA.length <= 3) {
// 	if (stackA.top.value > stackA.top.prev.value) {
// 		console.log("ra");
// 		rotate(stackA);
// 	}
// 	if (stackA.top.prev.value > stackA.bottom.value) {
// 		console.log("rra");
// 		r_rotate(stackA);
// 	}
// 	if (stackA.top.value > stackA.top.prev.value) {
// 		console.log("sa");
// 		swap(stackA);
// 	}
// }
console.log(stackA)
printStack(stackA);



