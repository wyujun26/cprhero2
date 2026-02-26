import React from 'react';
import { Language } from '../App';
import './LanguageSelection.css';

interface Props {
  onLanguageSelect: (language: Language) => void;
}

const languages: Language[] = [
  'English',
  'Bengali',
  'Tamil',
  'Bahasa Indonesia',
  'Burmese',
  'Chinese'
];

const LanguageSelection: React.FC<Props> = ({ onLanguageSelect }) => {
  return (
    <div className="language-selection">
      <div className="language-content">
        <h1 className="language-title">Choose Your Language</h1>
        <div className="language-grid">
          {languages.map((language) => (
            <button
              key={language}
              className="language-button"
              onClick={() => onLanguageSelect(language)}
            >
              {language}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
