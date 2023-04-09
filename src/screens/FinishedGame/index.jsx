import React from "react";
import { useGame } from "../../hooks/useGame";

import "./styles.scss";

const FinishedGame = () => {
  const { handlePlayAgain, handleFinishPlay } = useGame();

  return (
    <div className='buttons-container'>
      <button onClick={handlePlayAgain} className='play-again'>
        Play Again
      </button>
      <button onClick={handleFinishPlay} className='end-game'>
        End Game
      </button>
    </div>
  );
};

export default FinishedGame;
