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

const pushTopOffset = (stackSrc, stackDst, value) => {

  while (stackSrc.top.value != value) {
    if (stackSrc.top.prev && value == stackSrc.top?.prev?.value && stackSrc.label == 'b')
        swap(stackSrc);
    else
      rotate(stackSrc);
  }

  send(stackSrc, stackDst);
};

const pushBottomOffset = (stackSrc, stackDst, value) => {
  while (stackSrc.top.value != value) {
    r_rotate(stackSrc);
  }

  send(stackSrc, stackDst);
};


const sendBiggest = (stackSrc, stackDst) => {
  let biggest = Number.MIN_SAFE_INTEGER;
  let currentNode = stackSrc.bottom;
  let index = 0;
  let biggestNIndex = 0;
  while (currentNode) {
    let temp = currentNode.value;
    if (temp > biggest) {
      biggestNIndex = index
      biggest = temp;
    }
    index++;
    currentNode = currentNode.next;
  }
  if (biggestNIndex >= stackSrc.length / 2) {
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
  // console.log("chunk:", chunk);
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

const pushChunks = function (sortedArr, stackSrc, stackDst) {
  let chunk = 15;
  let n_slices = Math.ceil(sortedArr.length / chunk);
  let start = 0;
  let end = chunk;
  if (sortedArr.length > chunk) {
    while (n_slices) {
      const slice = sortedArr.slice(start, end);
      pushChunk(stackSrc, stackDst, slice);
      start = end;
      end += chunk;
      n_slices--;
    }
  } else {
    pushChunk(stackSrc, stackDst, sortedArr);
  }
}

/*TESTS*/
//const input = [187, 588, 151, 890, 318, 645, 324, 320, 849, 741, 268, 835, 471, 213, 437, 244, 166, 35, 938, 488, 384, 739, 291, 534, 287, 561, 943, 789, 11, 817, 81, 272, 743, 879, 131, 487, 428, 411, 216, 983, 73, 122, 895, 317, 28, 162, 940, 590, 928, 323, 725, 632, 54, 276, 55, 896, 559, 423, 934, 549, 586, 949, 937, 328, 770, 818, 446, 999, 782, 598, 115, 664, 891, 697, 108, 884, 59, 554, 764, 403, 573, 692, 322, 290, 365, 426, 990, 338, 630, 45, 195, 842, 929, 761, 370, 8, 568, 152, 99, 781];
// const input = [23, 1, 134, 324];
// const input = [89, 61, 40, 5, 92, 54, 36, 45, 57, 69, 100, 59, 88, 28, 91, 25, 37, 81, 30, 62, 60, 95, 84, 43, 22, 34, 97, 47, 3, 70, 17, 98, 85, 68, 20, 86, 16, 27, 53, 96, 83, 4, 14, 93, 41, 18, 65, 10, 24, 77, 42, 35]
//const input = [2, 90, 74, 84, 18, 20, 6, 25, 33, 87, 63, 24, 71, 44, 51, 35, 16, 70, 5, 38, 3, 81, 75, 29, 13, 97, 36, 96, 4, 34, 60, 69, 98, 21, 73, 47, 54, 31, 85, 39, 9, 80, 10, 68, 56, 58, 72, 62, 23, 7, 8, 40, 59, 28, 52, 79, 83, 64, 55, 41, 30, 12, 61, 43, 48, 46, 22, 78, 53, 50, 27, 32, 99, 17, 65, 86, 45, 15, 89, 37, 88, 100, 14, 95, 94, 93, 49, 92, 26, 19, 57, 91, 1, 66, 82, 42, 76, 67, 77, 11]
//const input = [21, -13, 5, 30, 27, 7, -49, 32, 35, -10, -21, 23, 22, 10, 9, -5, -41, -43, 50, -1, 25, 34, 41, -2, 42, -29, -39, -33, 20, -34, 12, -19, 18, 28, -18, -8, -3, 24, -46, 45, 13, -9, -25, -45, 44, 46, 38, 2, -36, 16, -16, 43, 3, 33, 36, -6, -44, -48, -11, -20, -22, -31, 17, -47, 47, 29, -37, 31, -23, -17, 49, -15, -38, -24, 48, -26, 14, -27, -7, 1, 0, 40, -35, 15, -40, 8, 39, 6, -32, 19, -30, 37, -42, -14, 11, 26, -4, -12, 4, -50]
const input = [2, 9699, 13872, 2491, 10811, 3312, 17634, 460, 11809, 12397, 18261, 6277, 14530, 14623, 14069, 7987, 8307, 10526, 6671, 6575, 4423, 4449, 1045, 746, 8877, 10920, 16577, 3990, 7014, 1058, 14987, 13312, 8959, 13776, 8517, 6794, 4859, 1288, 11081, 17618, 15674, 12693, 7135, 12091, 13262, 17277, 18567, 8153, 7804, 17992, 3842, 18038, 15606, 18379, 2632, 11194, 868, 4063, 13437, 10600, 14840, 5690, 13448, 14828, 10497, 952, 7301, 14262, 11125, 5612, 738, 3479, 592, 9721, 9890, 9362, 7387, 8007, 16395, 6471, 19504, 4555, 9904, 18279, 6553, 10153, 1164, 2412, 3409, 15786, 12826, 13455, 2365, 3490, 13117, 1757, 15856, 19211, 672, 12142]
const stackA = newStack('a', input);
const stackB = newStack('b', []);

const arr = toArray(stackA).sort((a, b) => a - b);

// console.log("stackA:", toArray(stackA));
// console.log("sorted stackA:", arr);
//console.log("stackA:", toArray(stackA));
//console.log(arr.slice(0,15))
pushChunks(arr, stackA, stackB);
//console.log("stackB:", toArray(stackB));

sendAll(stackB, stackA);

//console.log("A after sorting", toArray(stackA))

module.exports = {
  rotate,
  r_rotate,
  swap,
  send,
  newStack,
  toArray,
  input
}
