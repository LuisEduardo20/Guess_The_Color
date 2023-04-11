import fontColorContrast from "font-color-contrast";
import React, { useCallback, useMemo } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

const PreviousQuestion = ({ question }) => {
  const renderData = useMemo(() => {
    return (
      <li>
        <div className='answers-container'>
          <div
            style={{
              backgroundColor: question.questionAnswer,
            }}
            className='answer'
          >
            <h5
              style={{
                color: fontColorContrast(question.questionAnswer),
              }}
            >
              Right answer
            </h5>
            <p
              style={{
                color: fontColorContrast(question.questionAnswer),
              }}
            >
              {question.questionAnswer}
            </p>
          </div>

          {!question.hitQuestion && (
            <div
              style={{
                backgroundColor: question.clickedAnswer,
              }}
              className='answer'
            >
              <h5
                style={{
                  color: fontColorContrast(question.clickedAnswer),
                }}
              >
                Clicked
              </h5>
              <p
                style={{
                  color: fontColorContrast(question.clickedAnswer),
                }}
              >
                {question.clickedAnswer}
              </p>
            </div>
          )}
        </div>

        <div className='icon-container'>
          {question.hitQuestion ? (
            <AiFillCheckCircle color='#01966e' size={25} />
          ) : (
            <AiFillCloseCircle color='#ef476f' size={25} />
          )}
        </div>
      </li>
    );
  }, [question]);

  return <>{renderData}</>;
};

export default PreviousQuestion;
