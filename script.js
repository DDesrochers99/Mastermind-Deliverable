/*----- constants -----*/
const colors = ["red", "blue", "green", "yellow", "pink", "gray"];
const codeLength = 4;

/*----- state variables -----*/
let randomCode;
// randomCode = ["red", "blue", "green", "yellow"];
/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/

randomCode = createRandomCode();
console.log("Random Code", randomCode);

render();

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

function render() {
  const hideCode = document.querySelectorAll(`.hiddenCode .hide`);
  for (let i = 0; i < codeLength; i++) {
    hideCode[i].style.backgroundColor = randomCode[i];
  }
  const playerGuess = document.querySelectorAll(`.playerGuess`);
  for (let i = 0; i < playerGuess.length; i++) {
    const guessBox = playerGuess[i].querySelectorAll(`.guess`);
    const resultBox = playerGuess[i].querySelectorAll(`.result`);
    for (let j = 0; j < codeLength; j++) {
      guessBox[j].style.backgroundColor = `eggshell`;
      resultBox[j].style.backgroundColor = `black`;
    }
  }
}
