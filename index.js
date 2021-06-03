const ops = require('./stack');
const data = require('./data');

const pushTopOffset = (stackSrc, stackDst, value) => {

  while (stackSrc.top.value != value) {
    if (stackSrc.top.prev && value == stackSrc.top?.prev?.value && stackSrc.label == 'b')
        ops.swap(stackSrc);
    else
      ops.rotate(stackSrc);
  }

  ops.send(stackSrc, stackDst);
};

const pushBottomOffset = (stackSrc, stackDst, value) => {
  while (stackSrc.top.value != value) {
    ops.r_rotate(stackSrc);
  }

  ops.send(stackSrc, stackDst);
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
      holdTop = ops.getIndexValue(stackA, lengthA);
      if (chunk.includes(holdTop[1])) {
        break;
      }
    }
    let i = 0;
    while (i < stackA.length) {
      holdBottom = ops.getIndexValue(stackA, i);
      if (chunk.includes(holdBottom[1])) {
        break;
      }
      i++;
    }
    if (ops.topOffset(stackA.length, holdTop[0]) <= ops.bottomOffset(holdBottom[0])) {
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
const stackA = ops.newStack('a', data.input);
const stackB = ops.newStack('b', []);

const arr = ops.toArray(stackA).sort((a, b) => a - b);

// console.log("stackA:", toArray(stackA));
// console.log("sorted stackA:", arr);
//console.log("stackA:", toArray(stackA));
//console.log(arr.slice(0,15))
pushChunks(arr, stackA, stackB);
//console.log("stackB:", toArray(stackB));

sendAll(stackB, stackA);

//console.log("A after sorting", toArray(stackA))
