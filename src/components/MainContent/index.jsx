import React from "react";
import GameHeader from "../GameHeader";
import GameBody from "../GameBody";
import "./styles.scss";

const MainContent = () => {
  return (
    <div className='main-content'>
      <section className='game-container'>
        <GameHeader />
        <GameBody />
      </section>
    </div>
  );
};

export default MainContent;
