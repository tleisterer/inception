function openTab(evt, tabName) {
  const contents = document.querySelectorAll(".tab-content");
  contents.forEach((content) => (content.style.display = "none"));

  const buttons = document.querySelectorAll(".tab-button");
  buttons.forEach((btn) => btn.classList.remove("active"));

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.classList.add("active");
}

function generateNums(event) {
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
