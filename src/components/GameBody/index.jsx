import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useGame } from "../../hooks/useGame";
import { usePlayer } from "../../hooks/usePlayer";
import BeforeStart from "../../screens/BeforeStart";
import FinishedGame from "../../screens/FinishedGame";

import "./styles.scss";

const GameBody = () => {
  const { handleIncrementScore } = usePlayer();

  const {
    gameTime,
    biggestGameTime,
    isGameStarted,
    isGameFinished,
    question,
    gameDifficulty,
    setOldQuestionsArr,
    handleGenerateQuestion,
    handleIncrementGameTime,
    handleDecrementGameTime,
  } = useGame();

  const [isMediumMode, setIsMediumMode] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false);

  const questionAnswer = useMemo(() => {
    //? Get the number of questions according to the game difficulty
    const answersQuantity =
      gameDifficulty === "easy-mode"
        ? 2
        : gameDifficulty === "medium-mode"
        ? 3
        : 4;

    //? Get random index to set as
    const randomIndex = Math.floor(Math.random() * answersQuantity);

    return question[`answer${randomIndex}`];
  }, [gameDifficulty, question]);

  const handleClickQuestionAnswer = useCallback(
    (hexColor) => {
      const formatedQuestionForOldQuestionsArr = {
        questionAnswer: questionAnswer,
        clickedAnswer: hexColor,
        hitQuestion: true,
      };

      if (hexColor === questionAnswer) {
        handleIncrementScore();
        handleIncrementGameTime(3);
      } else {
        handleDecrementGameTime(3);
        formatedQuestionForOldQuestionsArr.hitQuestion = false;
      }

      setOldQuestionsArr((oldQuestions) => [
        formatedQuestionForOldQuestionsArr,
        ...oldQuestions,
      ]);

      handleGenerateQuestion();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [questionAnswer]
  );

  useEffect(() => {
    if (gameDifficulty === "medium-mode") {
      setIsMediumMode(true);
      setIsHardMode(false);
    } else if (gameDifficulty === "hard-mode") {
      setIsHardMode(true);
      setIsMediumMode(true);
    } else {
      setIsHardMode(false);
      setIsMediumMode(false);
    }
  }, [gameDifficulty]);

  return (
    <div className='body'>
      <section>
        <section className='progress-bar'>
          <progress value={gameTime} max={biggestGameTime()} />
        </section>

        <section
          className='question-color'
          style={{ backgroundColor: questionAnswer }}
        >
          {!isGameStarted && !isGameFinished && <BeforeStart />}
          {isGameFinished && <FinishedGame />}
        </section>
      </section>

      <section
        className={`answers-container ${gameDifficulty}`}
        style={{ opacity: isGameStarted ? "1" : "0" }}
      >
        <button
          className='answer'
          onClick={() => handleClickQuestionAnswer(question.answer0)}
        >
          {question.answer0}
        </button>

        <button
          className='answer'
          onClick={() => handleClickQuestionAnswer(question.answer1)}
        >
          {question.answer1}
        </button>

        <button
          className='answer'
          onClick={() => handleClickQuestionAnswer(question.answer2)}
        >
          {question.answer2}
        </button>

        {isMediumMode && (
          <button
            className='answer'
            onClick={() =>
              handleClickQuestionAnswer(question.answer3)
            }
          >
            {question.answer3}
          </button>
        )}

        {isHardMode && (
          <button
            className='answer'
            onClick={() =>
              handleClickQuestionAnswer(question.answer4)
            }
          >
            {question.answer4}
          </button>
        )}
      </section>
    </div>
  );
};

export default GameBody;
