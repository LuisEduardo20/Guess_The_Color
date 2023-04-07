import React from "react";
import { PlayerProvider } from "./usePlayer";
import { GameProvider } from "./useGame";

const ContextProviders = ({ children }) => {
  return (
    <GameProvider>
      <PlayerProvider>{children}</PlayerProvider>;
    </GameProvider>
  );
};

export default ContextProviders;
