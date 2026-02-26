import React from 'react';
import './ResultsScreen.css';

interface Props {
  compressions: number;
  accuracy: number;
  onTryAgain: () => void;
  onHome: () => void;
}

const ResultsScreen: React.FC<Props> = ({ compressions, accuracy, onTryAgain, onHome }) => {
  const message = accuracy >= 80 
    ? "Great rhythm! You could save a life" 
    : "Keep practising — consistency saves lives";

  const emoji = accuracy >= 80 ? "🎉" : "💪";

  return (
    <div className="results-screen">
      <div className="results-content">
        <div className="results-card">
          <div className="results-emoji">{emoji}</div>
          <h2 className="results-title">Practice Complete!</h2>
          
          <div className="results-stats">
            <div className="result-stat">
              <div className="result-number">{compressions}</div>
              <div className="result-label">Correct Taps</div>
            </div>
            <div className="result-stat">
              <div className="result-number">{accuracy}%</div>
              <div className="result-label">Accuracy</div>
            </div>
          </div>

          <div className="results-message">
            {message}
          </div>

          <div className="results-buttons">
            <button className="try-again-button" onClick={onTryAgain}>
              Try Again
            </button>
            <button className="home-button-result" onClick={onHome}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
