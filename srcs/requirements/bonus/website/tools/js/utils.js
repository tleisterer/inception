function InputError(msg, show) {
  if (!show) {
    errorPlane.style.visibility = "hidden";
    return;
  }

  errorPlane.textContent = msg;
  errorPlane.style.visibility = "visible";
}

function setHeight(element) {
  const containerHeight = stackA.clientHeight;
  const gap = 1;
  let h = (containerHeight - gap * (numbers.length - 1)) / numbers.length;
  if (h < 10) h = 10;
  element.style.height = h + "px";
  if (h < 20) {
    element.style.fontSize = "0";
  } else element.style.removeProperty("font-size");
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
  return arrayA.every((element, index) => {element === arrayB[index]})
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
