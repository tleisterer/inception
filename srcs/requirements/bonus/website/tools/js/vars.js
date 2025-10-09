const stackA = document.getElementById("right-stack");
const stackB = document.getElementById("left-stack");

const processInputBtn = document.getElementById("processInput");
const textarea = document.getElementById("numberInput");
const errorPlane = document.getElementById("errorPlane");
const speedSlider = document.getElementById("speed");

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

document.querySelectorAll(".op-button").forEach((container) => {
  container.addEventListener("click", () => actions[container.id]?.());

  container.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      actions[container.id]?.();
    }
  });
});

document.querySelectorAll(".number-input").forEach((container) => {
  const input = container.querySelector("input");
  const btnUp = container.querySelector(".up");
  const btnDwn = container.querySelector(".down");

  let interval;

  const startStep = (stepFunc) => {
    stepFunc();
    interval = setTimeout(() => (interval = setInterval(stepFunc, 80)), 200);
  };

  const stopStep = () => {
    clearInterval(interval);
  };

  [btnUp, btnDwn].forEach((element, index) => {
    element.addEventListener("mouseup", stopStep);
    element.addEventListener("mouseleave", stopStep);

    let func = index == 1 ? () => input.stepDown() : () => input.stepUp();

    element.addEventListener("mousedown", () => startStep(func));
    element.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") func();
    });
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

processInputBtn.addEventListener("click", processInput);
processInputBtn.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    processInput;
  }
});

textarea.addEventListener("input", processNumbers);
