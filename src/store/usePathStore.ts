import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Waypoint, RobotConfig } from '../types/pathTypes';

interface PathState {
  waypoints: Waypoint[];
  selectedWaypoint: string | null;
  robotConfig: RobotConfig;
  addWaypoint: (waypoint: Omit<Waypoint, 'id'>) => void;
  updateWaypoint: (id: string, updates: Partial<Waypoint>) => void;
  removeWaypoint: (id: string) => void;
  selectWaypoint: (id: string | null) => void;
}

const defaultConfig: RobotConfig = {
  trackWidth: 0.5,
  maxVelocity: 3.0,
  maxAcceleration: 1.0,
  maxDeceleration: 1.0,
  wheelDiameter: 0.1,
};

export const usePathStore = create<PathState>((set) => ({
  waypoints: [],
  selectedWaypoint: null,
  robotConfig: defaultConfig,
  
  addWaypoint: (waypoint) => 
    set((state) => ({
      waypoints: [
        ...state.waypoints,
        { ...waypoint, id: uuidv4() }
      ]
    })),
    
  updateWaypoint: (id, updates) =>
    set((state) => ({
      waypoints: state.waypoints.map((wp) =>
        wp.id === id ? { ...wp, ...updates } : wp
      ),
    })),
    
  removeWaypoint: (id) =>
    set((state) => ({
      waypoints: state.waypoints.filter((wp) => wp.id !== id),
    })),
    
  selectWaypoint: (id) => set({ selectedWaypoint: id }),
}));