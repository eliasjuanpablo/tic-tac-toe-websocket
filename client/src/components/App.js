import React, { useState, useEffect } from 'react';
import client from '../socketClient';

import CreatePlayerForm from './CreatePlayerForm';
import GameLobby from './GameLobby';

import { SYNC_GAME, SYNC_PLAYER } from '../constants';

import './App.css';

const App = () => {
  const [game, setGame] = useState({});
  const [player, setPlayer] = useState({});

  useEffect(() => {
    client.on(SYNC_GAME, (data) => {
      setGame(data);
    });

    client.on(SYNC_PLAYER, (playerData) => {
      setPlayer(playerData);
    });
  }, []);

  return (
    <div>
      {!player.id ? (
        <CreatePlayerForm />
      ) : (
        <GameLobby game={game} player={player} />
      )}
    </div>
  );
};

export default App;
