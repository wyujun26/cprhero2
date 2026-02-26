import React, { useState, useEffect } from 'react';
import { Language } from '../App';
import QuizQuestion from '../components/QuizQuestion';
import QuizResults from '../components/QuizResults';
import './QuizModule.css';

interface Props {
  onHome: () => void;
  language: Language;
}

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

const questionBank: Question[] = [
  {
    question: "What is the first thing you should do when you see someone collapse?",
    options: ["Start CPR immediately", "Check that the scene is safe", "Call 995", "Check for breathing"],
    correctAnswer: 1
  },
  {
    question: "Why do you check for danger before approaching a casualty?",
    options: ["To find the AED", "To protect yourself from becoming a second casualty", "To call for help", "To check their pulse"],
    correctAnswer: 1
  },
  {
    question: "Which of these is a danger you should check for?",
    options: ["The casualty's age", "Oncoming traffic or live electrical wires", "Whether the person is breathing", "The time of day"],
    correctAnswer: 1
  },
  {
    question: "If the scene is not safe, what should you do?",
    options: ["Approach carefully anyway", "Call out to the casualty from a safe distance and call 995", "Wait for someone else to help", "Start CPR from where you are"],
    correctAnswer: 1
  },
  {
    question: "A person has collapsed near a swimming pool edge. What is your first concern?",
    options: ["Starting compressions immediately", "Ensuring your own safety before approaching", "Finding the nearest AED", "Checking their breathing"],
    correctAnswer: 1
  },
  {
    question: "How do you check if a casualty is responsive?",
    options: ["Check their pulse", "Tap their shoulders firmly and shout \"Are you OK?\"", "Shake them vigorously", "Pour water on their face"],
    correctAnswer: 1
  },
  {
    question: "Where should you tap to check for response?",
    options: ["The face", "The chest", "The shoulders", "The hands"],
    correctAnswer: 2
  },
  {
    question: "A casualty does not respond to your shout. What does this tell you?",
    options: ["They are sleeping", "They may be unconscious and need help", "They are definitely not breathing", "You should leave them alone"],
    correctAnswer: 1
  },
  {
    question: "What should you shout when checking for response?",
    options: ["\"Wake up! Wake up!\"", "\"Hello, hello! Are you OK?\"", "\"Can you hear me? Blink if you can!\"", "\"Don't worry, help is coming!\""],
    correctAnswer: 1
  },
  {
    question: "Why do you tap the shoulders instead of shaking the whole body?",
    options: ["It is more polite", "To avoid worsening a potential spinal injury", "Shoulders are easier to reach", "It produces a louder response"],
    correctAnswer: 1
  },
  {
    question: "What number do you call for an ambulance in Singapore?",
    options: ["999", "911", "995", "112"],
    correctAnswer: 2
  },
  {
    question: "After calling 995, what should you do?",
    options: ["Hang up and start CPR", "Stay on the line", "Call again to confirm", "Wait for the ambulance before doing anything"],
    correctAnswer: 1
  },
  {
    question: "If there are bystanders around, what should you do when shouting for help?",
    options: ["Shout generally so everyone hears", "Point to a specific person and assign them to call 995", "Ask everyone to call 995 at the same time", "Focus on CPR and let someone else decide"],
    correctAnswer: 1
  },
  {
    question: "Why is it better to point to a specific bystander to call 995?",
    options: ["They are likely a medical professional", "It prevents the bystander effect where everyone assumes someone else will call", "It is faster than calling yourself", "The dispatcher responds quicker"],
    correctAnswer: 1
  },
  {
    question: "You are alone with an unconscious casualty. What should you do first — call 995 or start CPR?",
    options: ["Start CPR for 2 minutes then call", "Call 995 first, then begin CPR", "Start CPR and never stop", "Wait for someone to pass by"],
    correctAnswer: 1
  },
  {
    question: "What does AED stand for?",
    options: ["Automated Emergency Defibrillator", "Automated External Defibrillator", "Assisted Electrical Device", "Advanced Emergency Device"],
    correctAnswer: 1
  },
  {
    question: "If you are alone with a casualty, should you leave to get the AED?",
    options: ["Yes, the AED is the most important thing", "No, send someone else. Do not leave the casualty alone", "Yes, but only if the AED is nearby", "Only if the casualty is still breathing"],
    correctAnswer: 1
  },
  {
    question: "What does an AED do?",
    options: ["Pumps blood manually", "Delivers an electric shock to restore normal heart rhythm", "Monitors blood pressure", "Provides oxygen to the casualty"],
    correctAnswer: 1
  },
  {
    question: "Where are AEDs commonly found in Singapore?",
    options: ["Only in hospitals", "Only in ambulances", "In shopping malls, MRT stations, community centres, and public buildings", "Only in schools and offices"],
    correctAnswer: 2
  },
  {
    question: "When should you attach the AED pads?",
    options: ["Only after 5 minutes of CPR", "As soon as the AED arrives, without stopping CPR longer than necessary", "Only if the casualty has no pulse", "After the ambulance arrives"],
    correctAnswer: 1
  },
  {
    question: "How long should you take to check for breathing?",
    options: ["At least 30 seconds", "No more than 10 seconds", "1 minute", "As long as needed"],
    correctAnswer: 1
  },
  {
    question: "What are you looking for when checking breathing?",
    options: ["Mouth movement only", "Rise and fall of the chest", "Colour of the lips", "Whether their eyes are open"],
    correctAnswer: 1
  },
  {
    question: "A casualty is making gasping sounds but not breathing normally. What should you do?",
    options: ["Wait and observe for another 30 seconds", "Begin CPR — gasping is not normal breathing", "Place them in the recovery position", "Give them water"],
    correctAnswer: 1
  },
  {
    question: "If a casualty is breathing normally, what should you do?",
    options: ["Start CPR anyway", "Place them in the recovery position and monitor them", "Give rescue breaths only", "Leave them and call 995"],
    correctAnswer: 1
  },
  {
    question: "Why is the 10-second limit for checking breathing important?",
    options: ["It is a legal requirement", "Every second without CPR reduces survival chances", "The casualty may wake up on their own", "Breathing checks are not accurate beyond 10 seconds"],
    correctAnswer: 1
  },
  {
    question: "What is the correct compression rate?",
    options: ["60-80 per minute", "80-100 per minute", "100-120 per minute", "120-140 per minute"],
    correctAnswer: 2
  },
  {
    question: "What is the correct compression depth for an adult?",
    options: ["1-2 cm", "2-4 cm", "4-6 cm", "6-8 cm"],
    correctAnswer: 2
  },
  {
    question: "Where exactly on the chest do you place your hands for compressions?",
    options: ["Upper half of the breastbone", "Lower half of the breastbone", "Left side of the chest over the heart", "Centre of the stomach"],
    correctAnswer: 1
  },
  {
    question: "How should you position your hands during compressions?",
    options: ["Fingers spread flat on the chest", "One hand only for adults", "Heel of one hand on chest, other hand on top, fingers interlocked", "Both palms flat pressed together"],
    correctAnswer: 2
  },
  {
    question: "What should happen to your arms during compressions?",
    options: ["Bent at the elbows to control depth", "Straight and locked, using body weight", "Relaxed and loose", "Alternating between bent and straight"],
    correctAnswer: 1
  },
  {
    question: "What does full chest recoil mean?",
    options: ["Pressing deeper on each compression", "Allowing the chest to fully rise back up between compressions", "Removing your hands completely between compressions", "Alternating sides of the chest"],
    correctAnswer: 1
  },
  {
    question: "Why is full chest recoil important?",
    options: ["It prevents rib fractures", "It allows the heart to refill with blood between compressions", "It makes compressions easier", "It is required by guidelines only"],
    correctAnswer: 1
  },
  {
    question: "You have been doing CPR for 1 minute and are getting tired. What should you do?",
    options: ["Stop and rest for 30 seconds", "Slow down your rate to conserve energy", "Ask another bystander to take over without stopping", "Wait for the ambulance"],
    correctAnswer: 2
  },
  {
    question: "Is it normal to hear a cracking sound during compressions?",
    options: ["No, stop immediately if you hear this", "Yes, ribs may crack — continue CPR, it is still saving the person's life", "Yes, but reduce your depth", "Only in elderly casualties"],
    correctAnswer: 1
  },
  {
    question: "When should you stop CPR?",
    options: ["After 2 minutes regardless", "When you feel tired", "When the casualty shows signs of life, AED advises no shock, or paramedics take over", "After 10 cycles of 30 compressions"],
    correctAnswer: 2
  },
  {
    question: "What is the first step when using an AED?",
    options: ["Apply the pads", "Turn on the AED", "Press the shock button", "Check the casualty's pulse"],
    correctAnswer: 1
  },
  {
    question: "Where do you place the AED pads?",
    options: ["Both on the left side of the chest", "One on the upper right chest, one on the lower left side", "Both on the back", "One on the chest, one on the stomach"],
    correctAnswer: 1
  },
  {
    question: "What should everyone do when the AED says analysing?",
    options: ["Continue CPR", "Step back and ensure no one is touching the casualty", "Press the shock button", "Remove the pads"],
    correctAnswer: 1
  },
  {
    question: "After the AED delivers a shock, what should you do immediately?",
    options: ["Check for pulse for 1 minute", "Resume CPR starting with compressions", "Remove the pads", "Wait for the AED to advise again"],
    correctAnswer: 1
  },
  {
    question: "The AED says no shock advised. What does this mean?",
    options: ["The casualty is fine", "The AED is broken", "The heart rhythm does not require a shock — continue CPR", "Stop all treatment"],
    correctAnswer: 2
  },
  {
    question: "Can an AED be used on a child?",
    options: ["No, never", "Yes, use paediatric pads if available, or adult pads if not", "Only if they are over 8 years old", "Only with a doctor's approval"],
    correctAnswer: 1
  },
  {
    question: "Should you remove a casualty's wet clothing before applying AED pads?",
    options: ["No, it doesn't matter", "Yes, dry the chest before applying pads", "Only if they are completely soaked", "Water improves pad contact"],
    correctAnswer: 1
  },
  {
    question: "A casualty has a visible pacemaker implant under the skin on their chest. Where should you place the AED pad?",
    options: ["Directly over the pacemaker", "At least 8cm away from the pacemaker", "Do not use AED on someone with a pacemaker", "Place both pads on the back instead"],
    correctAnswer: 1
  },
  {
    question: "How does an AED guide a first responder who has never used one before?",
    options: ["It requires training to operate", "It gives clear voice prompts and visual instructions step by step", "It only works when operated by medical staff", "It automatically delivers treatment without any input"],
    correctAnswer: 1
  },
  {
    question: "What should you do if AED pads are already attached when you arrive?",
    options: ["Remove them and reattach fresh ones", "Turn on the AED and follow its instructions using the existing pads", "Do not use the AED", "Call 995 before proceeding"],
    correctAnswer: 1
  },
  {
    question: "What is the correct order of the DRS ABC framework?",
    options: ["Danger, Response, Shout, Breathing, AED, Compressions", "Danger, Response, Shout, AED, Breathing, Compressions", "Response, Danger, Shout, AED, Breathing, Compressions", "Danger, Shout, Response, AED, Compressions, Breathing"],
    correctAnswer: 1
  },
  {
    question: "You are alone and have called 995. What is your next priority?",
    options: ["Find the AED", "Begin CPR immediately", "Wait for the ambulance", "Check their wallet for medical information"],
    correctAnswer: 1
  },
  {
    question: "Who should perform hands-only CPR (no rescue breaths)?",
    options: ["Healthcare professionals only", "All lay bystanders — hands-only CPR is recommended for everyone who is not a healthcare professional", "Only trained first aiders", "Only adults performing CPR on other adults"],
    correctAnswer: 1
  },
  {
    question: "What is the most important factor in surviving a cardiac arrest?",
    options: ["Reaching a hospital quickly", "Early CPR and early defibrillation", "The age of the casualty", "Whether the AED is nearby"],
    correctAnswer: 1
  },
  {
    question: "A bystander says \"I don't want to do CPR in case I hurt them.\" What is the best response?",
    options: ["\"You're right, wait for the ambulance\"", "\"Imperfect CPR is always better than no CPR — you cannot make things worse\"", "\"Only do it if you're trained\"", "\"Call 995 and let them guide you instead\""],
    correctAnswer: 1
  }
];

const QuizModule: React.FC<Props> = ({ onHome }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    // Select 10 random questions
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
  }, []);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowResult(true);
      }
    }, 1500);
  };

  const handleRestart = () => {
    const shuffled = [...questionBank].sort(() => Math.random() - 0.5);
    setQuestions(shuffled.slice(0, 10));
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  if (questions.length === 0) {
    return (
      <div className="quiz-module">
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }

  if (showResult) {
    return (
      <QuizResults
        score={score}
        total={questions.length}
        onRestart={handleRestart}
        onHome={onHome}
      />
    );
  }

  return (
    <div className="quiz-module">
      <button className="home-button" onClick={onHome}>
        🏠
      </button>

      <QuizQuestion
        question={questions[currentQuestion]}
        questionNumber={currentQuestion + 1}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
        selectedAnswer={selectedAnswer}
        isCorrect={isCorrect}
      />
    </div>
  );
};

export default QuizModule;
