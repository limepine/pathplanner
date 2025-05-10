export interface Waypoint {
  x: number;
  y: number;
  heading?: number; // radians
  velocity?: number;
}

export interface TrajectoryPoint {
  time: number;
  x: number;
  y: number;
  heading: number;
  velocity: number;
  angularVelocity: number;
  curvature: number;
}

export interface RobotConfig {
  trackWidth: number;
  maxVelocity: number;
  maxAcceleration: number;
  wheelDiameter: number;
}