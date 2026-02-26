import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Activity, Music } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import TranslationNotice from './TranslationNotice';

interface PracticeModuleProps {
  onBack: () => void;
  language: string;
  onChangeLanguage: () => void;
  onNavigateToQuiz?: () => void;
}

interface Song {
  name: string;
  bpm: number;
}

const songs: Song[] = [
  { name: "Stayin' Alive", bpm: 103 },
  { name: "Eye of the Tiger", bpm: 109 },
  { name: "Baby Shark", bpm: 115 }
];

const PracticeModule: React.FC<PracticeModuleProps> = ({ 
  onBack, 
  language, 
  onChangeLanguage,
  onNavigateToQuiz 
}) => {
  const [screen, setScreen] = useState<'select' | 'training' | 'results'>('select');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [compressionCount, setCompressionCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isResting, setIsResting] = useState(false);
  const [restTimeLeft, setRestTimeLeft] = useState(2);
  const [feedback, setFeedback] = useState<'GOOD' | 'TOO EARLY' | 'TOO LATE' | null>(null);
  const [isPulsing, setIsPulsing] = useState(false);
  const [totalTaps, setTotalTaps] = useState(0);
  const [goodTaps, setGoodTaps] = useState(0);

  const pulseIntervalRef = useRef<number | null>(null);
  const lastPulseTimeRef = useRef<number>(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Play tap sound
  const playTapSound = () => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  };

  // Start training session
  useEffect(() => {
    if (screen !== 'training' || !selectedSong) return;

    const beatInterval = (60 / selectedSong.bpm) * 1000;
    lastPulseTimeRef.current = Date.now();

    // Pulse animation
    const startPulse = () => {
      if (isResting) return;
      
      setIsPulsing(true);
      lastPulseTimeRef.current = Date.now();
      
      setTimeout(() => {
        setIsPulsing(false);
      }, beatInterval * 0.4);
    };

    startPulse();
    pulseIntervalRef.current = window.setInterval(() => {
      if (!isResting) {
        startPulse();
      }
    }, beatInterval);

    // Main timer
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setScreen('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }
      clearInterval(timerInterval);
    };
  }, [screen, selectedSong, isResting]);

  // Handle 30:2 cycle
  useEffect(() => {
    if (compressionCount > 0 && compressionCount % 30 === 0 && !isResting) {
      setIsResting(true);
      setRestTimeLeft(2);
      
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }

      const restInterval = setInterval(() => {
        setRestTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(restInterval);
            setIsResting(false);
            return 2;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [compressionCount, isResting]);

  // Handle tap
  const handleTap = () => {
    if (screen !== 'training' || isResting) return;

    playTapSound();
    
    const now = Date.now();
    const timeSinceLastPulse = now - lastPulseTimeRef.current;
    const beatInterval = selectedSong ? (60 / selectedSong.bpm) * 1000 : 0;
    const beatWindow = beatInterval * 0.3; // 30% window for "good" timing

    setTotalTaps(prev => prev + 1);

    let feedbackType: 'GOOD' | 'TOO EARLY' | 'TOO LATE';
    
    if (timeSinceLastPulse < beatWindow) {
      feedbackType = 'TOO EARLY';
    } else if (timeSinceLastPulse > beatInterval - beatWindow && timeSinceLastPulse < beatInterval + beatWindow) {
      feedbackType = 'GOOD';
      setGoodTaps(prev => prev + 1);
      setCompressionCount(prev => prev + 1);
    } else {
      feedbackType = 'TOO LATE';
    }

    setFeedback(feedbackType);
    
    // Update accuracy
    const newAccuracy = totalTaps > 0 ? Math.round(((goodTaps + (feedbackType === 'GOOD' ? 1 : 0)) / (totalTaps + 1)) * 100) : 100;
    setAccuracy(newAccuracy);

    setTimeout(() => setFeedback(null), 500);
  };

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setScreen('training');
    setCompressionCount(0);
    setAccuracy(100);
    setTimeLeft(120);
    setIsResting(false);
    setRestTimeLeft(2);
    setFeedback(null);
    setTotalTaps(0);
    setGoodTaps(0);
  };

  const resetPractice = () => {
    setScreen('select');
    setSelectedSong(null);
    setCompressionCount(0);
    setAccuracy(100);
    setTimeLeft(120);
    setIsResting(false);
    setRestTimeLeft(2);
    setFeedback(null);
    setTotalTaps(0);
    setGoodTaps(0);
  };

  const goToQuiz = () => {
    if (onNavigateToQuiz) {
      onNavigateToQuiz();
    }
  };

  // Screen 1: Song Selection
  if (screen === 'select') {
    return (
      <div style={{
        minHeight: '100vh',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button
            onClick={onBack}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px'
            }}
          >
            <ArrowLeft size={24} color="white" />
          </button>
          <div style={{ flex: 1 }} />
          <LanguageSwitcher onChangeLanguage={onChangeLanguage} language={language} />
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '480px',
            background: 'white',
            borderRadius: '24px',
            padding: '40px 24px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}>
            <TranslationNotice language={language} />
            <Music size={80} color="#4ECDC4" style={{ margin: '0 auto 24px', display: 'block' }} />
            <h2 style={{
              fontSize: '32px',
              fontWeight: '800',
              color: '#333',
              marginBottom: '16px',
              textAlign: 'center'
            }}>
              Choose Your Song
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '32px',
              lineHeight: '1.6',
              textAlign: 'center'
            }}>
              Select a song to practice your compression rhythm. Tap the circle in sync with the beat.
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {songs.map((song) => (
                <button
                  key={song.name}
                  onClick={() => handleSongSelect(song)}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    border: '2px solid #e0e0e0',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#4ECDC4';
                    e.currentTarget.style.background = '#f0fffe';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e0e0e0';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <div style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#333',
                    marginBottom: '4px'
                  }}>
                    {song.name}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: '#666',
                    fontWeight: '600'
                  }}>
                    {song.bpm} BPM
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Screen 2: Training
  if (screen === 'training') {
    return (
      <div style={{
        minHeight: '100vh',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        userSelect: 'none'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
          color: 'white'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '12px 16px',
            fontSize: '18px',
            fontWeight: '700'
          }}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <LanguageSwitcher onChangeLanguage={onChangeLanguage} language={language} />
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px',
          textAlign: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <div style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '4px'
          }}>
            {selectedSong?.name}
          </div>
          <div style={{
            fontSize: '36px',
            fontWeight: '800',
            color: '#4ECDC4'
          }}>
            {selectedSong?.bpm} BPM
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-around',
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
              Compressions
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#333' }}>
              {compressionCount}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
              Accuracy
            </div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: accuracy >= 80 ? '#4CAF50' : '#FF9800' }}>
              {accuracy}%
            </div>
          </div>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          {isResting ? (
            <div style={{
              textAlign: 'center',
              color: 'white'
            }}>
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '16px'
              }}>
                REST
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '16px'
              }}>
                2 rescue breaths
              </div>
              <div style={{
                fontSize: '48px',
                fontWeight: '800'
              }}>
                {restTimeLeft}
              </div>
            </div>
          ) : (
            <>
              <div
                onClick={handleTap}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleTap();
                }}
                style={{
                  width: isPulsing ? '280px' : '240px',
                  height: isPulsing ? '280px' : '240px',
                  borderRadius: '50%',
                  background: feedback === 'GOOD' ? '#4CAF50' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-out',
                  boxShadow: isPulsing 
                    ? '0 0 40px rgba(78, 205, 196, 0.6)' 
                    : '0 8px 32px rgba(0,0,0,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: '700',
                  color: '#999',
                  border: '8px solid #4ECDC4'
                }}
              >
                TAP
              </div>

              {feedback && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  fontSize: '32px',
                  fontWeight: '800',
                  color: feedback === 'GOOD' ? '#4CAF50' : '#F44336',
                  textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  pointerEvents: 'none',
                  animation: 'fadeOut 0.5s ease-out'
                }}>
                  {feedback}
                </div>
              )}
            </>
          )}
        </div>

        <style>
          {`
            @keyframes fadeOut {
              0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
              100% { opacity: 0; transform: translate(-50%, -50%) scale(1.2); }
            }
          `}
        </style>
      </div>
    );
  }

  // Screen 3: Results
  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
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
        background: 'white',
        borderRadius: '24px',
        padding: '40px 24px',
        textAlign: 'center',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
      }}>
        <TranslationNotice language={language} />
        <Activity size={80} color="#4ECDC4" style={{ margin: '0 auto 24px' }} />
        <h2 style={{
          fontSize: '32px',
          fontWeight: '800',
          color: '#333',
          marginBottom: '16px'
        }}>
          Training Complete!
        </h2>
        
        <div style={{
          background: '#f5f7fa',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              fontSize: '14px',
              color: '#666',
              marginBottom: '4px'
            }}>
              Rhythm Accuracy
            </div>
            <div style={{
              fontSize: '48px',
              fontWeight: '800',
              color: accuracy >= 80 ? '#4CAF50' : '#FF9800'
            }}>
              {accuracy}%
            </div>
          </div>
          <div style={{
            fontSize: '14px',
            color: '#666',
            marginBottom: '4px'
          }}>
            Total Compressions
          </div>
          <div style={{ fontSize: '32px', fontWeight: '700', color: '#333', marginBottom: '16px' }}>
            {compressionCount}
          </div>
          
          <div style={{
            fontSize: '16px',
            fontWeight: '600',
            color: accuracy >= 80 ? '#4CAF50' : '#FF9800',
            padding: '16px',
            background: accuracy >= 80 ? '#e8f5e9' : '#fff3e0',
            borderRadius: '12px',
            marginTop: '16px'
          }}>
            {accuracy >= 80 
              ? "Great rhythm! You could save a life." 
              : "Keep practising — consistency saves lives."}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
          <button
            onClick={resetPractice}
            style={{
              flex: 1,
              padding: '16px',
              background: '#f5f7fa',
              color: '#667eea',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
          <button
            onClick={goToQuiz}
            style={{
              flex: 1,
              padding: '16px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
          >
            Go to Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default PracticeModule;
