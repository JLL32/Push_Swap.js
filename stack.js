const Node = {
  value: null,
  prev: null,
  next: null,
};

const Stack = {
  bottom: null,
  top: null,
  length: 0,
  label: '',
};

const newNode = function (val) {
  const node = Object.create(Node);
  node.value = val;
  node.prev = null;
  node.next = null;
  return node;
};


const newStack = function (label, [...data]) {
  const stack = Object.create(Stack);
  stack.bottom = null;
  stack.top = null;
  stack.length = 0;
  stack.label = label;
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
  console.log("s" + stack.label);
  if (stack.length > 1) {
    const tmp = stack.top.value;
    stack.top.value = stack.top.prev.value;
    stack.top.prev.value = tmp;
  }
};

const rotate = function (stack) {
  console.log("r" + stack.label);
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
  console.log("rr" + stack.label);
  if (stack.length > 1) {
    append(stack, stack.bottom.value);
    removeFirst(stack);
  }
};

const send = function (stackSrc, stackDst) {
  console.log("p" + stackDst.label)
  append(stackDst, pop(stackSrc));
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

module.exports = {
  rotate,
  r_rotate,
  swap,
  send,
  newStack,
  printStack,
  toArray,
  ss,
  rr,
  rrr,
  getIndexValue,
  topOffset,
  bottomOffset,
}
