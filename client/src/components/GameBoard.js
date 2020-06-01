import React from 'react';
import client from '../socketClient';

import { PLAY, START_GAME, GAME_IN_PROGRESS, GAME_OVER } from '../constants';

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

      {game.status === GAME_IN_PROGRESS && game.currentTurn === player.id && (
        <h3>Your turn</h3>
      )}
      {game.status === GAME_OVER && (
        <>
          <h3> GAME OVER </h3>
          {game.winner ? (
            <p>{game.players.find((p) => p.id === game.winner).name} wins!</p>
          ) : (
            <p>TIE</p>
          )}
          {game.hostId === player.id && (
            <button
              onClick={() => {
                client.emit(START_GAME, { gameId: game.id });
              }}
            >
              RESTART
            </button>
          )}
        </>
      )}
    </>
  );
};

export default GameBoard;
