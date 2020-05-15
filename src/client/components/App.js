import React, { useState, useEffect } from 'react';
import client from '../socketClient';

import {
  CREATE_GAME,
  SYNC_GAME,
  ASSIGN_PLAYER_ID,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
} from '../../common';

const App = () => {
  const [game, setGame] = useState({});
  const [playerId, setPlayerId] = useState('');
  const [gameId, setGameId] = useState('');

  useEffect(() => {
    client.on(SYNC_GAME, (data) => {
      setGame(data);
    });

    client.on(ASSIGN_PLAYER_ID, (id) => {
      setPlayerId(id);
    });
  }, []);

  const createGame = () => {
    client.emit(CREATE_GAME);
  };

  const handleGameIdChange = (e) => {
    setGameId(e.target.value);
  };

  const joinGame = (e) => {
    e.preventDefault();
    client.emit(JOIN_GAME, { playerId, gameId });
  };

  return (
    <div>
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
          <h2>Invite a friend by sharing this game's id: {game.id}</h2>
          <p>Your player id is {playerId}</p>
        </>
      )}
      {game.status === GAME_READY && <h2>Game ready.</h2>}
    </div>
  );
};

export default App;
