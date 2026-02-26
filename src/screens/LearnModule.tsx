import React, { useState } from 'react';
import { Language } from '../App';
import './LearnModule.css';

interface Props {
  onHome: () => void;
  language: Language;
}

interface LearnStep {
  badge: string;
  title: string;
  instruction: string;
  tip: string;
}

const learnSteps: LearnStep[] = [
  {
    badge: 'D',
    title: 'Danger',
    instruction: 'Ensure the scene is safe for you, the casualty, and bystanders. Look for hazards like traffic, fire, or electrical dangers.',
    tip: 'Never put yourself at risk. If the scene is unsafe, call for help immediately.'
  },
  {
    badge: 'R',
    title: 'Response',
    instruction: 'Tap the casualty\'s shoulders firmly and shout "Are you OK?" Check if they respond to your voice or touch.',
    tip: 'Try both shoulders and speak loudly. An unconscious person will not respond.'
  },
  {
    badge: 'S',
    title: 'Shout for Help',
    instruction: 'Call 995 immediately. Stay on the line and follow the dispatcher\'s instructions. Tell them the location and situation.',
    tip: 'Put the phone on speaker so you can continue helping while talking to emergency services.'
  },
  {
    badge: 'A',
    title: 'AED',
    instruction: 'Send someone to get an AED (Automated External Defibrillator) if available. Do not leave the casualty alone.',
    tip: 'AEDs are often found in public buildings, shopping malls, and office complexes.'
  },
  {
    badge: 'B',
    title: 'Breathing',
    instruction: 'Open the airway by tilting the head back. Look for chest rise and fall. Check for no more than 10 seconds.',
    tip: 'If the person is not breathing normally, start CPR immediately.'
  },
  {
    badge: 'C',
    title: 'Compressions',
    instruction: 'Place the heel of your hand on the lower half of the breastbone. Push hard and fast at 100-120 compressions per minute, 4-6cm deep.',
    tip: 'Allow the chest to fully recoil between compressions. Keep your arms straight and use your body weight.'
  },
  {
    badge: '⚡',
    title: 'If an AED Arrives',
    instruction: 'When an AED becomes available, follow these steps while continuing to provide care.',
    tip: 'Don\'t delay compressions. Have someone else prepare the AED while you continue CPR.'
  },
  {
    badge: '1',
    title: 'Turn on AED',
    instruction: 'Open the AED case and turn it on. The device will give you voice instructions.',
    tip: 'Modern AEDs are designed to be used by anyone. Just follow the voice prompts.'
  },
  {
    badge: '2',
    title: 'Apply Pads',
    instruction: 'Remove clothing from the chest. Attach the electrode pads as shown in the diagram. Follow the voice prompts.',
    tip: 'Make sure the chest is dry. Peel off the backing and press the pads firmly to the skin.'
  },
  {
    badge: '3',
    title: 'Press Shock Button',
    instruction: 'When the AED tells you to, make sure no one is touching the casualty and press the shock button.',
    tip: 'Shout "Clear!" before pressing the shock button to ensure everyone stands back.'
  },
  {
    badge: '✓',
    title: 'Continue Until Help Arrives',
    instruction: 'Continue compressions and follow AED instructions until: the AED analyses and advises, the casualty wakes up or breathes normally, or paramedics take over.',
    tip: 'Don\'t stop CPR unless the person shows signs of life or professional help arrives.'
  }
];

const LearnModule: React.FC<Props> = ({ onHome }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTip, setShowTip] = useState(false);

  const handleNext = () => {
    if (currentStep < learnSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      setShowTip(false);
    } else {
      onHome();
    }
  };

  const step = learnSteps[currentStep];

  return (
    <div className="learn-module">
      <button className="home-button" onClick={onHome}>
        🏠
      </button>

      <div className="learn-content">
        <div className="learn-card">
          <div className="badge">{step.badge}</div>
          <h2 className="step-title">{step.title}</h2>
          <p className="step-instruction">{step.instruction}</p>
          
          <div className="illustration-placeholder">
            <span>📋</span>
          </div>

          <button 
            className="tip-button"
            onClick={() => setShowTip(!showTip)}
          >
            💡 {showTip ? 'Hide Tip' : 'Show Tip'}
          </button>

          {showTip && (
            <div className="tip-box">
              {step.tip}
            </div>
          )}

          <button className="next-button" onClick={handleNext}>
            {currentStep === learnSteps.length - 1 ? 'Finish' : 'Next'}
          </button>

          <div className="progress-dots">
            {learnSteps.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnModule;
