import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What does DRS ABC stand for?',
    options: [
      'Danger, Response, Shout, Airway, Breathing, CPR',
      'Danger, Response, Shout, AED, Breathing, Compressions',
      'Doctor, Response, Safety, AED, Breathing, Chest',
      'Danger, Rescue, Safety, Ambulance, Breathing, CPR'
    ],
    correctIndex: 1
  },
  {
    id: 'q2',
    question: 'What is the correct compression rate for CPR?',
    options: ['80-100 per minute', '100-120 per minute', '120-140 per minute', '60-80 per minute'],
    correctIndex: 1
  },
  {
    id: 'q3',
    question: 'How deep should chest compressions be for an adult?',
    options: ['2-3 cm', '3-4 cm', '4-6 cm', '6-8 cm'],
    correctIndex: 2
  },
  {
    id: 'q4',
    question: 'What should you do first when you find an unconscious person?',
    options: [
      'Start chest compressions immediately',
      'Check if the scene is safe',
      'Call for an ambulance',
      'Check for breathing'
    ],
    correctIndex: 1
  },
  {
    id: 'q5',
    question: 'How long should you check for breathing?',
    options: ['5 seconds', '10 seconds', '15 seconds', '20 seconds'],
    correctIndex: 1
  },
  {
    id: 'q6',
    question: 'What does AED stand for?',
    options: [
      'Automatic Emergency Device',
      'Automated External Defibrillator',
      'Advanced Emergency Defibrillator',
      'Automatic Electrical Device'
    ],
    correctIndex: 1
  },
  {
    id: 'q7',
    question: 'Where should you place your hands for chest compressions?',
    options: [
      'Upper half of the breastbone',
      'Lower half of the breastbone',
      'Left side of the chest',
      'Right side of the chest'
    ],
    correctIndex: 1
  },
  {
    id: 'q8',
    question: 'When should you stop CPR?',
    options: [
      'After 5 minutes',
      'When you get tired',
      'When the casualty wakes up or paramedics arrive',
      'After 30 compressions'
    ],
    correctIndex: 2
  },
  {
    id: 'q9',
    question: 'What should you do if an AED is available?',
    options: [
      'Wait for paramedics to use it',
      'Use it immediately and follow voice prompts',
      'Only use it if you are trained',
      'Use it after 10 minutes of CPR'
    ],
    correctIndex: 1
  },
  {
    id: 'q10',
    question: 'What is the emergency number in Singapore?',
    options: ['911', '999', '995', '112'],
    correctIndex: 2
  },
  {
    id: 'q11',
    question: 'Should you leave an unconscious person alone to get help?',
    options: [
      'Yes, always',
      'No, send someone else if possible',
      'Yes, if they are breathing',
      'Only if they are not breathing'
    ],
    correctIndex: 1
  },
  {
    id: 'q12',
    question: 'What should you do if the casualty starts breathing normally during CPR?',
    options: [
      'Continue CPR',
      'Stop CPR and place them in recovery position',
      'Give rescue breaths only',
      'Call for help again'
    ],
    correctIndex: 1
  },
  {
    id: 'q13',
    question: 'How should you check for a response?',
    options: [
      'Shake them vigorously',
      'Tap shoulders and shout "Are you OK?"',
      'Pour water on their face',
      'Slap their face'
    ],
    correctIndex: 1
  },
  {
    id: 'q14',
    question: 'What should you do before using an AED?',
    options: [
      'Dry the chest if wet',
      'Remove any medication patches',
      'Expose the chest',
      'All of the above'
    ],
    correctIndex: 3
  },
  {
    id: 'q15',
    question: 'Are occasional gasps considered normal breathing?',
    options: [
      'Yes, they are normal',
      'No, start CPR if you see gasps',
      'Only if they are frequent',
      'Yes, but monitor closely'
    ],
    correctIndex: 1
  }
];
