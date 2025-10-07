const stackA = document.getElementById("right-stack");
const stackB = document.getElementById("left-stack");

const operationButtons = document.getElementsByClassName("op-button");
const processInput = document.getElementById("processInput");
const textarea = document.getElementById("numberInput");
const errorPlane = document.getElementById("errorPlane");

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

for (const button of operationButtons) {
  button.addEventListener("click", function () {
    console.log(button.id);
    actions[button.id]?.();
  });
}

document.querySelectorAll(".number-input").forEach((container) => {
  const input = container.querySelector("input");
  const btnUp = container.querySelector(".up");
  const btnDwn = container.querySelector(".down");

  let interval;

  const startStep = (stepFunc) => {
    stepFunc();
    interval = setTimeout(() => {
      interval = setInterval(stepFunc, 80);
    }, 200);
  };

  const stopStep = () => {
    clearInterval(interval);
  };

  btnUp.addEventListener("mousedown", () => startStep(() => input.stepUp()));
  btnDwn.addEventListener("mousedown", () => startStep(() => input.stepDown()));

  btnUp.addEventListener("mouseup", stopStep);
  btnDwn.addEventListener("mouseup", stopStep);
  btnUp.addEventListener("mouseleave", stopStep);
  btnDwn.addEventListener("mouseleave", stopStep);
});


textarea.addEventListener("input", processNumbers);
