const Node = {
	value: null,
	prev: null,
	next: null,
};

const Stack = {
	head: null,
	tail: null,
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
	stack.head = null;
	stack.tail = null;
	stack.length = 0;
	initStack(stack, data);
	return stack;
}

const initStack = (stack, [...data]) => {
	data.forEach(e => append(stack, e));
}

const append = function(stack, value) {
	const node = newNode(value);

	if (stack.head == null) {
		stack.head = node;
		stack.tail = stack.head;
	} else {
		node.prev = stack.tail;
		stack.tail.next = node;
		stack.tail = node;
	}

	stack.length++;
}

const myStack = newStack([1, 2, 3, 4, 5, 6, 7, 8]);

console.log(myStack.head.next.prev)

