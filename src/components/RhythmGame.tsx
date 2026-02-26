import React, { useEffect, useRef, useState } from 'react';
import { Language, Song } from '../types';
import { translations } from '../data/translations';

interface Props {
  song: Song;
  language: Language;
  onFinish: (correct: number, total: number) => void;
  onHome: () => void;
}

interface Tile {
  id: number;
  column: number;
  y: number;
  hit: boolean;
  missed: boolean;
}

const RhythmGame: React.FC<Props> = ({ song, language, onFinish, onHome }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const column0Ref = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);
  const column3Ref = useRef<HTMLDivElement>(null);
  
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [correct, setCorrect] = useState(0);
  const [attempted, setAttempted] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [userBPM, setUserBPM] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [flashColumn, setFlashColumn] = useState<{ column: number; color: string } | null>(null);
  
  const tilesRef = useRef<Tile[]>([]);
  const correctRef = useRef(0);
  const attemptedRef = useRef(0);
  const gameStartTimeRef = useRef<number>(0);
  const lastTileTimeRef = useRef<number>(0);
  const tileIdCounterRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const tapTimesRef = useRef<number[]>([]);
  
  const t = translations[language];
  
  const CANVAS_WIDTH = 320;
  const CANVAS_HEIGHT = 600;
  const COLUMN_WIDTH = CANVAS_WIDTH / 4;
  const TILE_WIDTH = COLUMN_WIDTH * 0.7;
  const TILE_HEIGHT = 60;
  const TAP_ZONE_Y = CANVAS_HEIGHT - 100;
  const TAP_ZONE_HEIGHT = 80;
  const TILE_SPEED = 3;
  const BEAT_INTERVAL = (60 / song.bpm) * 1000;
  const TAP_WINDOW = BEAT_INTERVAL * 0.4;

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdownInterval);
          setGameStarted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    gameStartTimeRef.current = Date.now();
    lastTileTimeRef.current = Date.now();

    const spawnTile = () => {
      const now = Date.now();
      if (now - lastTileTimeRef.current >= BEAT_INTERVAL) {
        const column = Math.floor(Math.random() * 4);
        const newTile: Tile = {
          id: tileIdCounterRef.current++,
          column,
          y: -TILE_HEIGHT,
          hit: false,
          missed: false
        };
        tilesRef.current.push(newTile);
        setTiles([...tilesRef.current]);
        lastTileTimeRef.current = now;
      }
    };

    const updateTiles = () => {
      tilesRef.current = tilesRef.current.map(tile => ({
        ...tile,
        y: tile.y + TILE_SPEED
      }));

      tilesRef.current = tilesRef.current.filter(tile => {
        if (tile.y > CANVAS_HEIGHT && !tile.hit && !tile.missed) {
          tile.missed = true;
          return false;
        }
        return tile.y <= CANVAS_HEIGHT;
      });

      setTiles([...tilesRef.current]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(i * COLUMN_WIDTH, 0);
        ctx.lineTo(i * COLUMN_WIDTH, CANVAS_HEIGHT);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(0, 212, 170, 0.3)';
      ctx.fillRect(0, TAP_ZONE_Y, CANVAS_WIDTH, TAP_ZONE_HEIGHT);

      tilesRef.current.forEach(tile => {
        if (tile.hit) {
          ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        } else if (tile.missed) {
          ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        } else {
          ctx.fillStyle = '#333';
        }
        
        const tileX = tile.column * COLUMN_WIDTH + (COLUMN_WIDTH - TILE_WIDTH) / 2;
        ctx.fillRect(tileX, tile.y, TILE_WIDTH, TILE_HEIGHT);
      });
    };

    const gameLoop = () => {
      const elapsed = Date.now() - gameStartTimeRef.current;
      const secondsLeft = Math.max(0, 120 - Math.floor(elapsed / 1000));
      setTimeLeft(secondsLeft);

      if (secondsLeft === 0) {
        onFinish(correctRef.current, attemptedRef.current);
        return;
      }

      spawnTile();
      updateTiles();
      draw();

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gameStarted, song.bpm, onFinish]);

  const calculateUserBPM = () => {
    if (tapTimesRef.current.length < 2) return 0;
    
    const recentTaps = tapTimesRef.current.slice(-5);
    if (recentTaps.length < 2) return 0;
    
    const intervals: number[] = [];
    for (let i = 1; i < recentTaps.length; i++) {
      intervals.push(recentTaps[i] - recentTaps[i - 1]);
    }
    
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const bpm = Math.round(60000 / avgInterval);
    
    return bpm > 0 && bpm < 300 ? bpm : 0;
  };

  const handleColumnTap = (column: number) => {
    if (!gameStarted) return;

    const now = Date.now();
    tapTimesRef.current.push(now);
    
    attemptedRef.current++;
    setAttempted(attemptedRef.current);

    const hitTile = tilesRef.current.find(
      tile => 
        tile.column === column &&
        !tile.hit &&
        !tile.missed &&
        tile.y >= TAP_ZONE_Y - TAP_WINDOW &&
        tile.y <= TAP_ZONE_Y + TAP_ZONE_HEIGHT + TAP_WINDOW
    );

    if (hitTile) {
      hitTile.hit = true;
      correctRef.current++;
      setCorrect(correctRef.current);
      setFlashColumn({ column, color: 'rgba(0, 255, 0, 0.5)' });
      setTimeout(() => setFlashColumn(null), 200);
    } else {
      setFlashColumn({ column, color: 'rgba(255, 0, 0, 0.3)' });
      setTimeout(() => setFlashColumn(null), 200);
    }

    if (attemptedRef.current % 5 === 0) {
      const bpm = calculateUserBPM();
      setUserBPM(bpm);
    }
  };

  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  if (!gameStarted) {
    return (
      <div style={{
        minHeight: '100vh',
        padding: '20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '60px 40px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          textAlign: 'center',
          maxWidth: '400px',
          width: '100%'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '32px'
          }}>
            Get Ready!
          </h2>
          <div style={{
            fontSize: '5rem',
            fontWeight: 'bold',
            color: '#00D4AA',
            marginBottom: '24px'
          }}>
            {countdown}
          </div>
          <p style={{
            color: '#666',
            fontSize: '1rem'
          }}>
            Tap the tiles when they reach the green zone
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '8px',
          marginBottom: '16px',
          fontSize: '0.85rem',
          fontWeight: '600'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '2px' }}>Score</div>
            <div>
              <span style={{ color: '#00D4AA' }}>{correct}</span>
              <span style={{ color: '#999' }}>/{attempted}</span>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '2px' }}>Accuracy</div>
            <div style={{ color: '#00D4AA' }}>
              {accuracy}%
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '2px' }}>Your BPM</div>
            <div style={{ color: '#00D4AA' }}>
              {userBPM || '--'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: '#999', fontSize: '0.7rem', marginBottom: '2px' }}>Time</div>
            <div style={{ color: '#666' }}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}
          />
          
          <div
            ref={column0Ref}
            onTouchStart={(e) => {
              e.preventDefault();
              handleColumnTap(0);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              handleColumnTap(0);
            }}
            style={{
              position: 'absolute',
              left: '0%',
              top: 0,
              width: '25%',
              height: '100%',
              backgroundColor: flashColumn?.column === 0 ? flashColumn.color : 'transparent',
              transition: 'background-color 0.1s',
              cursor: 'pointer',
              touchAction: 'none'
            }}
          />
          <div
            ref={column1Ref}
            onTouchStart={(e) => {
              e.preventDefault();
              handleColumnTap(1);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              handleColumnTap(1);
            }}
            style={{
              position: 'absolute',
              left: '25%',
              top: 0,
              width: '25%',
              height: '100%',
              backgroundColor: flashColumn?.column === 1 ? flashColumn.color : 'transparent',
              transition: 'background-color 0.1s',
              cursor: 'pointer',
              touchAction: 'none'
            }}
          />
          <div
            ref={column2Ref}
            onTouchStart={(e) => {
              e.preventDefault();
              handleColumnTap(2);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              handleColumnTap(2);
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: '25%',
              height: '100%',
              backgroundColor: flashColumn?.column === 2 ? flashColumn.color : 'transparent',
              transition: 'background-color 0.1s',
              cursor: 'pointer',
              touchAction: 'none'
            }}
          />
          <div
            ref={column3Ref}
            onTouchStart={(e) => {
              e.preventDefault();
              handleColumnTap(3);
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              handleColumnTap(3);
            }}
            style={{
              position: 'absolute',
              left: '75%',
              top: 0,
              width: '25%',
              height: '100%',
              backgroundColor: flashColumn?.column === 3 ? flashColumn.color : 'transparent',
              transition: 'background-color 0.1s',
              cursor: 'pointer',
              touchAction: 'none'
            }}
          />
        </div>

        <button
          onClick={onHome}
          style={{
            width: '100%',
            marginTop: '16px',
            backgroundColor: '#f0f0f0',
            color: '#333',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          {t.home}
        </button>
      </div>
    </div>
  );
};

export default RhythmGame;
