var busy = false;
var submited = true;
var operation = [];
var i = 0;
var pause = true;
var running = false;

async function runOperation(delta) {
  if (delta == 0) return;
  while (busy) await sleep(100);
  busy = true;
  if (i + delta >= operation.length || i + delta < 0) return;
  try {
    var op = operation[delta > 0 ? i++ : --i];
    var func = delta > 0 ? actions[op] : oppositeActions[op];
    return await func();
  } finally {
    busy = false;
  }
}

function checkSorted() {
  const aChilds = Array.from(stackA.querySelectorAll(".bar"), (element) => {
    return parseInt(element.innerHTML);
  });
  const bChilds = Array.from(stackB.querySelectorAll(".bar"), (element) => {
    return parseInt(element.innerHTML);
  });

  const aSorted = Array.from(aChilds);
  aSorted.sort();

  const isSame = isEqual(aChilds, aSorted);
  if (i == operation.length) {
    if (bChilds.length !== 0 || !isSame) {
      createBanner(false);
      console.log("not sorted");
    } else {
      createBanner(true);
      console.log("sorted");
    }
  }
}

async function processInput() {
  console.log("started processing");
  if (numberError) return;
  if (!checkInput()) return;
  if (running) return;
  running = true;

  while (i < operation.length) {
    while (speedSlider.value == 0 && !pause) await sleep(100);
    if (pause) break;
    if (await runOperation(+1)) await sleep((1 / speedSlider.value) * 100);
  }

  if (!pause && i == operation.length && !submited) {
    submited = true;
    pause = true;
    checkSorted();
  }
  running = false;
}

function checkInput() {
  const input = document
    .getElementById("operationInput")
    .value.trim()
    .replace(/(?:\s|\n|\t|\r|\v)+/g, " ");

  if (!input) {
    InputError("", false);
    return true;
  }

  operation = input.split(" ");
  var num = 0;

  for (const op of operation) {
    ++num;
    if (!actions[op]) {
      InputError("invalid operation in line: " + num + ": " + op, true);
      operationError = errorPlane.textContent;
      return false;
    }
  }

  InputError("", false);
  return true;
}

async function step(amount) {
  if (amount == 0) return;

  const sign = Math.sign(amount);
  console.log(sign);
  var count = 0;
  while (i + sign >= 0 && i + sign < operation.length && count != amount) {
    count += sign;
    await runOperation(sign);
  }
}

async function togglePlay() {
  pause = !pause;
  console.log(pause, running);
  if (!pause && !running) {
    playBtn.style.display = "none";
    pauseBtn.style.display = "block";
    if (i == operation.length || i == 0) {
      updateElements();
      submited = false;
      i = 0;
    }
    await processInput();
    return;
  }
  playBtn.style.display = "block";
  pauseBtn.style.display = "none";
}
