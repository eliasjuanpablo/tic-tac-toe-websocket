import React, { useState, useEffect } from 'react';
import client from '../socketClient';

import CreatePlayerForm from './CreatePlayerForm';
import GameLobby from './GameLobby';

import { SYNC_GAME, ASSIGN_PLAYER_DATA } from '../constants';

const App = () => {
  const [game, setGame] = useState({});
  const [player, setPlayer] = useState({});

  useEffect(() => {
    client.on(SYNC_GAME, (data) => {
      setGame(data);
    });

    client.on(ASSIGN_PLAYER_DATA, (playerData) => {
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
