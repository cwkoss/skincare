import React from 'react';

const ScoreBar = ({ score }) => {
  // Function to determine the class for each segment based on the score
  const segmentClass = (index) => {
    const distance = Math.abs(index - 5);
    let intensityClass = '';

    if (score === 5) {
      if (index === 5) intensityClass = 'highlighted';
    } else if (score < 5) {
      if (index >= score && index <= 5) intensityClass = `highlighted intensity-${distance}`;
    } else if (score > 5) {
      if (index <= score && index >= 5) intensityClass = `highlighted intensity-${distance}`;
    }

    return `segment ${intensityClass}`;
  };

  return (
    <div className="score-bar">
      {[...Array(9)].map((_, index) => (
        <div key={index} className={segmentClass(index + 1)}></div>
      ))}
    </div>
  );
};

export default ScoreBar;
