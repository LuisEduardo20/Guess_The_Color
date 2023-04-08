import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { useLocalStorage } from "./useLocalSorage";
import { generateHexColor } from "../utils/generateHexColor";
import { usePlayer } from "./usePlayer";

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const { playerScore, setPlayerScore } = usePlayer();

  const [gameTime, setGameTime] = useState(30);
  const [gameDifficulty, setGameDifficulty] = useState("easy-mode");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [question, setQuestion] = useState({});
  const [oldQuestionsArr, setOldQuestionsArr] = useState([]);

  const handleDecrementGameTime = (decrementTime = 1) =>
    setGameTime((second) => second - decrementTime);

  const handleIncrementGameTime = (incrementTime = 1) =>
    setGameTime((second) => second + incrementTime);

  const handleGenerateQuestion = useCallback(() => {
    const question = {
      answer0: generateHexColor(),
      answer1: generateHexColor(),
      answer2: generateHexColor(),
    };

    if (gameDifficulty === "medium-mode") {
      question.answer3 = generateHexColor();
    } else if (gameDifficulty === "hard-mode") {
      question.answer3 = generateHexColor();
      question.answer4 = generateHexColor();
    }

    setQuestion(question);
  }, [gameDifficulty]);

  const handleStartGame = useCallback(() => {
    setIsGameStarted(true);
    handleGenerateQuestion();
    setOldQuestionsArr([]);
  }, [handleGenerateQuestion]);

  const handleRestartGame = useCallback(() => {
    setIsGameStarted(false);
    setGameTime(30);
    setQuestion({});
    setPlayerScore(0);
  }, []);

  const handleEndGame = () => {
    //TODO Setar no local storage o score e nome atual
  };

  useEffect(() => {
    let interval = null;

    if (isGameStarted) {
      //? Clear interval and reset game data after time out
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
        oldQuestionsArr,
        setOldQuestionsArr,
        handleStartGame,
        handleRestartGame,
        handleGenerateQuestion,
        handleIncrementGameTime,
        handleDecrementGameTime,
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
