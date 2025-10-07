function push(firstStack, secondStack) {
  const B = secondStack.firstElementChild;
  if (!B) return false;

  firstStack.prepend(B);
  return true;
}

function rotate(stack) {
  const A = stack.firstElementChild;
  if (!A) return false;

  stack.append(A);
  return true;
}

function reverseRotate(stack) {
  const A = stack.lastElementChild;
  if (!A) return false;

  stack.prepend(A);
  return true;
}

function swap(stack) {
  const first = stack.firstElementChild;
  if (!first) return false;
  const second = stack.firstElementChild.nextElementSibling;
  if (!second) return false;

  stack.prepend(second);
  return true;
}

function both(operation) {
  return operation(stackA) || operation(stackB);
}
