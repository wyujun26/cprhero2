import React from 'react';
import { Screen, Language } from '../App';
import './HomeScreen.css';

interface Props {
  onNavigate: (screen: Screen) => void;
  language: Language;
}

const HomeScreen: React.FC<Props> = ({ onNavigate, language }) => {
  return (
    <div className="home-screen">
      <button 
        className="globe-button"
        onClick={() => onNavigate('language')}
        aria-label="Change language"
      >
        🌐
      </button>

      <div className="home-content">
        <div className="logo-section">
          <div className="heart-icon">❤️</div>
          <h1 className="app-title">CPR Hero</h1>
          <p className="tagline">Learn to Save Lives</p>
        </div>

        <div className="module-buttons">
          <button 
            className="module-button"
            onClick={() => onNavigate('learn')}
          >
            <div className="module-icon">📚</div>
            <div className="module-text">
              <h2>Learn</h2>
              <p>Master the DRS ABC steps</p>
            </div>
          </button>

          <button 
            className="module-button"
            onClick={() => onNavigate('practice')}
          >
            <div className="module-icon">🎵</div>
            <div className="module-text">
              <h2>Practice</h2>
              <p>Train your compression rhythm</p>
            </div>
          </button>

          <button 
            className="module-button"
            onClick={() => onNavigate('quiz')}
          >
            <div className="module-icon">🏆</div>
            <div className="module-text">
              <h2>Quiz</h2>
              <p>Test your knowledge</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
