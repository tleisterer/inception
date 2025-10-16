function InputError(msg, show) {
  if (!show) {
    errorPlane.style.visibility = "hidden";
    return;
  }

  errorPlane.textContent = msg;
  errorPlane.style.visibility = "visible";
}

function setSize(element) {
  const containerHeight = stackA.clientHeight;
  const gap = parseInt(window.getComputedStyle(stackA).gap);
  let h = (containerHeight - gap * (numbers.length - 1)) / numbers.length;
  element.style.height = h + "px";
  if (h < 20) {
    element.style.fontSize = "0";
  } else {
    element.style.removeProperty("font-size");
  }
}

// color lerb between yellow and red
function setColor(element, percent) {
  let darken = 0.06;
  let colorA = [255, 255, 0];
  let colorB = [255, 0, 0];
  const r = Math.round(
    (colorA[0] + (colorB[0] - colorA[0]) * percent) * (1 - darken)
  );
  const g = Math.round(
    (colorA[1] + (colorB[1] - colorA[1]) * percent) * (1 - darken)
  );
  const b = Math.round(
    (colorA[2] + (colorB[2] - colorA[2]) * percent) * (1 - darken)
  );
  element.style.backgroundColor = `rgb(${r},${g},${b})`;
}

function isEqual(arrayA, arrayB) {
  if (arrayA.length != arrayB.length) {
    console.log("length");
    return false;
  }
  console.log(arrayA, arrayB);
  return arrayA.every((element, index) => {
    return element == arrayB[index];
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function setBar(div, text, sizePercent) {
  div.className = "bar";
  div.textContent = text;
  div.style.width = sizePercent + "%";
  setSize(div);
  setColor(div, sizePercent / 100);
}

let interval;

function startStep(stepFunc) {
  stopStep();
  stepFunc();
  interval = setTimeout(() => (interval = setInterval(stepFunc, 80)), 200);
}

function stopStep() {
  clearInterval(interval);
}

function mouseKeyEvent(
  element,
  func,
  mouseEvent = "click",
  preventDefault = true
) {
  element.addEventListener(mouseEvent, func);
  element.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      if (preventDefault) e.preventDefault();
      func();
    }
  });
}

function mouseKeyEventRepeat(element, func, preventDefault = true) {
  element.addEventListener("mouseup", stopStep);
  element.addEventListener("mouseleave", stopStep);
  element.addEventListener("keyup", (e) => {
    if (e.key === "Enter" || e.key === " ") stopStep();
  });
  mouseKeyEvent(element, () => startStep(func), "mousedown", preventDefault);
}
