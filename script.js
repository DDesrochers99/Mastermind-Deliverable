/*----- constants -----*/
const colors = [
  "rgb(244, 67, 54)",
  "rgb(33, 150, 243)",
  "rgb(76, 175, 80)",
  "rgb(255, 235, 59)",
  "rgb(233, 30, 99)",
  "rgb(158, 158, 158)",
];
const codeLength = 4;

/*----- state variables -----*/
let randomCode;
let selectedColor;
let selectedCell;
let submitButtomn;
/*----- cached elements  -----*/
const colorArray = Array.from(
  document.querySelectorAll("#colorBox .colorChoice")
);
const guessCells = Array.from(document.querySelectorAll(".playerGuess .guess"));
const resultCells = Array.from(
  document.querySelectorAll(".playerGuess .result")
);
/*----- event listeners -----*/
colorArray.forEach((color) => {
  color.addEventListener("click", handleColorSelection);
});

guessCells.forEach((cell) => {
  cell.addEventListener("click", handleDropColor);
});

submitButtomn.addEventListener("click", getWinner);
/*----- functions -----*/

randomCode = createRandomCode();
console.log("Random Code", randomCode);

render();

function render(revealCode) {
  const hideCode = document.querySelectorAll(`.hiddenCode .hide`);
  for (let i = 0; i < codeLength; i++) {
    if (revealCode) {
      hideCode[i].style.backgroundColor = randomCode[i];
    } else {
      hideCode[i].style.backgroundColor = "black";
    }
  }
}

function init() {
  randomCode = createRandomCode();
  selectedColor = null;
  selectedCell = null;
  render(false);
}

function createRandomCode() {
  const code = [];
  while (code.length < codeLength) {
    const index = Math.floor(Math.random() * colors.length);
    const color = colors[index];
    if (!code.includes(color)) {
      code.push(color);
    }
  }
  return code;
}

function getHiddenCode(hiddenCode) {
  const code = [];
  for (let i = 0; i < codeLength; i++) {
    code.push(hiddenCode[i].style.backgroundColor);
  }
  return code;
}

function handleColorSelection(event) {
  const computedStyle = window.getComputedStyle(event.target);
  selectedColor = computedStyle.backgroundColor;
  console.log("Selected Color:", selectedColor);
}

function handleDropColor(event) {
  if (!selectedColor) {
    return;
  }
  const cell = event.target;
  cell.style.backgroundColor = selectedColor;
}

init();
