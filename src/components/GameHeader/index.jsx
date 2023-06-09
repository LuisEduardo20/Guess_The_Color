import React from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { useGame } from "../../hooks/useGame";

import "./styles.scss";

const GameHeader = () => {
  const { highScore, playerScore } = usePlayer();
  const { gameTime, handleRestartGame } = useGame();

  return (
    <div className='header'>
      <section className='remaining-time'>
        <h5>Time Left</h5>
        <p>{gameTime}s</p>
      </section>

      <section className='restart'>
        <button onClick={handleRestartGame}>Restart</button>
      </section>

      <section className='score'>
        <div>
          <h5>High Score</h5>

          <section>
            <p>
              {highScore
                ? `${highScore.playerUserName}: ${highScore.playerScore}`
                : "Empty"}
            </p>
          </section>
        </div>

        <div className='player-score'>
          <h5>Score:</h5>
          <p>{playerScore}</p>
        </div>
      </section>
    </div>
  );
};

export default GameHeader;
