// Events
const CREATE_GAME = 'CreateGame';
const SYNC_GAME = 'SyncGame';
const SYNC_PLAYER = 'AssignPlayerId';
const JOIN_GAME = 'JoinGame';
const CREATE_PLAYER = 'CreatePlayer';
const START_GAME = 'StartGame';
const PLAY = 'Play';

// Game Status
const WAITING_FOR_OPPONENT = 'WaitingForOpponent';
const GAME_READY = 'GameReady';
const GAME_IN_PROGRESS = 'InProgress';
const GAME_OVER = 'GameOver';

module.exports = {
  CREATE_GAME,
  SYNC_GAME,
  SYNC_PLAYER,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
  CREATE_PLAYER,
  START_GAME,
  GAME_IN_PROGRESS,
  PLAY,
  GAME_OVER,
};
