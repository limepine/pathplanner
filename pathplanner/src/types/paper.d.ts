import 'paper';

declare module 'paper' {
  interface PaperEvent extends MouseEvent {
    point: Point;
    downPoint: Point;
    middlePoint: Point;
    count: number;
    item: Item | null;
    type: string;
  }

  interface PathItem {
    onMouseDown: (event: PaperEvent) => boolean | void;
    onMouseDrag: (event: PaperEvent) => boolean | void;
  }

  interface Tool {
    onMouseDown: (event: PaperEvent) => boolean | void;
  }
}