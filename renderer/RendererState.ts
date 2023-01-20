import { ElementState } from './ElementState';

export interface RendererState {
  undo: boolean;
  redo: boolean;
  duration: number;
  source: Record<string, any>;
  elements: ElementState[];
}
