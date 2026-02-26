import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';
import { learnSteps, aedSteps } from '../data/learnSteps';

interface Props {
  language: Language;
  onHome: () => void;
}

const LearnModule: React.FC<Props> = ({ language, onHome }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTip, setShowTip] = useState(false);
  const t = translations[language];

  const allSteps = [...learnSteps];
  const totalMainSteps = learnSteps.length;
  const isTransitionScreen = currentStep === totalMainSteps;
  const isAEDStep = currentStep > totalMainSteps && currentStep <= totalMainSteps + aedSteps.length;
  const isFinalScreen = currentStep === totalMainSteps + aedSteps.length + 1;

  const handleNext = () => {
    setShowTip(false);
    if (currentStep < totalMainSteps + aedSteps.length + 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onHome();
    }
  };

  const renderStep = () => {
    if (currentStep < totalMainSteps) {
      const step = learnSteps[currentStep];
      return (
        <>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#00D4AA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 auto 24px'
          }}>
            {step.letter}
          </div>
          
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {step.title}
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.6',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {step.instruction}
          </p>
          
          <div style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            color: '#999',
            fontSize: '0.9rem'
          }}>
            [Illustration placeholder]
          </div>
          
          <button
            onClick={() => setShowTip(!showTip)}
            style={{
              backgroundColor: showTip ? '#00D4AA' : '#f0f0f0',
              color: showTip ? 'white' : '#666',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '16px',
              width: '100%',
              transition: 'all 0.2s'
            }}
          >
            💡 {showTip ? 'Hide Tip' : 'Show Tip'}
          </button>
          
          {showTip && (
            <div style={{
              backgroundColor: '#e8f8f5',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              borderLeft: '4px solid #00D4AA'
            }}>
              <p style={{ color: '#333', fontSize: '0.95rem', margin: 0 }}>
                {step.tip}
              </p>
            </div>
          )}
        </>
      );
    } else if (isTransitionScreen) {
      return (
        <>
          <div style={{
            fontSize: '64px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            ⚡
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {t.ifAEDArrives}
          </h2>
          <p style={{
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.6',
            textAlign: 'center'
          }}>
            Follow these steps to use the AED safely and effectively.
          </p>
        </>
      );
    } else if (isAEDStep) {
      const aedIndex = currentStep - totalMainSteps - 1;
      const step = aedSteps[aedIndex];
      return (
        <>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#00D4AA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'white',
            margin: '0 auto 24px'
          }}>
            {step.letter}
          </div>
          
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            {step.title}
          </h2>
          
          <p style={{
            fontSize: '1.1rem',
            color: '#555',
            lineHeight: '1.6',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {step.instruction}
          </p>
          
          <div style={{
            width: '100%',
            height: '200px',
            backgroundColor: '#f0f0f0',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
            color: '#999',
            fontSize: '0.9rem'
          }}>
            [Illustration placeholder]
          </div>
          
          <button
            onClick={() => setShowTip(!showTip)}
            style={{
              backgroundColor: showTip ? '#00D4AA' : '#f0f0f0',
              color: showTip ? 'white' : '#666',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 24px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '16px',
              width: '100%',
              transition: 'all 0.2s'
            }}
          >
            💡 {showTip ? 'Hide Tip' : 'Show Tip'}
          </button>
          
          {showTip && (
            <div style={{
              backgroundColor: '#e8f8f5',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '24px',
              borderLeft: '4px solid #00D4AA'
            }}>
              <p style={{ color: '#333', fontSize: '0.95rem', margin: 0 }}>
                {step.tip}
              </p>
            </div>
          )}
        </>
      );
    } else if (isFinalScreen) {
      return (
        <>
          <div style={{
            fontSize: '64px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            ✅
          </div>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '24px',
            textAlign: 'center'
          }}>
            {t.continueCompressions}
          </h2>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            <li style={{
              backgroundColor: '#f8f9fa',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '1rem',
              color: '#333'
            }}>
              ✓ {t.aedAnalyses}
            </li>
            <li style={{
              backgroundColor: '#f8f9fa',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '12px',
              fontSize: '1rem',
              color: '#333'
            }}>
              ✓ {t.casualtyWakes}
            </li>
            <li style={{
              backgroundColor: '#f8f9fa',
              padding: '16px',
              borderRadius: '8px',
              fontSize: '1rem',
              color: '#333'
            }}>
              ✓ {t.paramedicsTakeOver}
            </li>
          </ul>
        </>
      );
    }
  };

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
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {renderStep()}
          
          <button
            onClick={handleNext}
            style={{
              backgroundColor: '#00D4AA',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '16px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              marginTop: '24px',
              transition: 'transform 0.2s'
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            {isFinalScreen ? t.home : t.next}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearnModule;
