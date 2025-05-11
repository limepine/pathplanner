import { Point, Waypoint } from '../types/pathTypes';

export const generateCubicBezierPath = (
  waypoints: Waypoint[],
  segmentsPerCurve = 20,
  tension = 0.5
): Point[] => {
  if (waypoints.length < 2) return [];

  const points: Point[] = [];
  const pts = waypoints.map(wp => ({ x: wp.x, y: wp.y }));

  // Add first point
  points.push(pts[0]);

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = i > 0 ? pts[i - 1] : pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = i < pts.length - 2 ? pts[i + 2] : p2;

    // Calculate control points
    const d01 = Math.sqrt((p1.x - p0.x) ** 2 + (p1.y - p0.y) ** 2);
    const d12 = Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
    const fa = tension * d01 / (d01 + d12);
    const fb = tension * d12 / (d01 + d12);

    const cp1 = {
      x: p1.x - fa * (p2.x - p0.x),
      y: p1.y - fa * (p2.y - p0.y)
    };
    const cp2 = {
      x: p1.x + fb * (p2.x - p0.x),
      y: p1.y + fb * (p2.y - p0.y)
    };

    // Sample points along the curve
    for (let t = 0; t <= 1; t += 1 / segmentsPerCurve) {
      const mt = 1 - t;
      points.push({
        x: mt**3*p1.x + 3*mt**2*t*cp1.x + 3*mt*t**2*cp2.x + t**3*p2.x,
        y: mt**3*p1.y + 3*mt**2*t*cp1.y + 3*mt*t**2*cp2.y + t**3*p2.y
      });
    }
  }

  // Add last point
  points.push(pts[pts.length - 1]);
  return points;
};