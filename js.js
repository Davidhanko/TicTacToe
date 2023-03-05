//Code could be formated better. AI can be adjusted to also focus on winning, and not just blocking.
//Create game manager

//Game Manager
class GameManager {
  constructor() {
    this.players = [];
  }

  //Start game
  startGame() {
    //Create game logic
    this.gameLogic = new GameLogic();

    //Create game board
    this.gameBoard = new GameBoard();

    //Create player 1 and get his name and symbol
    let name = document.getElementById("player1Name").value;
    let symbol = document.getElementById("player1Symbol").value;

    let player1 = new Player(name, symbol);
    this.addPlayer(player1);

    //Check if we should play with AI or not
    let ai = document.getElementById("buttonForEnablingAI").checked;

    if (ai) {
      //Create AI
      let ai = new AI("AI", "O");
      this.addPlayer(ai);
    } else {
      //Create player 2 and get his name and symbol
      let name = document.getElementById("player2Name").value;
      let symbol = document.getElementById("player2Symbol").value;

      let player2 = new Player(name, symbol);
      this.addPlayer(player2);
    }

    //Hide start game menu
    document.getElementById("infoPopup").style.display = "none";
  }
  addPlayer(player) {
    this.players.push(player);
  }
  getPlayers() {
    return this.players;
  }

  //Get game board
  getGameBoard() {
    return this.gameBoard;
  }

  //Get game logic
  getGameLogic() {
    return this.gameLogic;
  }

  //Reset game
  resetGame() {
    this.gameBoard.resetGame();
    this.gameLogic.resetGame();
  }

  //Game over
  gameOver(winner) {
    //Show game over menu
    document.getElementById("winnerAnnouncement").textContent = "";

    //Set winner text
    document.getElementById("winnerAnnouncement").textContent =
      winner.getName() + " won!";
  }
}

//Game Logic
class GameLogic {
  constructor() {
    //Current player index
    this.currentPlayer = 0;

    //Game over
    this.gameOver = false;
  }

  //Handle turn
  handleTurn(i, j) {
    //Check if game is over
    if (this.gameOver) {
      return;
    }

    //Get current player
    let currentPlayer = gameManager.getPlayers()[this.currentPlayer];

    //Get cell
    let cell = gameManager.getGameBoard().getCell(i, j);

    //Set symbol on cell
    cell.setSymbol(currentPlayer.getSymbol());

    //Set cell text to symbol
    cell.cellElement.innerHTML = currentPlayer.getSymbol();

    //Check if game is over
    this.checkIfCanWin();

    //Check if game is over
    if (!this.gameOver) {
      //Change player
      this.changePlayer();
    }
  }

  //On click event
  onClick(cell) {
    //Check if cell is empty
    if (cell.symbol == null) {
      this.handleTurn(cell.i, cell.j);
    }
  }

  changePlayer() {
    //Change player
    this.currentPlayer = this.currentPlayer === 0 ? 1 : 0;
  }

  //Reset game
  resetGame() {
    this.winner = null;
    this.gameOver = false;
    this.currentPlayer = 0;

    //Reset game end text
    document.getElementById("winnerAnnouncement").textContent = "";
  }

  //Check if game is over
  checkIfCanWin() {
    //Check if there is a three in a row
    for (let i = 0; i < 3; i++) {
      //Check if there is a three in a row on a row
      let row = gameManager.getGameBoard().board[i];
      if (
        row[0].symbol != null &&
        row[0].symbol === row[1].symbol &&
        row[0].symbol === row[2].symbol
      ) {
        this.winner = gameManager.getPlayers()[this.currentPlayer];
        this.gameOver = true;
        gameManager.gameOver(this.winner);
      }

      //Check if there is a three in a row on a column
      let column = [
        gameManager.getGameBoard().board[0][i],
        gameManager.getGameBoard().board[1][i],
        gameManager.getGameBoard().board[2][i],
      ];
      if (
        column[0].symbol != null &&
        column[0].symbol === column[1].symbol &&
        column[0].symbol === column[2].symbol
      ) {
        this.winner = gameManager.getPlayers()[this.currentPlayer];
        this.gameOver = true;
        gameManager.gameOver(this.winner);
      }

      //Check if there is a three in a row on a diagonal
      let diagonal = [
        gameManager.getGameBoard().board[0][0],
        gameManager.getGameBoard().board[1][1],
        gameManager.getGameBoard().board[2][2],
      ];
      if (
        diagonal[0].symbol != null &&
        diagonal[0].symbol === diagonal[1].symbol &&
        diagonal[0].symbol === diagonal[2].symbol
      ) {
        this.winner = gameManager.getPlayers()[this.currentPlayer];
        this.gameOver = true;
        gameManager.gameOver(this.winner);
      }

      //Check if there is a three in a row on a diagonal
      let diagonal2 = [
        gameManager.getGameBoard().board[0][2],
        gameManager.getGameBoard().board[1][1],
        gameManager.getGameBoard().board[2][0],
      ];
      if (
        diagonal2[0].symbol != null &&
        diagonal2[0].symbol === diagonal2[1].symbol &&
        diagonal2[0].symbol === diagonal2[2].symbol
      ) {
        this.winner = gameManager.getPlayers()[this.currentPlayer];
        this.gameOver = true;
        gameManager.gameOver(this.winner);
      }
    }
  }
}

//Class for game board
class GameBoard {
  constructor() {
    //Create board from cells with for loop
    this.board = [];

    for (let i = 0; i < 3; i++) {
      this.board[i] = [];
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = new BoardCell(i, j);
      }
    }
  }

  //Get Cell by position
  getCell(i, j) {
    return this.board[i][j];
  }

  //Reset game
  resetGame() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j].setSymbol(null);
        this.board[i][j].cellElement.innerHTML = "";
      }
    }
  }
}

//Class for board cell
class BoardCell {
  constructor(i, j) {
    this.i = i;
    this.j = j;

    //Symbol on cell
    this.symbol = null;

    //Create cell element
    this.cellElement = document.createElement("div");

    //Set cell element class
    this.cellElement.className = "boardFile";

    //Set cell element id
    this.cellElement.id = "cell" + i + j;

    //Append cell element to game board
    document.getElementById("gameBoard").appendChild(this.cellElement);

    //Bind to click event
    this.cellElement.addEventListener(
      "click",
      gameManager.getGameLogic().onClick.bind(gameManager.getGameLogic(), this)
    );
  }
  getI() {
    return this.i;
  }
  getJ() {
    return this.j;
  }

  //Set symbol on cell
  setSymbol(symbol) {
    this.symbol = symbol;
  }
}

//Base class for game user
class Controller {
  constructor(name, symbol) {
    this.name = name;
    this.symbol = symbol;
  }

  getName() {
    return this.name;
  }

  getSymbol() {
    return this.symbol;
  }

  //Handle player turn
  handleTurn() {}
}

//Class for player which derives from game user
class Player extends Controller {
  constructor(name, symbol) {
    super(name, symbol);

    //Bind to click event
    document
      .getElementById("gameBoard")
      .addEventListener("click", this.handleTurn.bind(this));
  }
}

//Class for AI which derives from game user
class AI extends Controller {
  constructor(name, symbol) {
    super(name, symbol);
  }

  startAI() {}

  //Handle AI turn
  handleAITurn() {}
}

let gameManager = new GameManager();
