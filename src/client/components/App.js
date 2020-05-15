import React, { useState } from 'react';
import client from '../socketClient';

import { CREATE_GAME } from '../../common';

const App = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    client.emit(CREATE_GAME);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="Create game" />
      </form>
    </div>
  );
};

export default App;
