import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
} from "react";
import { useLocalStorage } from "./useLocalSorage";

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [gameTime, setGameTime] = useState(30);

  const handleDecrementGameTime = () => {
    setGameTime(gameTime - 1);
  };

  return (
    <GameContext.Provider
      value={{
        gameTime,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("GameContext must be used with GameProvider");
  }

  return context;
};
