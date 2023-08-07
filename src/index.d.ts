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
