import React, { useEffect, useRef } from 'react';
import Paper from 'paper';
import { usePathStore } from '../../store/usePathStore';
import { generateCubicBezierPath } from '../../lib/pathGeneration';
import { generateMotionProfile } from '../../lib/motionprofile';

// Type extension for Paper.js events
declare global {
  namespace paper {
    interface ItemEvent {
      point: paper.Point;
      lastPoint: paper.Point;
      delta: paper.Point;
      downPoint: paper.Point;
      middlePoint: paper.Point;
      count: number;
      item: paper.Item;
      type: string;
      stop: () => void;
      preventDefault: () => void;
    }
  }
}

const PathCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    waypoints,
    addWaypoint,
    updateWaypoint,
    selectedWaypoint,
    selectWaypoint,
    robotConfig
  } = usePathStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    Paper.setup(canvasRef.current);
    const project = Paper.project;
    project.clear();

    if (waypoints.length >= 2) {
      const pathPoints = generateCubicBezierPath(waypoints);
      const trajectory = generateMotionProfile(pathPoints, {
        maxVelocity: robotConfig.maxVelocity,
        maxAcceleration: robotConfig.maxAcceleration,
        maxDeceleration: robotConfig.maxDeceleration
      });

      // Path drawing code remains the same...
    }

    // Draw waypoints with properly typed event handlers
    waypoints.forEach(waypoint => {
      const circle = new Paper.Path.Circle(
        new Paper.Point(waypoint.x, waypoint.y),
        8
      );
      circle.fillColor = selectedWaypoint === waypoint.id 
        ? new Paper.Color('red') 
        : new Paper.Color('green');
      
      // Corrected event handlers
      circle.onMouseDown = (event: paper.ItemEvent) => {
        selectWaypoint(waypoint.id);
        event.stop();
        return false;
      };

      circle.onMouseDrag = (event: paper.ItemEvent) => {
        if (!waypoint.locked) {
          updateWaypoint(waypoint.id, {
            x: event.point.x,
            y: event.point.y
          });
        }
        return false;
      };
    });

    // Tool remains the same...
  }, [waypoints, selectedWaypoint, robotConfig]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '500px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        backgroundColor: '#f8f8f8'
      }}
    />
  );
};

export default PathCanvas;