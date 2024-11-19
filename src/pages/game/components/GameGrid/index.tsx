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
  onLineComplete: (isCorrect: boolean) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  content, 
  difficulty, 
  currentRound, 
  onLineComplete 
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridSize, setGridSize] = useState(4);
  const [chars, setChars] = useState<string[]>([]);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [completedLines, setCompletedLines] = useState<Point[][]>([]);
  const [completedChars, setCompletedChars] = useState<string[]>([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successPoints, setSuccessPoints] = useState<Point[]>([]);

  // 重置所有状态的函数
  const resetState = useCallback(() => {
    setSelectedPoints([]);
    setIsSelecting(false);
    setCompletedChars([]);
    setShowError(false);
    setShowSuccess(false);
    setSuccessPoints([]);
    setCompletedLines([]);
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
    const xDiff = Math.abs(p1.x - p2.x);
    const yDiff = Math.abs(p1.y - p2.y);
    
    // 移动端使用更宽松的判定
    if (window.innerWidth <= 768) {
      // 允许2格以内的所有连接
      return Math.max(xDiff, yDiff) <= 2;
    }
    
    // PC端保持原有逻辑
    if (xDiff <= 1 && yDiff <= 1) {
      return true;
    }
    
    const maxDistance = difficulty === 1 ? 1 : difficulty === 2 ? 1.5 : 2;
    const distance = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    return distance <= maxDistance;
  };

  // 统一处理结束选择
  const handleSelectionEnd = () => {
    if (!isSelecting || selectedPoints.length < 2) {
      setSelectedPoints([]);
      setIsSelecting(false);
      return;
    }

    const selectedChars = selectedPoints.map(p => chars[p.y * gridSize + p.x]);
    const currentLineChars = content
      .split(/[，。]/)
      .filter(line => line.length > 0)
      .map(line => line.replace(/[，。！？；：]/g, ''))[currentRound];
    
    const isCorrect = selectedChars.join('') === currentLineChars;
    
    if (isCorrect) {
      setCompletedLines(prev => [...prev, [...selectedPoints]]);
      setCompletedChars(prev => [...prev, ...selectedChars]);
      setShowSuccess(true);
      setIsSelecting(false);
      
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setSelectedPoints([]);
        onLineComplete(true);
      }, 800); // 改为0.8秒

      return () => clearTimeout(timer);
    } else {
      setSelectedPoints([]);
      setIsSelecting(false);
    }
  };

  // 处理鼠标/触摸开始
  const handleStart = (char: string, x: number, y: number) => {
    if (completedChars.includes(char)) return;
    setIsSelecting(true);
    setSelectedPoints([{ x, y, char }]);
  };

  // 处理移动
  const handleMove = (char: string, x: number, y: number) => {
    if (!isSelecting || completedChars.includes(char)) return;
    
    const lastPoint = selectedPoints[selectedPoints.length - 1];
    if (lastPoint && isValidConnection(lastPoint, { x, y })) {
      if (!selectedPoints.some(p => p.x === x && p.y === y)) {
        setSelectedPoints(prev => [...prev, { x, y, char }]);
      }
    }
  };

  // 修改触摸移动处理
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!isSelecting) return;

    const touch = e.touches[0];
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    const cellSize = rect.width / gridSize;
    
    // 计算实际的网格坐标
    const gridX = Math.floor(x / cellSize);
    const gridY = Math.floor(y / cellSize);
    
    // 计算触摸点在单元格内的相对位置
    const cellX = x - (gridX * cellSize);
    const cellY = y - (gridY * cellSize);
    
    // 只有当触摸点足够接近字符中心时才触发连接
    const centerX = cellSize / 2;
    const centerY = cellSize / 2;
    const distance = Math.sqrt(
      Math.pow(cellX - centerX, 2) + 
      Math.pow(cellY - centerY, 2)
    );
    
    if (distance <= cellSize * 0.3 && // 只在字符周围40%的区域内触发
        gridX >= 0 && gridX < gridSize && 
        gridY >= 0 && gridY < gridSize) {
      const char = chars[gridY * gridSize + gridX];
      
      const lastPoint = selectedPoints[selectedPoints.length - 1];
      if (lastPoint && lastPoint.x === gridX && lastPoint.y === gridY) {
        return;
      }
      
      handleMove(char, gridX, gridY);
    }
  };

  return (
    <div 
      ref={gridRef}
      className={`
        ${styles.gridContainer} 
        ${showError ? styles.errorShake : ''} 
        ${showSuccess ? styles.successFlash : ''}
      `}
      onMouseDown={(e) => {
        e.preventDefault();  // 防止文字选择
      }}
      onMouseUp={handleSelectionEnd}
      onMouseLeave={handleSelectionEnd}
      onTouchStart={(e) => {
        e.preventDefault();  // 防止页面滚动
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={(e) => {
        e.preventDefault();
        handleSelectionEnd();
      }}
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
          gridSize={gridSize}
          completedLines={completedLines}
        />
        {chars.map((char, index) => {
          const x = index % gridSize;
          const y = Math.floor(index / gridSize);
          const isSelected = selectedPoints.some(p => p.x === x && p.y === y);
          const isCompleted = completedChars.includes(char);
          const isSuccessful = showSuccess && isSelected;

          return (
            <div
              key={`${char}-${x}-${y}`}
              className={`${styles.cell} ${isSelected ? styles.selected : ''} ${isCompleted ? styles.completed : ''} ${isSuccessful ? styles.success : ''}`}
              data-x={x}
              data-y={y}
              onMouseDown={() => handleStart(char, x, y)}
              onMouseEnter={() => handleMove(char, x, y)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleStart(char, x, y);
              }}
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