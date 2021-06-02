const Node = {
  value: null,
  prev: null,
  next: null,
};

const Stack = {
  bottom: null,
  top: null,
  length: 0,
};

const newNode = function (val) {
  const node = Object.create(Node);
  node.value = val;
  node.prev = null;
  node.next = null;
  return node;
};

const newStack = function ([...data]) {
  const stack = Object.create(Stack);
  stack.bottom = null;
  stack.top = null;
  stack.length = 0;
  initStack(stack, data);
  return stack;
};

const initStack = (stack, [...data]) => {
  data.forEach((e) => append(stack, e));
};

const append = function (stack, value) {
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
};

const prepend = function (stack, value) {
  const node = newNode(value);
  node.next = stack.bottom;
  stack.bottom.prev = node;
  stack.bottom = node;
  stack.length++;
};

const pop = function (stack) {
  const val = stack.top.value;
  const temp = stack.top;
  stack.top = temp.prev;
  stack.top.next = null;
  stack.length--;
  return val;
};

const swap = function (stack) {
  if (stack.length > 1) {
    const tmp = stack.top.value;
    stack.top.value = stack.top.prev.value;
    stack.top.prev.value = tmp;
  }
};

const rotate = function (stack) {
  if (stack.length > 1) {
    prepend(stack, pop(stack));
  }
};

const removeFirst = function (stack) {
  if (stack.length > 1) {
    const tmp = stack.bottom.next;
    tmp.prev = null;
    stack.bottom = tmp;
    stack.length--;
  }
};

const r_rotate = function (stack) {
  if (stack.length > 1) {
    append(stack, stack.bottom.value);
    removeFirst(stack);
  }
};

const send = function (stackA, stackB) {
  append(stackB, pop(stackA));
};

const toArray = function (stack) {
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
};

const printStack = function (stack) {
  console.log("----------");
  console.log("top");
  console.log(
    toArray(stack)
      .map((c) => c.toString())
      .reverse()
      .join("\n")
  );
  console.log("bottom");
};

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

const find = (stack, index) => {
  return [index, toArray(stack)[index]];
};

const topOffset = (length, index) => {
  return length - 1 - index;
};

const bottomOffset = (index) => {
  return index;
};

const pushTopOffset = (stackA, stackB, value) => {
	while (stackA.top.value != value) {
	  console.log("ra", value);
    rotate(stackA);
  }
  send(stackA, stackB);
  // console.log("ra");
};

const pushBottomOffset = (stackA, stackB, value) => {
	while (stackA.top.value != value) {
	  console.log("rra", value);
    r_rotate(stackA);
	}

  send(stackA, stackB);
  // console.log("rra");
};

const getBiggest = (stackA, stackB, length) => {
	let biggest;
	let stackLength = stackA.length;
	while (length--) {
		let tmp = find(stackA, length);
		if (tmp > biggest)
			biggest = tmp;
	}
	let offset = stackLength - length;
	if (length == 2) {
		swap(stack)
		send(stackA, stackB)
	} else {
		while ()
	}
}

const pushChunk = (stackA, stackB, chunk) => {
  console.log("chunk:", chunk);
  let length = chunk.length;
	while (length--) {
    let lengthA = stackA.length;
    let holdTop;
    let holdBottom;
    while (lengthA--) {
      holdTop = find(stackA, lengthA);
      if (chunk.includes(holdTop[1])) {
        break;
      }
    }
    let i = 0;
    while (i < stackA.length) {
      holdBottom = find(stackA, i);
      if (chunk.includes(holdBottom[1])) {
        break;
      }
      i++;
    }
    if (topOffset(stackA.length, holdTop[0]) <= bottomOffset(holdBottom[0])) {
      pushTopOffset(stackA, stackB, holdTop[1]);
    } else {
      pushBottomOffset(stackA, stackB, holdBottom[1]);
    }
  }
};
/*TESTS*/
const stackA = newStack([49, 3, 4, 7, 2, 60, 32, 12, 1, 9, 10]);
const stackB = newStack([]);

const arr = toArray(stackA).sort((a, b) => a - b);

console.log("stackA:", toArray(stackA));
console.log("sorted stackA:", arr);
pushChunk(stackA, stackB, arr.slice(0, 4));
console.log("stackB:", toArray(stackB));
pushChunk(stackA, stackB, arr.slice(4, 8));
console.log("stackB:", toArray(stackB));
