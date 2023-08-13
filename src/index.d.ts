interface Box {
  width: number;
  height: number;
  packed: boolean;
  constrainRotation: boolean;
  x: number;
  y: number;
}

interface Stock {
  name: string;
  width: number;
  height: number;
  depth: number;
  qty?: number = 1;
  material?: string;
}

interface Part {
  id: string;
  w: number;
  h: number;
  qty: number = 1;
  name?: string;
  material?: string;
  flip?: boolean = false;
}

interface Material {
  name: string;
  color: string;
}
