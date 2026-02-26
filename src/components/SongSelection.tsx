import React from 'react';
import { Song, songs } from '../screens/PracticeModule';
import './SongSelection.css';

interface Props {
  onSongSelect: (song: Song) => void;
}

const SongSelection: React.FC<Props> = ({ onSongSelect }) => {
  return (
    <div className="song-selection">
      <div className="song-content">
        <h1 className="song-title">Choose Your Rhythm</h1>
        <p className="song-subtitle">Select a song to practice compressions</p>
        
        <div className="song-list">
          {songs.map((song) => (
            <button
              key={song.name}
              className="song-button"
              onClick={() => onSongSelect(song)}
            >
              <div className="song-info">
                <h3>{song.name}</h3>
                <p>{song.bpm} BPM</p>
              </div>
              <div className="song-arrow">▶</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SongSelection;
