// <div class="banner">
// 	<svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 16 16" style="display: none;" width="3em" height="3em">
// 		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
// 	</svg>
// 	<svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 16 16" style="display: flex;" width="3em" height="3em">
// 		<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
// 	</svg>
// </div>

function createBanner(sorted) {
  const banner = document.createElement("div");
  banner.className = "banner";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 16 16");
  svg.setAttribute("width", "3em");
  svg.setAttribute("height", "3em");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  const text = document.createElement("div");

  if (sorted) {
    svg.setAttribute("fill", "green");
    path.setAttribute(
      "d",
      "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
    );
    text.textContent = "Successfully sorted";
  } else {
    svg.setAttribute("fill", "red");
    path.setAttribute(
      "d",
      "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"
    );
    text.textContent = "Not sorted";
  }
  text.style.justifySelf = "center";
  svg.appendChild(path);
  banner.appendChild(svg);
  banner.appendChild(text);

  banner.onmousedown = () => banner.remove();
  banner.style.top = "-100%";
  document.querySelector("main").appendChild(banner);

  setTimeout(() => {
    banner.style.top = "0";
  }, 10);
  setTimeout(() => banner.remove(), 5000);
}
