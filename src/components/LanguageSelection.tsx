import React from 'react';
import { Language } from '../types';
import { languages } from '../data/languages';
import { translations } from '../data/translations';

interface Props {
  onSelect: (language: Language) => void;
}

const LanguageSelection: React.FC<Props> = ({ onSelect }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        {translations.en.languageSelection}
      </h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '16px',
        maxWidth: '500px',
        width: '100%'
      }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => onSelect(lang.code)}
            style={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '24px 16px',
              fontSize: '1.1rem',
              fontWeight: '600',
              color: '#333',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div>{lang.name}</div>
            <div style={{ fontSize: '0.9rem', marginTop: '4px', opacity: 0.7 }}>
              {lang.nativeName}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelection;
