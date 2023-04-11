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
  const [gameTimeHistory, setGameTimeHistory] = useState([]);
  const [gameDifficulty, setGameDifficulty] = useState("easy-mode");
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [question, setQuestion] = useState({});
  const [oldQuestionsArr, setOldQuestionsArr] = useState([]);

  //? Greatest recorded time, serves to put as max number in the remaining time bar
  const biggestGameTime = () => {
    if (isGameStarted) return Math.max(...gameTimeHistory);

    return 30;
  };

  //? Game logic functions
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
    setIsGameFinished(false);
    handleGenerateQuestion();
    setOldQuestionsArr([]);
  }, [handleGenerateQuestion, playerUserName]);

  const handleRestartGame = useCallback(() => {
    setIsGameStarted(false);
    setIsGameFinished(false);
    setGameTime(30);
    setGameTimeHistory([]);
    setQuestion({});
    setPlayerScore(0);
  }, []);

  const handleEndGame = () => {
    const playerResult = {
      playerScore,
      playerUserName,
    };

    setLocalScores([...localScores, playerResult]);
    setIsGameFinished(true);
  };

  const handlePlayAgain = () => {
    handleRestartGame();
    handleStartGame();
  };

  const handleFinishPlay = () => {
    setIsGameFinished(false);
    setIsGameStarted(false);
    setPlayerUserName("");
  };

  //? Updates the array of recorded times, serves to calculate the "biggestGameTime"
  useEffect(() => {
    setGameTimeHistory((oldTimes) => [...oldTimes, gameTime]);
  }, [gameTime]);

  //? Logic to perform the timer decrement interval and game end
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
  }, [isGameStarted, gameTime]);

  return (
    <GameContext.Provider
      value={{
        gameTime,
        biggestGameTime,
        isGameStarted,
        isGameFinished,
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
        handlePlayAgain,
        handleFinishPlay,
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
