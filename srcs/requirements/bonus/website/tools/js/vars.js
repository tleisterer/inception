const html = document.documentElement;

const stackA = document.getElementById("right-stack");
const stackB = document.getElementById("left-stack");
var bars = document.getElementsByClassName("bar");
const errorPlane = document.getElementById("errorPlane");

const textarea = document.getElementById("numberInput");

const actions = {
  pa: () => push(stackA, stackB),
  pb: () => push(stackB, stackA),
  ra: () => rotate(stackA),
  rb: () => rotate(stackB),
  rr: () => both(rotate),
  rra: () => reverseRotate(stackA),
  rrb: () => reverseRotate(stackB),
  rrr: () => both(reverseRotate),
  sa: () => swap(stackA),
  sb: () => swap(stackB),
  ss: () => both(swap),
};

const oppositeActions = {
  pa: () => push(stackB, stackA),
  pb: () => push(stackA, stackB),
  ra: () => reverseRotate(stackA),
  rb: () => reverseRotate(stackB),
  rr: () => both(reverseRotate),
  rra: () => rotate(stackA),
  rrb: () => rotate(stackB),
  rrr: () => both(rotate),
  sa: () => swap(stackA),
  sb: () => swap(stackB),
  ss: () => both(swap),
};

document.querySelectorAll(".op-button").forEach((container) => {
  mouseKeyEventRepeat(container, actions[container.id]);
});

document.querySelectorAll(".number-input").forEach((container) => {
  const input = container.querySelector("input");
  const btnUp = container.querySelector(".up");
  const btnDwn = container.querySelector(".down");

  [btnUp, btnDwn].forEach((element, index) => {
    let func = index == 1 ? () => input.stepDown() : () => input.stepUp();
    mouseKeyEventRepeat(element, func, false);
  });
});

document.querySelectorAll('input[type="range"]').forEach((container) => {
  const setProgress = (slider) => {
    const min = slider.min == "" ? 0 : slider.min;
    const max = slider.max == "" ? 100 : slider.max;
    const progress = ((slider.value - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--slider-progress) ${progress}%, var(--slider-bg) ${progress}% 100%)`;
  };

  setProgress(container);
  container.addEventListener("input", (e) => {
    setProgress(e.target);
  });
});

window.addEventListener("resize", () => {
  for (bar of bars) {
    setSize(bar);
  }
});

textarea.addEventListener("input", processNumbers);

const speedSlider = document.getElementById("speed");
const speedLabel = document.querySelector('label[for="speed"]');
speedSlider.addEventListener("change", () => {
  speedLabel.innerHTML = speedSlider.value + " op/sec";
});

const stepBack = document.getElementById("step-back");
const stepForward = document.getElementById("step-forward");
const playPause = document.getElementById("play-pause");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
mouseKeyEvent(playPause, togglePlay);

[stepBack, stepForward].forEach((element, index) => {
  let func = () => startStep(index == 1 ? () => step(+1) : () => step(-1));
  mouseKeyEventRepeat(element, func);
});
