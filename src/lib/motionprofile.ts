import { Point, TrajectoryPoint, MotionConstraints } from '../types/pathTypes';

// Helper function to calculate distance between points
function calculateDistance(a: Point, b: Point): number {
  return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
}

export const generateMotionProfile = (
  path: Point[], 
  constraints: MotionConstraints
): TrajectoryPoint[] => {
  // Initialize points with zero velocity
  const initialPoints: TrajectoryPoint[] = path.map(p => ({ 
    ...p, 
    velocity: 0,
    time: 0 
  }));

  // Forward pass (apply max acceleration)
  const forwardPass = initialPoints.reduce((acc: TrajectoryPoint[], point, i) => {
    if (i === 0) return [point];
    
    const prev = acc[i-1];
    const dist = calculateDistance(prev, point);
    const maxReachable = Math.sqrt(
      Math.pow(prev.velocity, 2) + 
      2 * constraints.maxAcceleration * dist
    );
    
    const newPoint = {
      ...point,
      velocity: Math.min(maxReachable, constraints.maxVelocity)
    };
    
    return [...acc, newPoint];
  }, []);

  // Backward pass (apply max deceleration)
  const backwardPass = forwardPass
    .reverse()
    .reduce((acc: TrajectoryPoint[], point, i) => {
      if (i === 0) return [point];
      
      const prev = acc[i-1];
      const dist = calculateDistance(point, prev);
      const maxAllowed = Math.sqrt(
        Math.pow(prev.velocity, 2) + 
        2 * constraints.maxDeceleration * dist
      );
      
      const newVel = Math.min(point.velocity, maxAllowed);
      const newPoint = { ...point, velocity: newVel };
      
      return [...acc, newPoint];
    }, [])
    .reverse();

  // Calculate timing
  return backwardPass.map((point, i, arr) => ({
    ...point,
    time: i === 0 ? 0 : arr[i-1].time + 
      (calculateDistance(arr[i-1], point) / ((arr[i-1].velocity + point.velocity) / 2))
  }));
};