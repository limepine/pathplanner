export interface Waypoint {
  id: string;
  x: number;
  y: number;
  heading?: number; // radians
  velocity?: number;
  locked?: boolean;
}