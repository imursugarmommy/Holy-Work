const playCourt = document.querySelector('.wrapper');
const bigFields = document.querySelectorAll('.wrapper > *');
const fields = document.querySelectorAll('.big-box > *');
let moves = 0;
let playerTurn = 'X';
const playerTurnHTML = document.querySelector('.turn');
let isGameOver = false;
let draw = false;
let p1Count = 0;
let p2Count = 0;
const p1CountHTML = document.querySelectorAll('.p1');
const p2CountHTML = document.querySelectorAll('.p2');

// let placedMoves = ['', '', '', '', '', '', '', '', ''];

let placeableMoves = [
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', '', ''],
];

const winningOptions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [3, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const statusText = document.querySelector('.win-info');
const popup = document.querySelector('.popup');
const restartBtn = document.querySelector('.restart');

const c = document.getElementById('stroke');
const ctx = c.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

playerTurnHTML.innerHTML = `${playerTurn}'s Turn`;

gameStart();

function gameStart() {
  bigFields.forEach((bigField) => {
    bigField.addEventListener('click', (e) => {
      // adding class 'clicked' so when clicked they can't click anywhere else unless moved
      const bigCellIndex = e.target.parentNode.getAttribute('bigCellIndex');
      const cellIndex = e.target.getAttribute('cellIndex');
      const clicked = e.target;

      clicked.classList.add('clicked');

      if (cellIndex != null) {
        if (isGameOver) {
          return;
        }

        // ! overwriting fix
        if (clicked.innerText !== '') {
          return;
        }
        e.target.innerText = playerTurn;

        const currentPlacedMovesLocation = placeableMoves[bigCellIndex];

        currentPlacedMovesLocation.splice(cellIndex, 1, playerTurn);

        for (let i = 0; i < placeableMoves.length; i++) {
          const placedMove = placeableMoves[i];
          const winnerField = e.target;
          checkWinner(placedMove, winnerField);
        }

        // ? bug: trotz schon voll besetztem Felde clicked-class weitergegeben an gross-grid index
        clicked.parentNode.classList.remove('clicked');
        clicked.classList.remove('clicked');
        bigFields[cellIndex].classList.add('clicked');

        changePlayer();
      }

      bigFields.forEach((court) => {
        if (!court.classList.contains('clicked')) {
          court.style.pointerEvents = 'none';
        }
      });
    });
  });
}

function checkWinner(move, winner) {
  let roundWon = false;

  for (let i = 0; i < winningOptions.length; i++) {
    const conditions = winningOptions[i];

    // if (!move[i].includes('')) {
    //   draw = true;
    //   continue;
    // }

    const cellA = move[conditions[0]];
    const cellB = move[conditions[1]];
    const cellC = move[conditions[2]];

    if (cellA === cellB && cellB === cellC && cellA !== '') {
      // console.log(fields[conditions[0]]);

      const bigCellIndexSetWinner =
        winner.parentNode.getAttribute('bigCellIndex');

      const winningBigField = bigFields[bigCellIndexSetWinner];
      const winningFieldArray = winningBigField.getElementsByTagName('div');

      const winningfield1 = winningFieldArray[conditions[0]];
      const winningfield2 = winningFieldArray[conditions[1]];
      const winningfield3 = winningFieldArray[conditions[2]];

      // console.log(bigFields[bigCellIndexSetWinner]);
      // bigFields[bigCellIndexSetWinner].classList.add('won');
      // bigFields[bigCellIndexSetWinner].classList.add(`${playerTurn}`);

      // ! fix, dass in allen feldern die winnerfields von einem Feld angezeigt werden
      if (winningfield1.innerText === 'X' || winningfield1.innerText === 'O') {
        if (
          winningfield2.innerText === 'X' ||
          winningfield2.innerText === 'O'
        ) {
          if (
            winningfield3.innerText === 'X' ||
            winningfield3.innerText === 'O'
          ) {
            winningfield1.style.background = 'var(--highlight)';
            winningfield2.style.background = 'var(--highlight)';
            winningfield3.style.background = 'var(--highlight)';
          }
        }
      }

      // checkBigGridWinner();

      const centerA = getCenterPosition(winningfield1);
      const centerB = getCenterPosition(winningfield3);
      let centerPositions = [centerA, centerB];

      // c.style.zIndex = '2';
      // ctx.beginPath();
      // ctx.moveTo(centerA.x, centerA.y);
      // ctx.lineTo(centerB.x, centerB.y);
      // ctx.lineWidth = 2;
      // ctx.strokeStyle = '#606060';
      // ctx.stroke();

      break;
    }

    if (roundWon) {
      break;
    }
  }

  if (draw) {
    statusText.innerText = "It's a draw!";
  }

  if (roundWon) {
    isGameOver = true;
    statusText.innerText = `${playerTurn} wins!`;

    changePlayer();

    p1CountHTML.forEach((count) => {
      count.innerHTML = p1Count;
    });
    p2CountHTML.forEach((count) => {
      count.innerHTML = p2Count;
    });
  }

  if (isGameOver) {
    popup.style.display = 'flex';
    restartBtn.style.display = 'block';
  }
}

restartBtn.addEventListener('click', () => {
  moves = 0;
  playerTurn = 'X';
  isGameOver = false;
  draw = false;
  fields.forEach((field) => {
    field.innerText = '';

    // resets highlight onclick
    field.style.background = 'none';
  });
  popup.style.display = 'none';
  restartBtn.style.display = 'none';
  // placedMoves = ['', '', '', '', '', '', '', '', ''];

  c.style.zIndex = '-1';
  ctx.clearRect(0, 0, c.width, c.height);

  playerTurnHTML.innerHTML = `${playerTurn}'s Turn`;

  gameStart();
});

function getCenterPosition(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  return { x: centerX, y: centerY };
}

function changePlayer() {
  if (playerTurn === 'X') {
    playerTurn = 'O';
  } else if (playerTurn === 'O') {
    playerTurn = 'X';
  }
  playerTurnHTML.innerHTML = `${playerTurn}'s Turn`;
}
