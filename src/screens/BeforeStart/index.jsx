import React from "react";
import { usePlayer } from "../../hooks/usePlayer";
import { useGame } from "../../hooks/useGame";

import "./styles.scss";

const BeforeStart = () => {
  const { setPlayerUserName } = usePlayer();
  const { handleStartGame, gameDifficulty, setGameDifficulty } =
    useGame();

  return (
    <div className='pre-game-form'>
      <section className='nick-name-container'>
        <label htmlFor='player-name'>Nickname:</label>
        <input
          type='text'
          id='player-name'
          placeholder='Ex: duduchaos20'
          onChange={(e) => setPlayerUserName(e.target.value)}
        />
      </section>

      <section className='game-difficulty-container'>
        <label htmlFor='game-difficulty'>Game difficulty:</label>
        <select
          id='game-difficulty'
          defaultValue={"easy-mode"}
          onChange={(e) => {
            setGameDifficulty(e.target.value);
          }}
        >
          <option
            value='easy-mode'
            selected={gameDifficulty === "easy-mode"}
          >
            Easy
          </option>
          <option
            value='medium-mode'
            selected={gameDifficulty === "medium-mode"}
          >
            Medium
          </option>
          <option
            value='hard-mode'
            selected={gameDifficulty === "hard-mode"}
          >
            Hard
          </option>
        </select>
      </section>

      <section className='start-button-container'>
        <button onClick={handleStartGame}>Start</button>
      </section>
    </div>
  );
};

export default BeforeStart;
