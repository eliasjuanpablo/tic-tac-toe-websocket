import React, { useState } from 'react';
import client from '../socketClient';

import { CREATE_PLAYER } from '../constants';

const CreatePlayerForm = () => {
  const [playerName, setPlayerName] = useState('');

  const createPlayer = (e) => {
    e.preventDefault();
    client.emit(CREATE_PLAYER, playerName);
  };

  const handlePlayerNameChange = (e) => {
    setPlayerName(e.target.value);
  };

  return (
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
  );
};

export default CreatePlayerForm;
