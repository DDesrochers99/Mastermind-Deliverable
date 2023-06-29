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
const submitButton = document.getElementById("submitButton");
const guessRows = document.querySelectorAll(".playerGuess");
const resetButton = document.getElementById("resetButton");
const messageElement = document.querySelector(".winnerMessage");
/*----- event listeners -----*/
colorArray.forEach((color) => {
  color.addEventListener("click", handleColorSelection);
});

guessCells.forEach((cell) => {
  cell.addEventListener("click", handleDropColor);
});

submitButton.addEventListener("click", checkWinner);

resetButton.addEventListener("click", init);
/*----- functions -----*/

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
  selectedColor = null;
  selectedCell = null;
  randomCode = createRandomCode();
  console.log("Random Code", randomCode);
  render(false);

  guessCells.forEach((cell) => {
    cell.style.backgroundColor = "";
  });

  guessRows.forEach((guessRow) => {
    const resultCells = guessRow.querySelectorAll(".result");
    resultCells.forEach((resultCell) => {
      resultCell.style.backgroundColor = "";
    });
  });
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
}

function handleDropColor(event) {
  if (!selectedColor) {
    return;
  }
  const cell = event.target;
  cell.style.backgroundColor = selectedColor;
}

function checkWinner() {
  let isWinner = false;
  for (let i = 0; i < guessRows.length; i++) {
    const guessRow = guessRows[i];
    const guessCells = Array.from(guessRow.getElementsByClassName("guess"));
    const guess = guessCells.map((cell) => cell.style.backgroundColor);
    const empty = guess.some((color) => color === "");

    if (empty) {
      hasEmptyGuess = true;
      break;
    }

    if (guess.length === codeLength) {
      const result = compareResults(guess, randomCode);
      updateResults(guessRow, result);

      if (result.every((color) => color === "green")) {
        isWinner = true;
        break;
      }
    }
    unMatchedCode = unMatchedCode.filter((color) => !guess.includes(color));
  }
  if (isWinner) {
    messageElement.textContent = "You won!";
  } else if (hasEmptyGuess) {
    messageElement.textContent = "Try again!";
  } else {
    messageElement.textContent = "Better luck next time!";
  }
}

function compareResults(guess, code) {
  let winner = [];
  let unmatchedGuess = guess;

  for (let i = 0; i < codeLength; i++) {
    if (code[i] === unmatchedGuess[i]) {
      winner.push("green");
      unmatchedGuess[i] = "";
    }
  }

  for (let i = 0; i < codeLength; i++) {
    if (unmatchedGuess[i] !== "") {
      const guessColor = unmatchedGuess[i];
      console.log(guessColor);
      if (code.includes(guessColor)) {
        winner.push("yellow");
      } else {
        winner.push("red");
      }
    }
  }

  return winner;
}

function updateResults(guessRow, winner) {
  const resultCells = guessRow.querySelectorAll(".result");

  for (let i = 0; i < codeLength; i++) {
    resultCells[i].style.backgroundColor = winner[i];
  }
}
init();
