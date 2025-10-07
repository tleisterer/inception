var numbers = [];
var normalized = [];
var numberError = false;

function updateElements() {
  const max = Math.max(...normalized);
  InputError("", false);
  numberError = false;

  while (stackB.children.length > 0) stackB.removeChild(stackB.lastChild);
  while (stackA.children.length > numbers.length)
    stackA.removeChild(stackA.lastChild);

  numbers.forEach((num, index) => {
    if (index < stackA.children.length) {
      stackA.children[index].textContent = num;
      stackA.children[index].style.width =
        (normalized[index] / max) * 100 + "%";

      setHeight(stackA.children[index]);
      setColor(stackA.children[index], normalized[index] / max);
    } else {
      const div = document.createElement("div");
      div.className = "bar";
      div.textContent = num;
      div.style.width = (normalized[index] / max) * 100 + "%";
      setHeight(div);
      setColor(div, normalized[index] / max);

      stackA.appendChild(div);
    }
  });
}

processInput.addEventListener("click", async function () {
  const input = document
    .getElementById("operationInput")
    .value.trim()
    .replace(/(?:\s|\n|\t|\r|\v)+/g, " ");

  if (!input || numberError) return;

  const operations = input.split(" ");
  var num = 0;

  for (const op of operations) {
    ++num;
    if (!actions[op]) {
      InputError("invalid operation in line: " + num + ": " + op, true);
      operationError = errorPlane.textContent;
      return;
    }
  }

  InputError("", false);
  for (const op of operations) {
    console.log(stackA, stackB);
    updateElements();
    if (actions[op]()) await sleep(500);
  }
  const aChilds = Array.from(stackA.querySelectorAll(".bar"), (element) => {
    return parseInt(element.innerHTML);
  });
  const bChilds = Array.from(stackB.querySelectorAll(".bar"), (element) => {
    return parseInt(element.innerHTML);
  });

  const aSorted = Array.from(aChilds);
  aSorted.sort();

  console.log(aChilds, bChilds);
  const isSame = isEqual(aChilds, aSorted);
  if (bChilds.length !== 0 || !isSame) {
    console.log("not sorted");
  } else {
    console.log("sorted");
  }
});

async function processNumbers(event) {
  const input = event.target.value.trim().replace(/(?:\s|\n|\t|\r|\v)+/g, " ");

  if (!input) {
    numbers = [];
    updateElements();
    return;
  }

  if (!/^[\+\-]?\d+(?: [\+\-]?\d+)*$/.test(input)) {
    InputError("Invalid number input", true);
    numberError = true;
    return;
  }

  numbers = input.match(/[\+\-]?\d+/g).map(Number);
  if (new Set(numbers).size !== numbers.length) {
    InputError("Duplicate numbers", true);
    numberError = true;
    return;
  }

  const sorted = Array.from(new Set(numbers)).sort((a, b) => a - b);
  normalized = numbers.map((num) => sorted.indexOf(num) + 1);
  updateElements();
}
