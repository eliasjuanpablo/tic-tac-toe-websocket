// Events
const CREATE_GAME = 'CreateGame';
const SYNC_GAME = 'SyncGame';
const ASSIGN_PLAYER_DATA = 'AssignPlayerId';
const JOIN_GAME = 'JoinGame';
const CREATE_PLAYER = 'CreatePlayer';
const START_GAME = 'StartGame';

// Game Status
const WAITING_FOR_OPPONENT = 'WaitingForOpponent';
const GAME_READY = 'GameReady';
const GAME_IN_PROGRESS = 'InProgress';

module.exports = {
  CREATE_GAME,
  SYNC_GAME,
  ASSIGN_PLAYER_DATA,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
  CREATE_PLAYER,
  START_GAME,
  GAME_IN_PROGRESS,
};
