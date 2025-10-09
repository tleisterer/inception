function openTab(evt, tabName) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => (content.style.display = "none"));

  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

async function generateNums(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const numAmount = parseInt(form.get("numAmount"));

  if (isNaN(numAmount)) return;

  let array = Array.from({ length: 5e4 }, (_element, index) => index - 5e4 / 2);

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  array = array.slice(0, numAmount);

  textarea.value = array.join(" ");

  textarea.dispatchEvent(new Event("input"));
}

async function checkInput() {
  const input = document
    .getElementById("operationInput")
    .value.trim()
    .replace(/(?:\s|\n|\t|\r|\v)+/g, " ");

  if (!input) {
    InputError("", false);
    return true;
  }

  const operations = input.split(" ");
  var num = 0;

  for (const op of operations) {
    ++num;
    if (!actions[op]) {
      InputError("invalid operation in line: " + num + ": " + op, true);
      operationError = errorPlane.textContent;
      return false;
    }
  }

  InputError("", false);
  updateElements();

  for (const op of operations) {
    while(speedSlider.value == 0)
      await sleep(100);
    if (actions[op]()) await sleep((1 / speedSlider.value) * 100);
  }
}

async function processInput() {
  if (numberError) return;
  if (!(await checkInput())) return;

  const aChilds = Array.from(stackA.querySelectorAll(".bar"), (element) => {
    return parseInt(element.innerHTML);
  });
  const bChilds = Array.from(stackB.querySelectorAll(".bar"), (element) => {
    return parseInt(element.innerHTML);
  });

  const aSorted = Array.from(aChilds);
  aSorted.sort();

  const isSame = isEqual(aChilds, aSorted);
  if (bChilds.length !== 0 || !isSame) {
    createBanner(false);
    console.log("not sorted");
  } else {
    createBanner(true);
    console.log("sorted");
  }
}
