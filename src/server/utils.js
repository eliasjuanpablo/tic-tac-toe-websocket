let games = [];

function addGame(newGame) {
  games = [...games, newGame];
}

function getGameById(gameId) {
  const game = games.find((game) => game.id === gameId) || {};
  return game;
}

function updateGame(gameId, data) {
  const gameIndex = games.findIndex((game) => game.id === gameId);
  const game = games[gameIndex];
  games[gameIndex] = { ...game, ...data };
  return games[gameIndex];
}

function pickRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getGameResult({ board, player }) {
  const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const currentPlayerWon = WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return board[index] === player.symbol;
    });
  });
  const gameOver = board.every((cell) => cell !== null) || currentPlayerWon;

  return { gameOver, currentPlayerWon };
}

module.exports = {
  addGame,
  getGameById,
  updateGame,
  pickRandomElement,
  getGameResult,
};
