import React, { useEffect, useRef, useState } from 'react';
import { Song } from '../screens/PracticeModule';
import './RhythmGame.css';

interface Props {
  song: Song;
  onComplete: (correct: number, total: number) => void;
}

interface Tile {
  id: number;
  column: number;
  y: number;
  hit: boolean;
  missed: boolean;
}

const GAME_DURATION = 120; // 2 minutes in seconds
const COLUMNS = 4;
const TILE_HEIGHT = 60;
const TILE_WIDTH_PERCENT = 0.7; // 70% of column width
const TAP_ZONE_Y = 0.8; // 80% down the screen
const COUNTDOWN_DURATION = 3; // 3 seconds

const RhythmGame: React.FC<Props> = ({ song, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [correctTaps, setCorrectTaps] = useState(0);
  const [totalTaps, setTotalTaps] = useState(0);
  const [userBPM, setUserBPM] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [countdown, setCountdown] = useState(COUNTDOWN_DURATION);
  const [gameActive, setGameActive] = useState(false);

  const tilesRef = useRef<Tile[]>([]);
  const nextTileIdRef = useRef(0);
  const lastSpawnTimeRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(Date.now());
  const correctTapsRef = useRef(0);
  const totalTapsRef = useRef(0);
  const tapTimesRef = useRef<number[]>([]);

  // Countdown before game starts
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !gameActive) {
      setGameActive(true);
      startTimeRef.current = Date.now();
      lastSpawnTimeRef.current = Date.now();
    }
  }, [countdown, gameActive]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !gameActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = Math.min(window.innerWidth - 40, 500);
      canvas.height = window.innerHeight - 220;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const columnWidth = canvas.width / COLUMNS;
    const fallSpeed = (canvas.height * 0.6) / (60 / song.bpm); // Tiles fall in time with BPM
    const spawnInterval = (60 / song.bpm) * 1000; // milliseconds between spawns
    const beatInterval = 60 / song.bpm; // seconds per beat
    const toleranceWindow = beatInterval * 0.4; // 40% tolerance on either side

    // Game loop
    const gameLoop = () => {
      if (!gameActive) return;

      const now = Date.now();
      const elapsed = (now - startTimeRef.current) / 1000;
      const remaining = Math.max(0, GAME_DURATION - elapsed);
      setTimeLeft(Math.ceil(remaining));

      if (remaining <= 0) {
        setGameActive(false);
        onComplete(correctTapsRef.current, totalTapsRef.current);
        return;
      }

      // Spawn new tiles
      if (now - lastSpawnTimeRef.current >= spawnInterval) {
        const column = Math.floor(Math.random() * COLUMNS);
        tilesRef.current.push({
          id: nextTileIdRef.current++,
          column,
          y: -TILE_HEIGHT,
          hit: false,
          missed: false
        });
        lastSpawnTimeRef.current = now;
      }

      // Update tiles
      tilesRef.current = tilesRef.current.filter(tile => {
        if (tile.hit || tile.missed) {
          return tile.y < canvas.height + TILE_HEIGHT;
        }
        
        tile.y += fallSpeed / 60;

        // Check if tile passed tap zone without being hit
        if (!tile.hit && tile.y > canvas.height * TAP_ZONE_Y + TILE_HEIGHT) {
          tile.missed = true;
        }

        return tile.y < canvas.height + TILE_HEIGHT;
      });

      // Draw
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw columns
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      for (let i = 1; i < COLUMNS; i++) {
        ctx.beginPath();
        ctx.moveTo(i * columnWidth, 0);
        ctx.lineTo(i * columnWidth, canvas.height);
        ctx.stroke();
      }

      // Draw tap zone
      const tapZoneY = canvas.height * TAP_ZONE_Y;
      ctx.fillStyle = 'rgba(0, 212, 170, 0.3)';
      ctx.fillRect(0, tapZoneY - 20, canvas.width, 40);
      ctx.strokeStyle = '#00D4AA';
      ctx.lineWidth = 3;
      ctx.strokeRect(0, tapZoneY - 20, canvas.width, 40);

      // Draw tiles (narrower and taller)
      tilesRef.current.forEach(tile => {
        const x = tile.column * columnWidth;
        const tileWidth = columnWidth * TILE_WIDTH_PERCENT;
        const xOffset = (columnWidth - tileWidth) / 2;
        
        if (tile.hit) {
          ctx.fillStyle = '#00ff00';
        } else if (tile.missed) {
          ctx.fillStyle = '#ff0000';
        } else {
          ctx.fillStyle = '#000000';
        }

        ctx.fillRect(x + xOffset, tile.y, tileWidth, TILE_HEIGHT);
      });

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [song.bpm, gameActive, onComplete]);

  // Handle taps using overlay divs
  useEffect(() => {
    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    if (!overlay || !canvas || !gameActive) return;

    const tapZoneY = canvas.height * TAP_ZONE_Y;
    const beatInterval = (60 / song.bpm) * 1000; // milliseconds per beat
    const toleranceWindow = beatInterval * 0.4; // 40% tolerance

    const handleTap = (column: number) => {
      if (!gameActive) return;

      const now = Date.now();
      
      // Record tap time for BPM calculation
      tapTimesRef.current.push(now);
      if (tapTimesRef.current.length > 10) {
        tapTimesRef.current.shift(); // Keep only last 10 taps
      }

      // Calculate user BPM every 5 taps
      if (tapTimesRef.current.length >= 5) {
        const recentTaps = tapTimesRef.current.slice(-5);
        const intervals = [];
        for (let i = 1; i < recentTaps.length; i++) {
          intervals.push(recentTaps[i] - recentTaps[i - 1]);
        }
        const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const calculatedBPM = Math.round(60000 / avgInterval);
        setUserBPM(calculatedBPM);
      }

      // Increment total taps
      totalTapsRef.current++;
      setTotalTaps(totalTapsRef.current);
      
      // Find tiles in this column near tap zone with generous tolerance
      const hitTile = tilesRef.current.find(tile => {
        if (tile.column !== column || tile.hit || tile.missed) return false;
        
        const distanceFromTapZone = Math.abs(tile.y - tapZoneY);
        const timeBasedTolerance = (toleranceWindow / 1000) * (canvas.height * 0.6) / (60 / song.bpm);
        
        return distanceFromTapZone < timeBasedTolerance;
      });

      if (hitTile) {
        hitTile.hit = true;
        correctTapsRef.current++;
        setCorrectTaps(correctTapsRef.current);
      }
    };

    const columnDivs = overlay.querySelectorAll('.tap-column');
    const handlers: Array<(e: Event) => void> = [];

    columnDivs.forEach((div, index) => {
      const handler = (e: Event) => {
        e.preventDefault();
        handleTap(index);
      };
      div.addEventListener('touchstart', handler, { passive: false });
      div.addEventListener('mousedown', handler);
      handlers.push(handler);
    });

    return () => {
      columnDivs.forEach((div, index) => {
        div.removeEventListener('touchstart', handlers[index]);
        div.removeEventListener('mousedown', handlers[index]);
      });
    };
  }, [gameActive, song.bpm]);

  const accuracy = totalTaps > 0 ? Math.round((correctTaps / totalTaps) * 100) : 0;

  if (countdown > 0) {
    return (
      <div className="rhythm-game">
        <div className="countdown-screen">
          <div className="countdown-number">{countdown}</div>
          <div className="countdown-text">Get Ready!</div>
          <div className="song-info-countdown">
            <p className="song-name">{song.name}</p>
            <p className="song-bpm">{song.bpm} BPM</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rhythm-game">
      <div className="game-header">
        <div className="game-stat">
          <div className="stat-label">Score</div>
          <div className="stat-value">{correctTaps}/{totalTaps}</div>
        </div>
        <div className="game-stat">
          <div className="stat-label">Accuracy</div>
          <div className="stat-value">{accuracy}%</div>
        </div>
        <div className="game-stat">
          <div className="stat-label">Your BPM</div>
          <div className="stat-value">{userBPM || '--'}</div>
        </div>
        <div className="game-stat">
          <div className="stat-label">Time</div>
          <div className="stat-value">{timeLeft}s</div>
        </div>
      </div>

      <div className="game-container">
        <canvas ref={canvasRef} className="game-canvas" />
        <div ref={overlayRef} className="tap-overlay">
          {[...Array(COLUMNS)].map((_, i) => (
            <div key={i} className="tap-column" />
          ))}
        </div>
      </div>

      <div className="game-info">
        <p className="song-name">{song.name}</p>
        <p className="song-bpm">{song.bpm} BPM</p>
      </div>
    </div>
  );
};

export default RhythmGame;
