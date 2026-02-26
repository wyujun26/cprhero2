import React from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface Props {
  language: Language;
  onNavigate: (screen: 'language' | 'learn' | 'practice' | 'quiz') => void;
}

const HomeScreen: React.FC<Props> = ({ language, onNavigate }) => {
  const t = translations[language];

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      <button
        onClick={() => onNavigate('language')}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: '24px'
        }}
      >
        🌐
      </button>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        paddingTop: '60px'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>❤️</div>
          <h1 style={{
            color: 'white',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            {t.appTitle}
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.2rem'
          }}>
            {t.tagline}
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          <button
            onClick={() => onNavigate('learn')}
            style={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '32px 24px',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>📚</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px'
            }}>
              {t.learn}
            </h2>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              {t.learnDesc}
            </p>
          </button>

          <button
            onClick={() => onNavigate('practice')}
            style={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '32px 24px',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>🎵</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px'
            }}>
              {t.practice}
            </h2>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              {t.practiceDesc}
            </p>
          </button>

          <button
            onClick={() => onNavigate('quiz')}
            style={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '32px 24px',
              cursor: 'pointer',
              textAlign: 'left',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '8px'
            }}>
              {t.quiz}
            </h2>
            <p style={{ color: '#666', fontSize: '1rem' }}>
              {t.quizDesc}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
