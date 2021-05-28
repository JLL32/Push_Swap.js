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
	const newtop = stack.top.prev;
	newtop.next = null;
	stack.top = newtop;
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
	}
}

const r_rotate = function(stack) {
	if (stack.length > 1) {
		append(stack, stack.bottom.value);
		removeFirst(stack);
	}
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

const myStack = newStack([1, 2, 3]);

console.log(toArray(myStack));
r_rotate(myStack);
console.log(toArray(myStack));

