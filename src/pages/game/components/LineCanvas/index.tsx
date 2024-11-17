import { useEffect, useRef } from 'react';
import styles from './LineCanvas.module.css';

interface Point {
  x: number;
  y: number;
  char?: string;
}

interface LineCanvasProps {
  points: Point[];
  completedLines: Point[][];
  gridSize: number;
}

const LineCanvas: React.FC<LineCanvasProps> = ({ points, completedLines, gridSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 添加绘制箭头的函数
  const drawArrow = (ctx: CanvasRenderingContext2D, from: {x: number, y: number}, to: {x: number, y: number}) => {
    const headLength = 15;
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    
    // 绘制箭头头部
    ctx.beginPath();
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - headLength * Math.cos(angle - Math.PI / 6),
      to.y - headLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(to.x, to.y);
    ctx.lineTo(
      to.x - headLength * Math.cos(angle + Math.PI / 6),
      to.y - headLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    // 绘制已完成的线条和箭头
    ctx.strokeStyle = '#8B4513';
    ctx.lineWidth = 16;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.6;

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

      // 在每段线条上添加箭头
      for (let i = 0; i < line.length - 1; i++) {
        const from = getCenterPosition(line[i]);
        const to = getCenterPosition(line[i + 1]);
        drawArrow(ctx, from, to);
      }
    });

    // 绘制当前连线和箭头
    if (points.length >= 2) {
      ctx.strokeStyle = '#926F5B';
      ctx.globalAlpha = 1;
      
      ctx.beginPath();
      const startPos = getCenterPosition(points[0]);
      ctx.moveTo(startPos.x, startPos.y);
      
      for (let i = 1; i < points.length; i++) {
        const pos = getCenterPosition(points[i]);
        ctx.lineTo(pos.x, pos.y);
      }
      ctx.stroke();

      // 在当前连线的每段添加箭头
      for (let i = 0; i < points.length - 1; i++) {
        const from = getCenterPosition(points[i]);
        const to = getCenterPosition(points[i + 1]);
        drawArrow(ctx, from, to);
      }
    }
  }, [points, completedLines, gridSize]);

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