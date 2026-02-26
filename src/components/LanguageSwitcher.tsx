import React from 'react';

interface LanguageSwitcherProps {
  onChangeLanguage: () => void;
  language: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onChangeLanguage, language }) => {
  return (
    <button
      onClick={onChangeLanguage}
      style={{
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: '12px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        fontSize: '20px',
        transition: 'all 0.2s'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
        e.currentTarget.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      🌐
    </button>
  );
};

export default LanguageSwitcher;
