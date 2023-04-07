import React, {
  useState,
  useContext,
  createContext,
  useMemo,
} from "react";
import { useLocalStorage } from "./useLocalSorage";

const PlayerContext = createContext({});

export const PlayerProvider = ({ children }) => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [playerUserName, setPlayerUserName] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [localScores, setLocalScores] = useLocalStorage(
    "old-scores",
    []
  );

  const handleGetHighScore = (scoresArr) => {
    //? local score data example
    //! {
    //!   playerName: "Eduardo",
    //!   score: 20
    //! }

    const onlyScores = scoresArr.map(
      (localScore) => localScore.score
    );

    let higherNumber = onlyScores[0];
    let higherIndex = 0;

    for (let i = 0; i < onlyScores.length; i++) {
      if (onlyScores[i] > higherNumber) {
        higherNumber = onlyScores[i];
        higherIndex = i;
      }
    }

    return scoresArr[higherIndex];
  };

  const highScore = useMemo(() => {
    return handleGetHighScore(localScores);
  }, [localScores]);

  const handleAddLocalScore = () => {
    //TODO function to add score on local storage
  };

  return (
    <PlayerContext.Provider
      value={{
        isGameStarted,
        setIsGameStarted,
        playerUserName,
        setPlayerUserName,
        playerScore,
        setPlayerScore,
        highScore,
        handleAddLocalScore,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("PlayerContext must be used with PlayerProvider");
  }

  return context;
};