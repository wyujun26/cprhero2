import React from 'react';
import { BookOpen, Target, Award } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import TranslationNotice from './TranslationNotice';

interface HomeScreenProps {
  onNavigate: (screen: 'learn' | 'practice' | 'quiz') => void;
  onChangeLanguage: () => void;
  language: string;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onChangeLanguage, language }) => {
  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Language Switcher */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px'
      }}>
        <LanguageSwitcher onChangeLanguage={onChangeLanguage} language={language} />
      </div>

      <div style={{
        width: '100%',
        maxWidth: '480px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'white',
            borderRadius: '20px',
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            ❤️
          </div>
          <h1 style={{
            fontSize: '42px',
            fontWeight: '800',
            color: 'white',
            marginBottom: '8px',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            CPR Hero
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '500'
          }}>
            Learn to Save Lives
          </p>
        </div>

        {/* Translation Notice */}
        <div style={{ padding: '0 8px' }}>
          <TranslationNotice language={language} />
        </div>

        {/* Module Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <ModuleButton
            icon={<BookOpen size={32} />}
            title="Learn"
            description="DRS ABC Framework"
            color="#FF6B6B"
            onClick={() => onNavigate('learn')}
          />
          <ModuleButton
            icon={<Target size={32} />}
            title="Practice"
            description="Rhythm Training"
            color="#4ECDC4"
            onClick={() => onNavigate('practice')}
          />
          <ModuleButton
            icon={<Award size={32} />}
            title="Quiz"
            description="Test Your Knowledge"
            color="#FFD93D"
            onClick={() => onNavigate('quiz')}
          />
        </div>
      </div>
    </div>
  );
};

interface ModuleButtonProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}

const ModuleButton: React.FC<ModuleButtonProps> = ({
  icon,
  title,
  description,
  color,
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        width: '100%'
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '16px',
        background: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div style={{ textAlign: 'left', flex: 1 }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#333',
          marginBottom: '4px'
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#666',
          fontWeight: '500'
        }}>
          {description}
        </p>
      </div>
    </button>
  );
};

export default HomeScreen;
