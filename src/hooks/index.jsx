import React from "react";
import { PlayerProvider } from "./usePlayer";
import { GameProvider } from "./useGame";

const ContextProviders = ({ children }) => {
  return (
    <PlayerProvider>
      <GameProvider>{children}</GameProvider>
    </PlayerProvider>
  );
};

export default ContextProviders;
