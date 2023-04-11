import React from "react";
import PreviousQuestion from "../PreviousQuestion";
import { useGame } from "../../hooks/useGame";

import "./styles.scss";

const CurrentAndLatestGames = () => {
  const { oldQuestionsArr } = useGame();

  return (
    <div className='aside-section'>
      <h4>Previous questions</h4>

      <ul className='previous-answers-list'>
        {oldQuestionsArr.map((oldQuestion) => {
          return <PreviousQuestion question={oldQuestion} />;
        })}
      </ul>
    </div>
  );
};

export default CurrentAndLatestGames;
