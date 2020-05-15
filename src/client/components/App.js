import React, { useState, useEffect } from 'react';
import client from '../socketClient';

import { CREATE_GAME, SYNC_GAME, ASSIGN_PLAYER_ID } from '../../common';

const App = () => {
  const [game, setGame] = useState({});
  const [playerId, setPlayerId] = useState('');

  useEffect(() => {
    client.on(SYNC_GAME, (data) => {
      setGame(data);
    });

    client.on(ASSIGN_PLAYER_ID, (id) => {
      setPlayerId(id);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    client.emit(CREATE_GAME);
  };

  return (
    <div>
      {game.players && game.players.length === 1 ? (
        <>
          <h2>Invite a friend by sharing this game's id: {game.id}</h2>
          <p>Your player id is {playerId}</p>
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <input type="submit" value="Create game" />
        </form>
      )}
    </div>
  );
};

export default App;
