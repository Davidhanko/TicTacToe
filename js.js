const gameBoard = {
  board: ["", "", "", "", "", "", "", "", ""],
};

const player = (name, symbol) => {
  return { name, symbol };
};

const game = (() => {
  const startGame = () => {
    const player1Name = prompt("Player 1 name: ");
    const player1Symbol = prompt("Player 1 symbol: ");
    const player2Name = prompt("Player 2 name: ");
    const player2Symbol = prompt("Player 2 symbol: ");
    const player1 = player(player1Name, player1Symbol);
    const player2 = player(player2Name, player2Symbol);
  };

  return { startGame };
})();

const displayController = (() => {})();

game.startGame();
