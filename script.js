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
let submitButton;
let matchedGuess = [];
let unMatchedCode = [...colors];

/*----- cached elements  -----*/

const colorArray = Array.from(
  document.querySelectorAll("#colorBox .colorChoice")
);
const guessCells = Array.from(
  document.querySelectorAll(".playerGuess > .guess")
);
const resultCells = Array.from(
  document.querySelectorAll(".playerGuess + .result")
);
submitButton = document.getElementById("submitButton");
const guessRows = document.querySelectorAll(".playerGuess");

/*----- event listeners -----*/
colorArray.forEach((color) => {
  color.addEventListener("click", handleColorSelection);
});

guessCells.forEach((cell) => {
  cell.addEventListener("click", handleDropColor);
});

submitButton.addEventListener("click", checkWinner);
/*----- functions -----*/

randomCode = createRandomCode();
console.log("Random Code", randomCode);

render();

function render(revealCode) {
  const hideCode = document.querySelectorAll(".hiddenCode .hide");
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

function checkWinner() {
  for (let i = 0; i < guessRows.length; i++) {
    const guessRow = guessRows[i];
    const guessCells = Array.from(guessRow.getElementsByClassName(`guess`));
    const guess = guessCells.map((cell) => cell.style.backgroundColor);
    console.log("Guess:", guess);
    const empty = guess.some((color) => color === "");
    if (empty) {
      return;
    }
    if (guess.length === codeLength) {
      const result = compareResults(guess, randomCode);
      updateResults(guessRow, result);

      if (result.every((color) => color === "green")) {
        return;
      }
    }
    unMatchedCode = unMatchedCode.filter((color) => !guess.includes(color));
  }
}
function updateResults(guessRow, winner) {
  const resultCells = guessRow.querySelectorAll(".result");
  for (let i = 0; i < codeLength; i++) {
    resultCells[i].style.backgroundColor = winner[i];
  }
}

function compareResults(guess, code) {
  let winner = [];
  let unmatchedGuess = guess.slice();
  let codeCopy = code.slice();

  for (let i = 0; i < codeLength; i++) {
    if (guess[i] === code[i]) {
      winner.push("green");
      unmatchedGuess[i] = null;
      codeCopy[i] = null;
    }
  }

  for (let i = 0; i < codeLength; i++) {
    if (unmatchedGuess[i] !== null) {
      const colorIndex = codeCopy.indexOf(unmatchedGuess[i]);
      if (colorIndex !== -1) {
        winner.push("yellow");
        codeCopy[colorIndex] = null;
      }
    }
  }

  while (winner.length < codeLength) {
    winner.push("red");
  }

  return winner;
}
init();
