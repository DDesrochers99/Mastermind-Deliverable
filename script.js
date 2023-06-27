/*----- constants -----*/
const colors = ["red", "blue", "green", "yellow", "pink", "gray"];
const codeLength = 4;

/*----- state variables -----*/
const randomCode = createRandomCode();
console.log("Random Code", randomCode);
/*----- cached elements  -----*/

/*----- event listeners -----*/

/*----- functions -----*/
function createRandomCode() {
  const code = [];
  while (code.length < codeLength) {
    for (let i = 0; i < codeLength; i++) {
      const index = Math.floor(Math.random() * colors.length);
      const color = colors[index];
      if (!code.includes(color)) {
        code.push(colors[index]);
      }
    }
  }
  return code;
}
