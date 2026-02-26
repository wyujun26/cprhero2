import React from 'react';
import './QuizResults.css';

interface Props {
  score: number;
  total: number;
  onRestart: () => void;
  onHome: () => void;
}

const QuizResults: React.FC<Props> = ({ score, total, onRestart, onHome }) => {
  const percentage = Math.round((score / total) * 100);
  const passed = percentage >= 70;
  const today = new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const handleShare = async () => {
    const text = `I completed CPR training on ${today} and scored ${score}/${total}! 🏆`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CPR Hero Training',
          text: text
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="quiz-results">
      <div className="results-content">
        <div className="results-card">
          <div className="results-emoji">{passed ? '🏆' : '📚'}</div>
          <h2 className="results-title">Quiz Complete!</h2>
          
          <div className="score-display">
            <div className="score-number">{score}/{total}</div>
            <div className="score-percentage">{percentage}%</div>
          </div>

          <div className={`completion-card ${passed ? 'passed' : 'not-passed'}`}>
            <h3>I completed CPR training</h3>
            <p className="completion-date">{today}</p>
            <p className="completion-score">Score: {score}/{total}</p>
          </div>

          <div className="results-buttons">
            <button className="share-button" onClick={handleShare}>
              📤 Share Achievement
            </button>
            <button className="restart-button" onClick={onRestart}>
              Try Again
            </button>
            <button className="home-button-quiz" onClick={onHome}>
              Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
