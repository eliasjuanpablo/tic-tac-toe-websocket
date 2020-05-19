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

module.exports = {
  addGame,
  getGameById,
  updateGame,
  pickRandomElement,
};
