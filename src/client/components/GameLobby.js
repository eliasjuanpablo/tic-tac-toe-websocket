import React, { useState } from 'react';
import client from '../socketClient';

import {
  CREATE_GAME,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
} from '../../common';

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
          {game.players.map((p) => (
            <p key={p.id}>{p.name}</p>
          ))}
        </>
      )}
    </>
  );
};

export default GameLobby;
