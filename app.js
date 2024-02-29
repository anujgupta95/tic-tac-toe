let boxes = document.querySelectorAll(".box");
let resetBtns = document.querySelectorAll(".resetBtn");
let header = document.querySelector(".header");
let winnerMsg = document.querySelector(".winnerMsg");

let winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let turn = false; //false = 0
let count = 0;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn) {
      box.innerText = "X";
    } else {
      box.innerText = "O";
    }
    turn = !turn;
    box.disabled = true;
    count += 1;
    checkWin();
  });
});

resetBtns.forEach((resetBtn) => {
  resetBtn.addEventListener("click", resetGame);
});

function resetGame() {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
    turn = false;
  });
  header.classList.add("hide");
  count = 0;
}

function checkWin() {
  for (let winPattern of winPatterns) {
    let first = boxes[winPattern[0]].innerText;
    let second = boxes[winPattern[1]].innerText;
    let third = boxes[winPattern[2]].innerText;

    if (first !== "" && second !== "" && third !== "") {
      if (first === second && second === third) {
        declareWin(boxes[winPattern[0]].innerText);
        return;
      } else if (count == 9) {
        declareWin("Match Draw");
      }
    }
  }
}

function declareWin(winner) {
  header.classList.remove("hide");
  if (winner != "Match Draw") {
    winnerMsg.innerText = "Congratulations! Winner is " + winner;
    for (let box in boxes) {
      box.disabled = true;
    }
  } else {
    winnerMsg.innerText = winner;
  }
}
