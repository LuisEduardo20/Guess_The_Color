import React from "react";
import GameHeader from "../GameHeader";
import GameBody from "../GameBody";
import "./styles.scss";

const MainContent = () => {
  return (
    <div className='main-content'>
      <section className='game-container'>
        <h1>Guess the color</h1>

        <GameHeader />

        <GameBody />
      </section>
    </div>
  );
};

export default MainContent;
