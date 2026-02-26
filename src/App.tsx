import React, { useState, useEffect } from 'react';
import { Language } from './types';
import LanguageSelection from './components/LanguageSelection';
import HomeScreen from './components/HomeScreen';
import LearnModule from './components/LearnModule';
import PracticeModule from './components/PracticeModule';
import QuizModule from './components/QuizModule';

type Screen = 'language' | 'home' | 'learn' | 'practice' | 'quiz';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('language');
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');

  useEffect(() => {
    setCurrentScreen('language');
  }, []);

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
    <div style={{ minHeight: '100vh' }}>
      {currentScreen === 'language' && (
        <LanguageSelection onSelect={handleLanguageSelect} />
      )}
      {currentScreen === 'home' && (
        <HomeScreen
          language={selectedLanguage}
          onNavigate={handleNavigate}
        />
      )}
      {currentScreen === 'learn' && (
        <LearnModule language={selectedLanguage} onHome={handleHome} />
      )}
      {currentScreen === 'practice' && (
        <PracticeModule language={selectedLanguage} onHome={handleHome} />
      )}
      {currentScreen === 'quiz' && (
        <QuizModule language={selectedLanguage} onHome={handleHome} />
      )}
    </div>
  );
};

export default App;
