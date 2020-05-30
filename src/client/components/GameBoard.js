import React from 'react';
import client from '../socketClient';

import { PLAY, GAME_IN_PROGRESS } from '../constants';

import BoardCell from './BoardCell';

const GameBoard = ({ game, player }) => {
  const makePlay = ({ game, player, index }) => {
    client.emit(PLAY, {
      gameId: game.id,
      playerId: player.id,
      index,
    });
  };

  return (
    <>
      <h1 className="title">Tic tac toe!</h1>
      <div className="board" id="board">
        {game.board.map((cell, index) => (
          <BoardCell
            key={index}
            value={cell}
            handleClick={() => {
              makePlay({ game, player, index });
            }}
          />
        ))}
      </div>
      <br />

      {game.status == GAME_IN_PROGRESS && game.currentTurn === player.id && (
        <h3>Your turn</h3>
      )}
    </>
  );
};

export default GameBoard;
