import React, { useEffect, useRef } from 'react';
import Paper from 'paper';

const PathCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Setup Paper.js
    Paper.setup(canvasRef.current);
    
    // Create a path
    const path = new Paper.Path();
    path.strokeColor = new Paper.Color('black');
    path.strokeWidth = 2;

    // Tool setup with proper typing
    const tool = new Paper.Tool();
    
    // Correct event typing
    tool.onMouseDown = (event: Paper.ToolEvent) => {
      path.add(event.point);
      return false; // Return false to prevent default behavior
    };

    tool.onMouseDrag = (event: Paper.ToolEvent) => {
      path.add(event.point);
    };

    return () => {
      // Cleanup
      if (Paper.project) {
        Paper.project.clear();
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        background: '#f0f0f0',
        borderRadius: '4px'
      }}
    />
  );
};

export default PathCanvas;