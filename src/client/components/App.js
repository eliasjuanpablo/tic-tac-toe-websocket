import React, { useState, useEffect } from 'react';
import client from '../socketClient';

import {
  CREATE_GAME,
  SYNC_GAME,
  ASSIGN_PLAYER_DATA,
  JOIN_GAME,
  WAITING_FOR_OPPONENT,
  GAME_READY,
  CREATE_PLAYER,
} from '../../common';

const App = () => {
  const [game, setGame] = useState({});
  const [player, setPlayer] = useState({});
  const [playerName, setPlayerName] = useState('');
  const [gameId, setGameId] = useState('');

  useEffect(() => {
    client.on(SYNC_GAME, (data) => {
      setGame(data);
    });

    client.on(ASSIGN_PLAYER_DATA, (playerData) => {
      setPlayer(playerData);
    });
  }, []);

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

  const createPlayer = (e) => {
    e.preventDefault();
    client.emit(CREATE_PLAYER, playerName);
  };

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
    <div>
      {!player.id && (
        <form onSubmit={createPlayer}>
          <label htmlFor="playerName">Enter your name: </label>
          <input
            name="playerName"
            type="text"
            onChange={handlePlayerNameChange}
            value={playerName}
          />
          <input type="submit" value="Send" />
        </form>
      )}
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
    </div>
  );
};

export default App;
