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
