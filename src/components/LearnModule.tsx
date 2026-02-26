import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import TranslationNotice from './TranslationNotice';

interface LearnModuleProps {
  onBack: () => void;
  language: string;
  onChangeLanguage: () => void;
}

interface Lesson {
  letter?: string;
  step?: number;
  type?: string;
  title: string;
  instruction: string;
  color: string;
  emoji: string;
  animation: 'danger' | 'tap' | 'phone' | 'aed' | 'breathing' | 'compressions' | 'power' | 'pads' | 'shock' | 'ambulance' | 'transition';
  interaction: {
    type: 'reveal' | 'truefalse' | 'tap';
    question?: string;
    answer?: boolean;
    revealText?: string;
  };
}

const lessons: Lesson[] = [
  {
    letter: 'D',
    title: 'Check for Danger',
    instruction: 'Before approaching, ensure the area is safe for both you and the casualty. Look for hazards like traffic, fire, or electrical dangers.',
    color: '#FF6B6B',
    emoji: '⚠️',
    animation: 'danger',
    interaction: {
      type: 'reveal',
      revealText: 'Check for: Traffic, Fire, Electrical hazards, Falling objects, Toxic fumes'
    }
  },
  {
    letter: 'R',
    title: 'Check for Response',
    instruction: 'Gently tap the casualty\'s shoulders and shout "Are you OK?" loudly and clearly. Check if they respond to your voice or touch.',
    color: '#FF8E53',
    emoji: '👋',
    animation: 'tap',
    interaction: {
      type: 'truefalse',
      question: 'Should you shake the casualty vigorously?',
      answer: false
    }
  },
  {
    letter: 'S',
    title: 'Shout for Help',
    instruction: 'Call emergency services immediately (995). Ask someone nearby to help or put your phone on speaker while you continue.',
    color: '#FFA94D',
    emoji: '📞',
    animation: 'phone',
    interaction: {
      type: 'tap',
      revealText: 'Emergency Number: 995'
    }
  },
  {
    letter: 'A',
    title: 'Get AED',
    instruction: 'Send someone to get an Automated External Defibrillator (AED) if available. Do NOT leave the casualty alone.',
    color: '#4ECDC4',
    emoji: '🔌',
    animation: 'aed',
    interaction: {
      type: 'truefalse',
      question: 'Should you leave the casualty to get the AED yourself?',
      answer: false
    }
  },
  {
    letter: 'B',
    title: 'Check Breathing',
    instruction: 'Tilt the head back, lift the chin, and check for normal breathing for no more than 10 seconds. Look, listen, and feel.',
    color: '#45B7D1',
    emoji: '👃',
    animation: 'breathing',
    interaction: {
      type: 'reveal',
      revealText: 'Look for chest movement, Listen for breath sounds, Feel for air on your cheek'
    }
  },
  {
    letter: 'C',
    title: 'Chest Compressions',
    instruction: 'Place heel of hand on center of chest. Push hard and fast at 100-120 BPM, 4-6cm deep. Allow full chest recoil between compressions.',
    color: '#96CEB4',
    emoji: '💪',
    animation: 'compressions',
    interaction: {
      type: 'truefalse',
      question: 'Compressions should be 4-6cm deep?',
      answer: true
    }
  },
  {
    type: 'transition',
    title: 'If an AED arrives:',
    instruction: 'An Automated External Defibrillator can significantly increase survival chances. Follow these steps carefully.',
    color: '#9B59B6',
    emoji: '⚡',
    animation: 'transition',
    interaction: {
      type: 'tap',
      revealText: 'AED can increase survival rate by up to 70%'
    }
  },
  {
    step: 1,
    title: 'Turn on the AED',
    instruction: 'Press the power button on the AED device. It will begin providing voice instructions immediately.',
    color: '#E74C3C',
    emoji: '🔘',
    animation: 'power',
    interaction: {
      type: 'tap',
      revealText: 'The AED will guide you with clear voice instructions'
    }
  },
  {
    step: 2,
    title: 'Apply Pads to Chest',
    instruction: 'Follow voice prompts and apply pads to bare chest as shown on the pad diagrams. Remove any clothing and ensure chest is dry.',
    color: '#E67E22',
    emoji: '📋',
    animation: 'pads',
    interaction: {
      type: 'truefalse',
      question: 'Can you apply pads over clothing?',
      answer: false
    }
  },
  {
    step: 3,
    title: 'Press Shock Button',
    instruction: 'Press the shock button when instructed by the AED. If no shock is advised, continue chest compressions immediately.',
    color: '#F39C12',
    emoji: '⚡',
    animation: 'shock',
    interaction: {
      type: 'reveal',
      revealText: 'Stand clear! Make sure no one is touching the casualty before shocking'
    }
  },
  {
    type: 'final',
    title: 'Continue Until Help Arrives',
    instruction: 'Continue compressions and follow AED instructions until: AED analyses and advises, casualty wakes up or breathes normally, or paramedics take over.',
    color: '#27AE60',
    emoji: '🚑',
    animation: 'ambulance',
    interaction: {
      type: 'tap',
      revealText: 'Never stop until professional help arrives or casualty recovers'
    }
  }
];

const AnimatedIllustration: React.FC<{ type: string }> = ({ type }) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame(prev => (prev + 1) % 2);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const getAnimation = () => {
    switch (type) {
      case 'danger':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #FFE5E5 0%, #FFB3B3 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              fontSize: '80px',
              animation: 'pulse 2s infinite',
              transform: frame === 0 ? 'scale(1)' : 'scale(1.1)'
            }}>
              ⚠️
            </div>
          </div>
        );
      
      case 'tap':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #FFF4E5 0%, #FFD9B3 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '80px',
              transform: frame === 0 ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'transform 0.3s'
            }}>
              👋
            </div>
          </div>
        );
      
      case 'phone':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #E5F4FF 0%, #B3DFFF 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '80px',
              transform: frame === 0 ? 'rotate(-5deg)' : 'rotate(5deg)',
              transition: 'transform 0.5s'
            }}>
              📞
            </div>
          </div>
        );
      
      case 'aed':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #E5FFF4 0%, #B3FFD9 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '80px',
              opacity: frame === 0 ? 1 : 0.6,
              transition: 'opacity 0.5s'
            }}>
              🔌
            </div>
          </div>
        );
      
      case 'breathing':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #E5F9FF 0%, #B3E5FF 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '120px',
              height: '80px',
              background: '#4ECDC4',
              borderRadius: '50%',
              transform: frame === 0 ? 'scaleY(1)' : 'scaleY(1.2)',
              transition: 'transform 1s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px'
            }}>
              👃
            </div>
          </div>
        );
      
      case 'compressions':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #F0FFE5 0%, #D9FFB3 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              background: '#96CEB4',
              borderRadius: '50%',
              transform: frame === 0 ? 'scale(1)' : 'scale(0.85)',
              transition: 'transform 0.6s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '50px'
            }}>
              💪
            </div>
          </div>
        );
      
      case 'power':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #FFE5E5 0%, #FFB3B3 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '80px',
              opacity: frame === 0 ? 1 : 0.5,
              transition: 'opacity 0.5s'
            }}>
              🔘
            </div>
          </div>
        );
      
      case 'pads':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #FFF4E5 0%, #FFD9B3 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '60px',
              height: '80px',
              background: '#E67E22',
              borderRadius: '8px',
              transform: frame === 0 ? 'translateY(0)' : 'translateY(-5px)',
              transition: 'transform 0.5s'
            }} />
            <div style={{
              width: '60px',
              height: '80px',
              background: '#E67E22',
              borderRadius: '8px',
              transform: frame === 0 ? 'translateY(0)' : 'translateY(-5px)',
              transition: 'transform 0.5s',
              transitionDelay: '0.2s'
            }} />
          </div>
        );
      
      case 'shock':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #FFFBE5 0%, #FFF4B3 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '80px',
              transform: frame === 0 ? 'scale(1) rotate(0deg)' : 'scale(1.2) rotate(10deg)',
              transition: 'transform 0.3s'
            }}>
              ⚡
            </div>
          </div>
        );
      
      case 'ambulance':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #E5FFE5 0%, #B3FFB3 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '80px',
              transform: frame === 0 ? 'translateX(-10px)' : 'translateX(10px)',
              transition: 'transform 0.8s'
            }}>
              🚑
            </div>
          </div>
        );
      
      case 'transition':
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #F4E5FF 0%, #D9B3FF 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            <div style={{
              fontSize: '80px',
              opacity: frame === 0 ? 1 : 0.7,
              transition: 'opacity 0.5s'
            }}>
              ⚡
            </div>
          </div>
        );
      
      default:
        return (
          <div style={{
            width: '100%',
            height: '200px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '64px'
          }}>
            {lessons.find(l => l.animation === type)?.emoji || '❤️'}
          </div>
        );
    }
  };

  return getAnimation();
};

const LearnModule: React.FC<LearnModuleProps> = ({ onBack, language, onChangeLanguage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [interactionComplete, setInteractionComplete] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);

  const handleNext = () => {
    if (currentStep < lessons.length - 1) {
      setCurrentStep(currentStep + 1);
      setInteractionComplete(false);
      setRevealed(false);
      setSelectedAnswer(null);
    } else {
      setCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setInteractionComplete(false);
      setRevealed(false);
      setSelectedAnswer(null);
    }
  };

  const handleInteraction = (answer?: boolean) => {
    const lesson = lessons[currentStep];
    
    if (lesson.interaction.type === 'reveal' || lesson.interaction.type === 'tap') {
      setRevealed(true);
      setInteractionComplete(true);
    } else if (lesson.interaction.type === 'truefalse' && answer !== undefined) {
      setSelectedAnswer(answer);
      setInteractionComplete(true);
    }
  };

  if (completed) {
    return (
      <div style={{
        minHeight: '100vh',
        padding: '24px',
        display: 'flex',
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
          background: 'white',
          borderRadius: '24px',
          padding: '40px 24px',
          textAlign: 'center',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          <TranslationNotice language={language} />
          <CheckCircle size={80} color="#4CAF50" style={{ margin: '0 auto 24px' }} />
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#333',
            marginBottom: '16px'
          }}>
            Great Job!
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#666',
            marginBottom: '32px',
            lineHeight: '1.6'
          }}>
            You've completed the DRS ABC framework and AED training. You're one step closer to becoming a CPR Hero!
          </p>
          <button
            onClick={onBack}
            style={{
              width: '100%',
              padding: '16px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const lesson = lessons[currentStep];

  const renderInteraction = () => {
    if (lesson.interaction.type === 'reveal') {
      return (
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={() => handleInteraction()}
            disabled={revealed}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #667eea',
              background: revealed ? '#f0f4ff' : 'white',
              color: '#667eea',
              fontSize: '16px',
              fontWeight: '700',
              cursor: revealed ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
          >
            {revealed ? <Eye size={20} /> : <EyeOff size={20} />}
            {revealed ? 'Key Tip Revealed' : 'Tap to reveal key tip'}
          </button>
          {revealed && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: '12px',
              background: '#f0f4ff',
              border: '2px solid #667eea'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#333',
                lineHeight: '1.5',
                fontWeight: '600'
              }}>
                💡 {lesson.interaction.revealText}
              </p>
            </div>
          )}
        </div>
      );
    }

    if (lesson.interaction.type === 'tap') {
      return (
        <div style={{ marginTop: '24px' }}>
          <button
            onClick={() => handleInteraction()}
            disabled={revealed}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: '2px solid #667eea',
              background: revealed ? '#f0f4ff' : 'white',
              color: '#667eea',
              fontSize: '16px',
              fontWeight: '700',
              cursor: revealed ? 'default' : 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {revealed ? '✓ Tapped' : 'Tap to learn more'}
          </button>
          {revealed && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              borderRadius: '12px',
              background: '#f0f4ff',
              border: '2px solid #667eea'
            }}>
              <p style={{
                fontSize: '14px',
                color: '#333',
                lineHeight: '1.5',
                fontWeight: '600'
              }}>
                💡 {lesson.interaction.revealText}
              </p>
            </div>
          )}
        </div>
      );
    }

    if (lesson.interaction.type === 'truefalse') {
      return (
        <div style={{ marginTop: '24px' }}>
          <p style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#333',
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            {lesson.interaction.question}
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => handleInteraction(true)}
              disabled={selectedAnswer !== null}
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: '12px',
                border: selectedAnswer === true 
                  ? (lesson.interaction.answer === true ? '2px solid #4CAF50' : '2px solid #F44336')
                  : '2px solid #e0e0e0',
                background: selectedAnswer === true
                  ? (lesson.interaction.answer === true ? '#E8F5E9' : '#FFEBEE')
                  : 'white',
                color: selectedAnswer === true
                  ? (lesson.interaction.answer === true ? '#2E7D32' : '#C62828')
                  : '#333',
                fontSize: '16px',
                fontWeight: '700',
                cursor: selectedAnswer !== null ? 'default' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              True
            </button>
            <button
              onClick={() => handleInteraction(false)}
              disabled={selectedAnswer !== null}
              style={{
                flex: 1,
                padding: '16px',
                borderRadius: '12px',
                border: selectedAnswer === false
                  ? (lesson.interaction.answer === false ? '2px solid #4CAF50' : '2px solid #F44336')
                  : '2px solid #e0e0e0',
                background: selectedAnswer === false
                  ? (lesson.interaction.answer === false ? '#E8F5E9' : '#FFEBEE')
                  : 'white',
                color: selectedAnswer === false
                  ? (lesson.interaction.answer === false ? '#2E7D32' : '#C62828')
                  : '#333',
                fontSize: '16px',
                fontWeight: '700',
                cursor: selectedAnswer !== null ? 'default' : 'pointer',
                transition: 'all 0.2s'
              }}
            >
              False
            </button>
          </div>
          {selectedAnswer !== null && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              borderRadius: '8px',
              background: selectedAnswer === lesson.interaction.answer ? '#E8F5E9' : '#FFF3E0',
              border: `2px solid ${selectedAnswer === lesson.interaction.answer ? '#4CAF50' : '#FF9800'}`
            }}>
              <p style={{
                fontSize: '14px',
                color: '#333',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {selectedAnswer === lesson.interaction.answer ? '✓ Correct!' : '✗ Incorrect'}
              </p>
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      {/* Header */}
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
            justifyContent: 'center'
          }}
        >
          <ArrowLeft size={24} color="white" />
        </button>
        <div style={{
          flex: 1,
          textAlign: 'center',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600'
        }}>
          {currentStep + 1} of {lessons.length}
        </div>
        <LanguageSwitcher onChangeLanguage={onChangeLanguage} language={language} />
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '8px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '4px',
        marginBottom: '32px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${((currentStep + 1) / lessons.length) * 100}%`,
          height: '100%',
          background: 'white',
          borderRadius: '4px',
          transition: 'width 0.3s'
        }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '480px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '32px 24px',
          marginBottom: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
        }}>
          <TranslationNotice language={language} />

          {/* Badge */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: lesson.color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: lesson.letter || lesson.step ? '800' : 'normal',
              color: lesson.letter || lesson.step ? 'white' : 'inherit'
            }}>
              {lesson.letter || lesson.step || lesson.emoji}
            </span>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#333',
            textAlign: 'center',
            marginBottom: '16px'
          }}>
            {lesson.title}
          </h2>

          <p style={{
            fontSize: '16px',
            color: '#666',
            lineHeight: '1.6',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            {lesson.instruction}
          </p>

          {/* Animated Illustration */}
          <AnimatedIllustration type={lesson.animation} />

          {renderInteraction()}
        </div>

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          {currentStep > 0 && (
            <button
              onClick={handlePrevious}
              style={{
                flex: 1,
                padding: '16px',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <ArrowLeft size={20} />
              Previous
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!interactionComplete}
            style={{
              flex: currentStep > 0 ? 2 : 1,
              padding: '16px',
              background: interactionComplete ? 'white' : 'rgba(255,255,255,0.3)',
              color: interactionComplete ? '#667eea' : 'rgba(255,255,255,0.7)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: interactionComplete ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: interactionComplete ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
            }}
          >
            {currentStep === lessons.length - 1 ? 'Complete' : 'Next'}
            {currentStep < lessons.length - 1 && <ArrowRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnModule;
