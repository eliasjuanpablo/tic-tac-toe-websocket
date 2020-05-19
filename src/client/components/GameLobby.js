import React, { useState } from 'react';
import client from '../socketClient';

import {
  CREATE_GAME,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
  START_GAME,
  GAME_IN_PROGRESS,
  PLAY,
} from '../constants';
import BoardCell from './BoardCell';

const GameLobby = ({ game, player }) => {
  const [gameId, setGameId] = useState('');

  const createGame = () => {
    client.emit(CREATE_GAME, player);
  };

  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };

  const joinGame = (e) => {
    e.preventDefault();
    client.emit(JOIN_GAME, { player, gameId });
  };

  const startGame = () => {
    client.emit(START_GAME, { gameId: game.id });
  };

  return (
    <>
      {!game.status && (
        <>
          <button onClick={createGame}>Create game</button>
          <form onSubmit={joinGame}>
            <input type="text" onChange={handleGameIdChange} value={gameId} />
            <input type="submit" value="Join game" />
          </form>
        </>
      )}
      {game.status === WAITING_FOR_OPPONENT && (
        <>
          <h2>Welcome {player.name}! </h2>
          <h3>Invite a friend by sharing this game's id: {game.id}</h3>
        </>
      )}
      {game.status === GAME_READY && (
        <>
          <h2>Game ready.</h2>
          <p>Players: </p>
          {game.players.map((player) => (
            <p key={player.id}>
              {player.name} - {player.symbol}
            </p>
          ))}
          {player.id === game.hostId && (
            <button onClick={startGame}>Start!</button>
          )}
        </>
      )}
      {game.status === GAME_IN_PROGRESS && (
        <>
          <h1 className="title">Tic tac toe!</h1>
          <div className="board" id="board">
            {game.board.map((cell, index) => (
              <BoardCell
                key={index}
                value={cell}
                handleClick={() => {
                  client.emit(PLAY, {
                    gameId: game.id,
                    playerId: player.id,
                    index,
                  });
                }}
              />
            ))}
          </div>
          <br />

          {game.currentTurn === player.id && <h3>Your turn</h3>}
        </>
      )}
    </>
  );
};

export default GameLobby;
