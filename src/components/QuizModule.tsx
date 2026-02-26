import React, { useState, useEffect } from 'react';
import { Language, QuizQuestion } from '../types';
import { translations } from '../data/translations';
import { quizQuestions } from '../data/quizQuestions';

interface Props {
  language: Language;
  onHome: () => void;
}

const QuizModule: React.FC<Props> = ({ language, onHome }) => {
  const [selectedQuestions, setSelectedQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const t = translations[language];

  useEffect(() => {
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    setSelectedQuestions(shuffled.slice(0, 10));
  }, []);

  if (selectedQuestions.length === 0) {
    return null;
  }

  const currentQuestion = selectedQuestions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (showFeedback) return;
    
    setSelectedAnswer(index);
    setShowFeedback(true);
    
    if (index === currentQuestion.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleShare = () => {
    const text = `${t.completionCard}\n${new Date().toLocaleDateString()}\nScore: ${score}/10`;
    if (navigator.share) {
      navigator.share({
        title: 'CPR Hero',
        text: text
      });
    } else {
      alert(text);
    }
  };

  if (quizFinished) {
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
              {score >= 8 ? '🏆' : score >= 6 ? '👍' : '📚'}
            </div>
            
            <h2 style={{
              fontSize: '1.8rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '16px'
            }}>
              {t.yourScore}
            </h2>
            
            <div style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              color: '#00D4AA',
              marginBottom: '32px'
            }}>
              {score}/10
            </div>
            
            <div style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              border: '2px dashed #00D4AA'
            }}>
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '8px'
              }}>
                {t.completionCard}
              </div>
              <div style={{ color: '#666', fontSize: '0.9rem' }}>
                {new Date().toLocaleDateString()}
              </div>
            </div>
            
            <div style={{
              display: 'flex',
              gap: '12px'
            }}>
              <button
                onClick={handleShare}
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
                {t.share}
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
          color: 'white',
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '16px',
          textAlign: 'center'
        }}>
          {t.questionOf
            .replace('{current}', (currentQuestionIndex + 1).toString())
            .replace('{total}', '10')}
        </div>

        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '32px 24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          <h2 style={{
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '24px',
            lineHeight: '1.5'
          }}>
            {currentQuestion.question}
          </h2>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {currentQuestion.options.map((option, index) => {
              let backgroundColor = '#f8f9fa';
              let borderColor = 'transparent';
              
              if (showFeedback) {
                if (index === currentQuestion.correctIndex) {
                  backgroundColor = '#d4edda';
                  borderColor = '#28a745';
                } else if (index === selectedAnswer) {
                  backgroundColor = '#f8d7da';
                  borderColor = '#dc3545';
                }
              } else if (index === selectedAnswer) {
                backgroundColor = '#e8f8f5';
                borderColor = '#00D4AA';
              }
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showFeedback}
                  style={{
                    backgroundColor,
                    border: `2px solid ${borderColor}`,
                    borderRadius: '8px',
                    padding: '16px',
                    fontSize: '1rem',
                    color: '#333',
                    cursor: showFeedback ? 'default' : 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  {option}
                </button>
              );
            })}
          </div>
          
          {showFeedback && (
            <>
              <div style={{
                marginTop: '24px',
                padding: '16px',
                borderRadius: '8px',
                backgroundColor: selectedAnswer === currentQuestion.correctIndex ? '#d4edda' : '#f8d7da',
                color: selectedAnswer === currentQuestion.correctIndex ? '#155724' : '#721c24',
                fontWeight: '600',
                textAlign: 'center'
              }}>
                {selectedAnswer === currentQuestion.correctIndex ? t.correct : t.incorrect}
              </div>
              
              <button
                onClick={handleNext}
                style={{
                  width: '100%',
                  marginTop: '24px',
                  backgroundColor: '#00D4AA',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '16px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                {currentQuestionIndex < selectedQuestions.length - 1 ? t.next : 'Finish'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModule;
