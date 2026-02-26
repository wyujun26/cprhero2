import { LearnStep } from '../types';

export const learnSteps: LearnStep[] = [
  {
    id: 'd',
    letter: 'D',
    title: 'Danger',
    instruction: 'Ensure the scene is safe for you, bystanders, and the casualty before approaching.',
    tip: 'Look for hazards like traffic, fire, electrical wires, or unstable structures.'
  },
  {
    id: 'r',
    letter: 'R',
    title: 'Response',
    instruction: 'Tap the casualty\'s shoulders firmly and shout "Are you OK?" to check for responsiveness.',
    tip: 'If they respond, they are conscious. If no response, they may be unconscious.'
  },
  {
    id: 's',
    letter: 'S',
    title: 'Shout for Help',
    instruction: 'Call 995 immediately (or your local emergency number). Stay on the line and follow dispatcher instructions.',
    tip: 'Put the phone on speaker so you can continue helping while talking to emergency services.'
  },
  {
    id: 'a',
    letter: 'A',
    title: 'AED',
    instruction: 'Send someone to get an AED (Automated External Defibrillator) if available. Do not leave the casualty alone.',
    tip: 'AEDs are often found in public buildings, shopping malls, and sports facilities.'
  },
  {
    id: 'b',
    letter: 'B',
    title: 'Breathing',
    instruction: 'Check if the casualty is breathing normally. Look for chest rise and fall. Take no more than 10 seconds.',
    tip: 'Occasional gasps are not normal breathing. If in doubt, start CPR.'
  },
  {
    id: 'c',
    letter: 'C',
    title: 'Compressions',
    instruction: 'Place the heel of one hand on the lower half of the breastbone. Place your other hand on top. Push hard and fast at 100-120 compressions per minute, 4-6cm deep.',
    tip: 'Allow the chest to fully recoil between compressions. Minimize interruptions.'
  }
];

export const aedSteps: LearnStep[] = [
  {
    id: 'aed1',
    letter: '1',
    title: 'Turn on AED',
    instruction: 'Open the AED case and turn it on. The device will give you voice instructions.',
    tip: 'Follow the voice prompts carefully. The AED will guide you through each step.'
  },
  {
    id: 'aed2',
    letter: '2',
    title: 'Apply Pads',
    instruction: 'Remove or cut clothing to expose the chest. Attach the electrode pads as shown in the diagram on the pads.',
    tip: 'Make sure the chest is dry. Remove any medication patches before applying pads.'
  },
  {
    id: 'aed3',
    letter: '3',
    title: 'Deliver Shock',
    instruction: 'When the AED tells you to press the shock button, make sure no one is touching the casualty, then press it.',
    tip: 'Shout "Stand clear!" before delivering the shock to ensure everyone\'s safety.'
  }
];
