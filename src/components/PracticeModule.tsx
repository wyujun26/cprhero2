import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { songs } from '../data/songs';
import RhythmGame from './RhythmGame';

interface Props {
  language: Language;
  onHome: () => void;
}

const PracticeModule: React.FC<Props> = ({ language, onHome }) => {
  const [selectedSong, setSelectedSong] = useState<string | null>(null);
  const [gameFinished, setGameFinished] = useState(false);
  const [gameResults, setGameResults] = useState<{ correct: number; total: number } | null>(null);
  const t = translations[language];

  const handleSongSelect = (songId: string) => {
    setSelectedSong(songId);
    setGameFinished(false);
    setGameResults(null);
  };

  const handleGameFinish = (correct: number, total: number) => {
    setGameFinished(true);
    setGameResults({ correct, total });
  };

  const handleTryAgain = () => {
    setSelectedSong(null);
    setGameFinished(false);
    setGameResults(null);
  };

  if (gameFinished && gameResults) {
    const accuracy = gameResults.total > 0 ? Math.round((gameResults.correct / gameResults.total) * 100) : 0;
    const message = accuracy >= 80 ? t.greatRhythm : t.keepPracticing;

    return (
      <div style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px 24px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>
              {accuracy >= 80 ? '🎉' : '💪'}
            </div>
            
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '32px'
            }}>
              Results
            </h2>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginBottom: '32px'
            }}>
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#00D4AA'
                }}>
                  {gameResults.total}
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  Total Taps
                </div>
              </div>
              
              <div>
                <div style={{
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  color: '#00D4AA'
                }}>
                  {accuracy}%
                </div>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  {t.accuracy}
                </div>
              </div>
            </div>
            
            <p style={{
              fontSize: '1.1rem',
              color: '#555',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              {message}
            </p>
            
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={handleTryAgain}
                style={{
                  flex: 1,
                  backgroundColor: '#00D4AA',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {t.tryAgain}
              </button>
              
              <button
                onClick={onHome}
                style={{
                  flex: 1,
                  backgroundColor: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {t.home}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedSong) {
    const song = songs.find(s => s.id === selectedSong);
    if (!song) return null;

    return (
      <RhythmGame
        song={song}
        language={language}
        onFinish={handleGameFinish}
        onHome={onHome}
      />
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      <button
        onClick={onHome}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255,255,255,0.2)',
          border: 'none',
          borderRadius: '8px',
          padding: '8px 16px',
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      >
        ← {t.home}
      </button>

      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        paddingTop: '80px'
      }}>
        <h1 style={{
          color: 'white',
          fontSize: '2rem',
          fontWeight: 'bold',
          marginBottom: '40px',
          textAlign: 'center'
        }}>
          {t.selectSong}
        </h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {songs.map((song) => (
            <button
              key={song.id}
              onClick={() => handleSongSelect(song.id)}
              style={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                textAlign: 'left',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                transition: 'transform 0.2s'
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px'
              }}>
                {song.name}
              </h3>
              <p style={{
                color: '#666',
                fontSize: '1rem'
              }}>
                {song.bpm} BPM
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PracticeModule;
