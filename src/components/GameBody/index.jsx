import React, { useState } from "react";
import { useGame } from "../../hooks/useGame";

import "./styles.scss";

const GameBody = () => {
  const {
    gameTime,
    isGameStarted,
    question,
    gameDifficulty,
    handleStartGame,
  } = useGame();

  const [isMediumMode, setIsMediumMode] = useState(
    gameDifficulty === "medium-mode" || gameDifficulty === "hard-mode"
  );

  const [isHardMode, setIsHardMode] = useState(
    gameDifficulty === "hard-mode"
  );

  return (
    <div className='body'>
      <section className='progress-bar'>
        <progress value={gameTime} max='30' />
      </section>

      <section
        className='question-color'
        style={{ backgroundColor: question.answer1 }}
      >
        {!isGameStarted && (
          <button onClick={handleStartGame}>start</button>
        )}
      </section>

      {isGameStarted && (
        <section className='answers-container easy-mode'>
          <button className='answer'>{question.answer1}</button>
          <button className='answer'>{question.answer2}</button>
          <button className='answer'>{question.answer3}</button>

          {isMediumMode && (
            <button className='answer'>{question.answer4}</button>
          )}

          {isHardMode && (
            <button className='answer'>{question.answer5}</button>
          )}
        </section>
      )}
    </div>
  );
};

export default GameBody;
