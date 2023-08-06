interface Box {
  width: number;
  height: number;
  packed: boolean;
  constrainRotation: boolean;
  x: number;
  y: number;
}

interface Stock {
  width: number;
  height: number;
  material?: string;
}

interface Part {
  w: number;
  h: number;
  qty: number = 1;
  name?: string;
  material?: string;
  flip: boolean = false;
}
