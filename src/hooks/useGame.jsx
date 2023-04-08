import React, {
  useState,
  useContext,
  createContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { useLocalStorage } from "./useLocalSorage";
import { generateHexColor } from "../utils/generateHexColor";

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const [gameTime, setGameTime] = useState(10);
  const [gameDifficulty, setGameDifficulty] = useState("easy-mode");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [question, setQuestion] = useState({});
  const [oldQuestionsArr, setOldQuestionsArr] = useState([]);

  const handleDecrementGameTime = () =>
    setGameTime((second) => second - 1);

  const handleGenerateQuestion = useCallback(() => {
    const question = {
      answer1: generateHexColor(),
      answer2: generateHexColor(),
      answer3: generateHexColor(),
    };

    if (gameDifficulty === "medium-mode") {
      question.answer4 = generateHexColor();
    } else if (gameDifficulty === "hard-mode") {
      question.answer4 = generateHexColor();
      question.answer5 = generateHexColor();
    }

    setQuestion(question);
  }, [gameDifficulty]);

  const handleStartGame = () => {
    setIsGameStarted(true);
    handleGenerateQuestion();
  };

  const handleRestartGame = () => {
    setIsGameStarted(false);
    setGameTime(30);
    setQuestion({});
  };

  useEffect(() => {
    let interval = null;

    if (isGameStarted) {
      if (gameTime <= 0) {
        clearInterval(interval);
        handleRestartGame();
      }

      interval = setInterval(() => {
        handleDecrementGameTime();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isGameStarted, gameTime]);

  return (
    <GameContext.Provider
      value={{
        gameTime,
        isGameStarted,
        question,
        gameDifficulty,
        setGameDifficulty,
        handleStartGame,
        handleRestartGame,
        handleGenerateQuestion,
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
