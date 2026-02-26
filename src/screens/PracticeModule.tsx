import React, { useState } from 'react';
import { Language } from '../App';
import SongSelection from '../components/SongSelection';
import RhythmGame from '../components/RhythmGame';
import ResultsScreen from '../components/ResultsScreen';
import './PracticeModule.css';

interface Props {
  onHome: () => void;
  language: Language;
}

export interface Song {
  name: string;
  bpm: number;
}

export const songs: Song[] = [
  { name: 'Stayin\' Alive', bpm: 103 },
  { name: 'Eye of the Tiger', bpm: 109 },
  { name: 'Baby Shark', bpm: 115 }
];

const PracticeModule: React.FC<Props> = ({ onHome }) => {
  const [stage, setStage] = useState<'selection' | 'game' | 'results'>('selection');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [gameResults, setGameResults] = useState<{ correct: number; total: number; accuracy: number } | null>(null);

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song);
    setStage('game');
  };

  const handleGameComplete = (correct: number, total: number) => {
    const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0;
    setGameResults({ correct, total, accuracy });
    setStage('results');
  };

  const handleTryAgain = () => {
    setStage('selection');
    setSelectedSong(null);
    setGameResults(null);
  };

  return (
    <div className="practice-module">
      <button className="home-button" onClick={onHome}>
        🏠
      </button>

      {stage === 'selection' && (
        <SongSelection onSongSelect={handleSongSelect} />
      )}

      {stage === 'game' && selectedSong && (
        <RhythmGame 
          song={selectedSong}
          onComplete={handleGameComplete}
        />
      )}

      {stage === 'results' && gameResults && (
        <ResultsScreen
          compressions={gameResults.total}
          accuracy={gameResults.accuracy}
          onTryAgain={handleTryAgain}
          onHome={onHome}
        />
      )}
    </div>
  );
};

export default PracticeModule;
