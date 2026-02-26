import React, { useState } from 'react';
import { Globe } from 'lucide-react';

interface LanguageSelectionProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'id', name: 'Bahasa Indonesia', nativeName: 'Bahasa Indonesia' },
  { code: 'my', name: 'Burmese', nativeName: 'မြန်မာ' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' }
];

const LanguageSelection: React.FC<LanguageSelectionProps> = ({ onLanguageSelect }) => {
  const [selectedLang, setSelectedLang] = useState('');

  const handleSelect = (code: string) => {
    setSelectedLang(code);
    setTimeout(() => {
      onLanguageSelect(code);
    }, 200);
  };

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
            margin: '0 auto 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
          }}>
            <Globe size={48} color="#667eea" />
          </div>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: 'white',
            marginBottom: '12px',
            lineHeight: '1.3',
            textShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            Choose Your Language
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.9)',
            fontWeight: '500'
          }}>
            Select your preferred language to continue
          </p>
        </div>

        {/* Language Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              style={{
                padding: '20px 24px',
                borderRadius: '16px',
                border: selectedLang === lang.code ? '3px solid white' : '3px solid transparent',
                background: 'white',
                color: '#333',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                transform: selectedLang === lang.code ? 'scale(1.02)' : 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (selectedLang !== lang.code) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedLang !== lang.code) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                }
              }}
            >
              <span style={{ fontSize: '20px', fontWeight: '800', color: '#667eea' }}>
                {lang.nativeName}
              </span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#999' }}>
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelection;
