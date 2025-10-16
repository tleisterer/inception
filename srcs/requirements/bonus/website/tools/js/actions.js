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
      setBar(stackA.children[index], num, (normalized[index] / max) * 100);
    } else {
      const div = document.createElement("div");
      setBar(div, num, (normalized[index] / max) * 100);
      div.style.height = numbers.length;
      stackA.appendChild(div);
    }
  });
}

async function processNumbers() {
  const input = textarea.value.trim().replace(/(?:\s|\n|\t|\r|\v)+/g, " ");

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
