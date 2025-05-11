import 'paper';

declare module 'paper' {
  interface ItemEvent {
    point: paper.Point;
    downPoint: paper.Point;
    middlePoint: paper.Point;
    count: number;
    item: paper.Item | null;
    type: string;
  }

  // Extend the PathItem interface
  interface PathItem {
    onMouseDown: (event: ItemEvent) => boolean | void;
    onMouseDrag: (event: ItemEvent) => boolean | void;
    onMouseUp: (event: ItemEvent) => boolean | void;
  }
}