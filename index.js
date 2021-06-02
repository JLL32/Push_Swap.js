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

  if (stack.length == 1) {
    let val = stack.bottom.value
    stack.length = 0;
    stack.bottom = null
    stack.top = null
    return val
  }
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

const getIndexValue = (stack, index) => {
  return [index, toArray(stack)[index]];
};

const topOffset = (length, index) => {
  return length - 1 - index;
};

const bottomOffset = (index) => {
  return index;
};

const pushTopOffset = (stackSrc, stackDst, value) => {
  while (stackSrc.top.value != value) {
    console.log("ra", value);
    rotate(stackSrc);
  }
  send(stackSrc, stackDst);
  // console.log("ra");
};

const pushBottomOffset = (stackSrc, stackDst, value) => {
  while (stackSrc.top.value != value) {
    console.log("rra", value);
    r_rotate(stackSrc);
  }

  send(stackSrc, stackDst);
  // console.log("rra");
};


const sendBiggest = (stackSrc, stackDst) => {
  let biggest = Number.MIN_SAFE_INTEGER;
  let currentNode = stackSrc.bottom;
  let index = 0;
  while (currentNode) {
    let temp = currentNode.value;
    if (temp > biggest)
    {
      biggest = temp;
      index++;
    }
    currentNode = currentNode.next;
  }
  if (index >= stackSrc.length / 2) {
    pushTopOffset(stackSrc, stackDst, biggest);
  } else
    pushBottomOffset(stackSrc, stackDst, biggest);
}

const sendAll = (stackSrc, stackDst) => {
  while (stackSrc.length) {
    sendBiggest(stackSrc, stackDst)
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
      holdTop = getIndexValue(stackA, lengthA);
      if (chunk.includes(holdTop[1])) {
        break;
      }
    }
    let i = 0;
    while (i < stackA.length) {
      holdBottom = getIndexValue(stackA, i);
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
const stackA = newStack([49, 3, 4, 7, 2, 60, 32, 12, 1, 9]);
const stackB = newStack([]);

const arr = toArray(stackA).sort((a, b) => a - b);

console.log("stackA:", toArray(stackA));
console.log("sorted stackA:", arr);
pushChunk(stackA, stackB, arr.slice(0, 5));
console.log("stackB:", toArray(stackB));
pushChunk(stackA, stackB, arr.slice(5, 10));
console.log("stackB:", toArray(stackB));

sendAll(stackB, stackA);

console.log("A after sorting", toArray(stackA))