
export interface Primitive {
  id: string;
  type: 'box' | 'pyramid';
  position: [number, number, number];
  dimensions: [number, number, number];
  color: string | string[];
  rotation?: [number, number, number];
}

export type AddPrimitiveParams = {
  type: 'box' | 'pyramid';
  count: number;
  width: number;
  height: number;
  depth: number;
  coloredSides: boolean;
};