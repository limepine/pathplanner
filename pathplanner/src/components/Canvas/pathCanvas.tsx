import React, { useEffect, useRef } from 'react';
import Paper from 'paper';
import { usePathStore } from '../../store/usePathStore';
import { generateCubicBezierPath } from '../../lib/pathGeneration';

const PathCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    waypoints,
    addWaypoint,
    updateWaypoint,
    selectedWaypoint,
    selectWaypoint
  } = usePathStore();

  useEffect(() => {
    if (!canvasRef.current) return;
    
    Paper.setup(canvasRef.current);
    const project = Paper.project;
    
    // Clear previous drawings
    project.clear();

    // Generate and draw Bézier path
    if (waypoints.length >= 2) {
      const pathPoints = generateCubicBezierPath(waypoints);
      const paperPath = new Paper.Path(
        pathPoints.map(p => new Paper.Point(p.x, p.y))
      );
      paperPath.strokeColor = new Paper.Color('blue');
      paperPath.strokeWidth = 2;
    }

    // Draw waypoints
    waypoints.forEach(waypoint => {
      const circle = new Paper.Path.Circle(
        new Paper.Point(waypoint.x, waypoint.y),
        8
      );
      circle.fillColor = selectedWaypoint === waypoint.id
        ? new Paper.Color('red')
        : new Paper.Color('green');
      
      // Type-safe event handlers using type assertions
      circle.onMouseDown = (event: paper.PathItemEvent) => {
        selectWaypoint(waypoint.id);
        event.stopPropagation();
        return false; // Prevent default behavior
      };

      circle.onMouseDrag = (event: paper.PathItemEvent) => {
        if (!waypoint.locked) {
          updateWaypoint(waypoint.id, {
            x: event.point.x,
            y: event.point.y
          });
        }
        return false;
      };
    });

    // Add new waypoint on click
    const tool = new Paper.Tool();
    tool.onMouseDown = (event: paper.ToolEvent) => {
      if (event.item) return;
      addWaypoint({
        x: event.point.x,
        y: event.point.y,
        heading: 0,
        velocity: 1.0
      });
    };

    return () => {
      tool.remove();
      project.clear();
    };
  }, [waypoints, selectedWaypoint]);

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