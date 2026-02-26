import React from 'react';
import { Question } from '../screens/QuizModule';
import './QuizQuestion.css';

interface Props {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number) => void;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
}

const QuizQuestion: React.FC<Props> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  selectedAnswer,
  isCorrect
}) => {
  return (
    <div className="quiz-question">
      <div className="quiz-content">
        <div className="quiz-progress">
          Question {questionNumber} of {totalQuestions}
        </div>

        <div className="quiz-card">
          <h2 className="question-text">{question.question}</h2>

          <div className="options-list">
            {question.options.map((option, index) => {
              let className = 'option-button';
              
              if (selectedAnswer !== null) {
                if (index === question.correctAnswer) {
                  className += ' correct';
                } else if (index === selectedAnswer) {
                  className += ' incorrect';
                }
              }

              return (
                <button
                  key={index}
                  className={className}
                  onClick={() => onAnswer(index)}
                  disabled={selectedAnswer !== null}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
