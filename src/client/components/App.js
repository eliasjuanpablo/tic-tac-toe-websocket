import React, { useState, useEffect } from 'react';
import client from '../socketClient';

import { CREATE_GAME, SYNC_GAME } from '../../common';

const App = () => {
  const [game, setGame] = useState({});

  useEffect(() => {
    client.on(SYNC_GAME, (data) => {
      setGame(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    client.emit(CREATE_GAME);
  };

  return (
    <div>
      {game.id ? (
        <>
          <h2>Invite a friend by sharing this game's id: {game.id}</h2>
          <p>Your player id is {game.players[0].id}</p>
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
