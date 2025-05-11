export interface Point {
  x: number;
  y: number;
}

export interface Waypoint extends Point {
  id: string;
  heading?: number; // radians
  velocity?: number; // m/s
  locked?: boolean;
}

export interface RobotConfig {
  trackWidth: number; // meters
  maxVelocity: number; // m/s
  maxAcceleration: number;
  maxDeceleration: number; // m/s²
  wheelDiameter: number; // meters
}

// Extend Paper.js types
declare global {
  namespace paper {
    interface ToolEvent {
      point: Point;
      downPoint: Point;
      middlePoint: Point;
      count: number;
      item: Item;
    }
  }
}
export interface Point {
  x: number;
  y: number;
}

export interface TrajectoryPoint extends Point {
  velocity: number;
  time: number;
  heading?: number;
  angularVelocity?: number;
  isWaypoint?: boolean;
}

export interface MotionConstraints {
  maxVelocity: number;
  maxAcceleration: number;
  maxDeceleration: number;
}