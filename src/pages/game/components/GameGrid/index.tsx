import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './GameGrid.module.css';
import LineCanvas from '../LineCanvas';

interface Point {
  x: number;
  y: number;
  char?: string;
}

interface GameGridProps {
  content: string;
  difficulty: number;
  currentRound: number;
  onLineComplete: (line: string) => void;
  onShuffle: () => void;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  content, 
  difficulty, 
  currentRound, 
  onLineComplete,
  onShuffle 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState(4);
  const [chars, setChars] = useState<string[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [completedChars, setCompletedChars] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const [completedLines, setCompletedLines] = useState<Point[][]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successPoints, setSuccessPoints] = useState<Point[]>([]);

  // 重置所有状态的函数
  const resetState = useCallback(() => {
    setSelectedPoints([]);
    setIsSelecting(false);
    setCompletedChars([]);
    setShowError(false);
    setCompletedLines([]);
    setShowSuccess(false);
    setSuccessPoints([]);
  }, []);

  // 监听回合变化
  useEffect(() => {
    resetState();
  }, [currentRound, resetState]);

  // 根据难度设置网格大小和连线范围
  useEffect(() => {
    switch(difficulty) {
      case 1: // 初级
        setGridSize(4);
        break;
      case 2: // 中级
        setGridSize(5);
        break;
      case 3: // 高级
        setGridSize(6);
        break;
      default:
        setGridSize(4);
    }
  }, [difficulty]);

  // 生成有效的字符布局
  const generateValidLayout = (currentChars: string[], gridSize: number): { grid: string[], positions: Point[] } => {
    const grid = new Array(gridSize * gridSize).fill('');
    const positions: Point[] = [];
    let attempts = 0;
    const maxAttempts = 100;

    while (attempts < maxAttempts) {
      // 随机选择起始位置
      const startX = Math.floor(Math.random() * gridSize);
      const startY = Math.floor(Math.random() * gridSize);
      const startIndex = startY * gridSize + startX;

      if (grid[startIndex] !== '') {
        attempts++;
        continue;
      }

      positions.length = 0;
      positions.push({ x: startX, y: startY });
      grid[startIndex] = currentChars[0];

      let success = true;
      // 尝试放置剩余字符
      for (let i = 1; i < currentChars.length; i++) {
        const lastPos = positions[i - 1];
        const validNeighbors = getValidNeighbors(lastPos, gridSize, grid);

        if (validNeighbors.length === 0) {
          success = false;
          break;
        }

        // 随机选择一个相邻位置
        const nextPos = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
        const index = nextPos.y * gridSize + nextPos.x;
        grid[index] = currentChars[i];
        positions.push(nextPos);
      }

      if (success) {
        return { grid, positions };
      }

      // 重置网格
      grid.fill('');
      attempts++;
    }

    throw new Error('无法生成有效布局');
  };

  // 获取有效的相邻位置
  const getValidNeighbors = (pos: Point, gridSize: number, grid: string[]): Point[] => {
    const neighbors: Point[] = [];
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    for (const [dx, dy] of directions) {
      const newX = pos.x + dx;
      const newY = pos.y + dy;
      
      if (newX >= 0 && newX < gridSize && 
          newY >= 0 && newY < gridSize && 
          grid[newY * gridSize + newX] === '') {
        neighbors.push({ x: newX, y: newY });
      }
    }

    return neighbors;
  };

  // 生成字符布局
  useEffect(() => {
    const lines = content
      .split(/[，。]/)
      .filter(line => line.length > 0)
      .map(line => line.replace(/[，。！？；：]/g, ''));
    
    const currentLine = lines[currentRound] || '';
    const currentChars = currentLine.split('');
    
    try {
      const { grid } = generateValidLayout(currentChars, gridSize);
      
      // 过滤掉当前回合诗句中的字
      const fillerChars = '山水风云花鸟月日星天地人春秋冬夏木火土金雨雪'
        .split('')
        .filter(char => !currentChars.includes(char));
      
      // 填充剩余空位
      for (let i = 0; i < grid.length; i++) {
        if (grid[i] === '') {
          const randomChar = fillerChars[Math.floor(Math.random() * fillerChars.length)];
          grid[i] = randomChar;
        }
      }
      
      setChars(grid);
    } catch (error) {
      console.error('生成布局失败:', error);
    }
  }, [content, currentRound, gridSize]);

  // 判断连线是否有效
  const isValidConnection = (p1: Point, p2: Point): boolean => {
    const maxDistance = difficulty === 1 ? 1 : difficulty === 2 ? 2 : 3;
    const xDiff = Math.abs(p1.x - p2.x);
    const yDiff = Math.abs(p1.y - p2.y);
    return xDiff <= maxDistance && yDiff <= maxDistance;
  };

  // 添加触摸事件处理
  const handleTouchStart = (char: string, x: number, y: number) => {
    if (completedChars.includes(char)) return;
    
    setIsSelecting(true);
    setSelectedPoints([{ x, y, char }]);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSelecting) return;
    
    const gridElement = gridRef.current;
    if (!gridElement) return;

    const rect = gridElement.getBoundingClientRect();
    const touch = e.touches[0];
    
    // 计算触摸点在网格中的相对位置
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    // 计算对应的网格坐标
    const cellSize = rect.width / gridSize;
    const gridX = Math.floor(x / cellSize);
    const gridY = Math.floor(y / cellSize);
    
    // 确保坐标在有效范围内
    if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
      const index = gridY * gridSize + gridX;
      const char = chars[index];
      
      handleCellMouseEnter(char, gridX, gridY);
    }
  };

  const handleTouchEnd = () => {
    handleCellMouseUp();
  };

  const handleCellMouseDown = (char: string, x: number, y: number) => {
    if (completedChars.includes(char)) return;
    
    setIsSelecting(true);
    setSelectedPoints([{ x, y, char }]);
  };

  const handleCellMouseEnter = (char: string, x: number, y: number) => {
    if (!isSelecting || completedChars.includes(char)) return;

    const lastPoint = selectedPoints[selectedPoints.length - 1];
    if (!lastPoint || !isValidConnection(lastPoint, { x, y })) return;

    const currentLine = content
      .split(/[，。]/)
      .filter(line => line.length > 0)
      .map(line => line.replace(/[，。！？；：]/g, ''))[currentRound];

    // 检查是否是当前诗句的下一个字
    const nextCharIndex = selectedPoints.length;
    if (char === currentLine[nextCharIndex]) {
      setSelectedPoints(prev => [...prev, { x, y, char }]);
    }
  };

  const handleCellMouseUp = () => {
    if (!isSelecting) return;
    
    const selectedLine = selectedPoints.map(p => p.char).join('');
    const lines = content
      .split(/[，。]/)
      .filter(line => line.length > 0)
      .map(line => line.replace(/[，。！？；：]/g, ''));
    
    const currentLine = lines[currentRound];

    if (selectedLine === currentLine) {
      setSuccessPoints(selectedPoints);
      setShowSuccess(true);
      setCompletedLines(prev => [...prev, selectedPoints]);
      setCompletedChars(prev => [...prev, ...selectedPoints.map(p => p.char)]);
      
      setTimeout(() => {
        onLineComplete(selectedLine);
        setSuccessPoints([]);
        setShowSuccess(false);
      }, 500);
    } else {
      // 连线失败
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
        setSelectedPoints([]);
        setIsSelecting(false);
      }, 500);
    }
    
    setSelectedPoints([]);
    setIsSelecting(false);
  };

  return (
    <div 
      ref={gridRef}
      className={`
        ${styles.gridContainer} 
        ${showError ? styles.errorShake : ''} 
        ${showSuccess ? styles.successFlash : ''}
      `}
      onMouseLeave={handleCellMouseUp}
      onMouseUp={handleCellMouseUp}
      onTouchStart={(e) => e.preventDefault()}
      onTouchMove={(e) => {
        e.preventDefault();
        handleTouchMove(e);
      }}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className={`
          ${styles.grid}
          ${successPoints.length > 0 ? styles.gridSuccess : ''}
        `}
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`
        }}
      >
        <LineCanvas 
          points={selectedPoints}
          completedLines={completedLines}
          gridSize={gridSize}
        />
        {chars.map((char, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSelected = selectedPoints.some(p => p.x === x && p.y === y);
          const isCompleted = completedChars.includes(char);

          return (
            <div
              key={`${char}-${x}-${y}`}
              className={`${styles.cell} ${isSelected ? styles.selected : ''} ${isCompleted ? styles.completed : ''}`}
              onMouseDown={() => handleCellMouseDown(char, x, y)}
              onMouseEnter={() => handleCellMouseEnter(char, x, y)}
              onTouchStart={() => handleTouchStart(char, x, y)}
            >
              {char}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GameGrid; 