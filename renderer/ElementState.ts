export interface ElementState {
  track: number;
  time: number;
  duration: number;
  exit: number;
  source: Record<string, any>;
  elements?: ElementState[];
}
