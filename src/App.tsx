import React, { useState, useEffect } from 'react';
import LanguageSelection from './screens/LanguageSelection';
import HomeScreen from './screens/HomeScreen';
import LearnModule from './screens/LearnModule';
import PracticeModule from './screens/PracticeModule';
import QuizModule from './screens/QuizModule';
import './App.css';

export type Language = 'English' | 'Bengali' | 'Tamil' | 'Bahasa Indonesia' | 'Burmese' | 'Chinese';
export type Screen = 'language' | 'home' | 'learn' | 'practice' | 'quiz';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setCurrentScreen('home');
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleHome = () => {
    setCurrentScreen('home');
  };

  return (
    <div className="app">
      {currentScreen === 'language' && (
        <LanguageSelection onLanguageSelect={handleLanguageSelect} />
      )}
      {currentScreen === 'home' && (
        <HomeScreen 
          onNavigate={handleNavigate}
          language={selectedLanguage || 'English'}
        />
      )}
      {currentScreen === 'learn' && (
        <LearnModule onHome={handleHome} language={selectedLanguage || 'English'} />
      )}
      {currentScreen === 'practice' && (
        <PracticeModule onHome={handleHome} language={selectedLanguage || 'English'} />
      )}
      {currentScreen === 'quiz' && (
        <QuizModule onHome={handleHome} language={selectedLanguage || 'English'} />
      )}
    </div>
  );
};

export default App;
