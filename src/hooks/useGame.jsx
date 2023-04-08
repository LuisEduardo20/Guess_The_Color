import React, {
  useState,
  useContext,
  createContext,
  useCallback,
  useEffect,
} from "react";
import { generateHexColor } from "../utils/generateHexColor";
import { usePlayer } from "./usePlayer";

const GameContext = createContext({});

export const GameProvider = ({ children }) => {
  const {
    playerScore,
    playerUserName,
    setPlayerUserName,
    localScores,
    setLocalScores,
    setPlayerScore,
  } = usePlayer();

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
    if (!playerUserName || playerUserName.length < 3) {
      window.alert("Please, set a nick name");
      return;
    }

    setIsGameStarted(true);
    handleGenerateQuestion();
    setOldQuestionsArr([]);
  }, [handleGenerateQuestion, playerUserName]);

  const handleRestartGame = useCallback(() => {
    setIsGameStarted(false);
    setGameTime(30);
    setQuestion({});
    setPlayerScore(0);
    setPlayerUserName("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEndGame = () => {
    const playerResult = {
      playerScore,
      playerUserName,
    };

    setLocalScores([...localScores, playerResult]);
  };

  useEffect(() => {
    let interval = null;

    if (isGameStarted) {
      //? Clear interval and reset game data after time out
      if (gameTime <= 0) {
        clearInterval(interval);
        handleRestartGame();
        handleEndGame();
      }

      interval = setInterval(() => {
        handleDecrementGameTime();
      }, 1000);
    }

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
