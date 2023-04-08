import React from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import fontColorContrast from "font-color-contrast";

import { useGame } from "../../hooks/useGame";

import "./styles.scss";

const CurrentAndLatestGames = () => {
  const { oldQuestionsArr } = useGame();

  return (
    <div className='aside-section'>
      <h4>Previous questions</h4>

      <ul className='previous-answers-list'>
        {oldQuestionsArr.map((oldQuestion) => {
          return (
            <li>
              <div className='answers-container'>
                <div
                  style={{
                    backgroundColor: oldQuestion.questionAnswer,
                  }}
                  className='answer'
                >
                  <h5
                    style={{
                      color: fontColorContrast(
                        oldQuestion.questionAnswer
                      ),
                    }}
                  >
                    Right answer
                  </h5>
                  <p
                    style={{
                      color: fontColorContrast(
                        oldQuestion.questionAnswer
                      ),
                    }}
                  >
                    {oldQuestion.questionAnswer}
                  </p>
                </div>

                {!oldQuestion.hitQuestion && (
                  <div
                    style={{
                      backgroundColor: oldQuestion.clickedAnswer,
                    }}
                    className='answer'
                  >
                    <h5
                      style={{
                        color: fontColorContrast(
                          oldQuestion.clickedAnswer
                        ),
                      }}
                    >
                      Wrong answer
                    </h5>
                    <p
                      style={{
                        color: fontColorContrast(
                          oldQuestion.clickedAnswer
                        ),
                      }}
                    >
                      {oldQuestion.clickedAnswer}
                    </p>
                  </div>
                )}
              </div>

              <div className='icon-container'>
                {oldQuestion.hitQuestion ? (
                  <AiFillCheckCircle color='green' size={25} />
                ) : (
                  <AiFillCloseCircle color='red' size={25} />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CurrentAndLatestGames;
