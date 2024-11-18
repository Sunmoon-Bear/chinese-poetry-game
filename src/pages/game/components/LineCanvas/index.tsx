import { useEffect, useRef } from 'react';
import styles from './LineCanvas.module.css';

interface Point {
  x: number;
  y: number;
  char?: string;
}

interface Props {
  points: Point[];
  gridSize: number;
  completedLines: Point[][];
}

const LineCanvas = ({ points, gridSize, completedLines }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const totalPadding = 64;
    const availableSpace = canvas.width - totalPadding;
    const gap = 20;
    const cellSize = (availableSpace - (gap * (gridSize - 1))) / gridSize;
    const startOffset = totalPadding / 2;

    const getCenterPosition = (point: Point) => ({
      x: startOffset + point.x * (cellSize + gap) + cellSize / 2,
      y: startOffset + point.y * (cellSize + gap) + cellSize / 2
    });

    // 绘制已完成的线条
    if (completedLines && completedLines.length > 0) {
      ctx.strokeStyle = '#8B4513';  // 深棕色
      ctx.lineWidth = 24;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.7;

      completedLines.forEach(line => {
        if (line.length < 2) return;
        
        ctx.beginPath();
        const startPos = getCenterPosition(line[0]);
        ctx.moveTo(startPos.x, startPos.y);
        
        for (let i = 1; i < line.length; i++) {
          const pos = getCenterPosition(line[i]);
          ctx.lineTo(pos.x, pos.y);
        }
        ctx.stroke();
      });
    }

    // 绘制当前连线
    if (points.length > 1) {
      ctx.strokeStyle = '#926F5B';
      ctx.lineWidth = 24;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.7;

      ctx.beginPath();
      const startPos = getCenterPosition(points[0]);
      ctx.moveTo(startPos.x, startPos.y);

      for (let i = 1; i < points.length; i++) {
        const pos = getCenterPosition(points[i]);
        ctx.lineTo(pos.x, pos.y);
      }
      ctx.stroke();
    }
  }, [points, gridSize, completedLines]);

  return (
    <canvas 
      ref={canvasRef}
      className={styles.canvas}
      width={500}
      height={500}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default LineCanvas;