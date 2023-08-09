/******************************************************************************

This is a very simple binary tree based bin packing algorithm that is initialized
with a fixed width and height and will fit each block into the first node where
it fits and then split that node into 2 parts (down and right) to track the
remaining whitespace.

Best results occur when the input blocks are sorted by height, or even better
when sorted by max(width,height).

Inputs:
------

  w:       width of target rectangle
  h:      height of target rectangle
  blocks: array of any objects that have .w and .h attributes

Outputs:
-------

  marks each block that fits with a .fit attribute pointing to a
  node with .x and .y coordinates

Example:
-------

  var blocks = [
    { w: 100, h: 100 },
    { w: 100, h: 100 },
    { w:  80, h:  80 },
    { w:  80, h:  80 },
    etc
    etc
  ];

  var packer = new Packer(500, 500);
  packer.fit(blocks);

  for(var n = 0 ; n < blocks.length ; n++) {
    var block = blocks[n];
    if (block.fit) {
      Draw(block.fit.x, block.fit.y, block.w, block.h);
    }
  }


******************************************************************************/

let defaultParts: Part[] = [
  {
    id: '1',
    w: 1,
    h: 20,
    qty: 8,
    name: 'Side',
    material: 'Red Oak',
    flip: false,
  },
  {
    id: '2',
    w: 1,
    h: 4.5,
    qty: 2,
    name: 'Feet',
    material: 'Red Oak',
    flip: false,
  },
  {
    id: '3',
    w: 1,
    h: 10,
    qty: 10,
    name: 'Apron',
    material: 'Red Oak',
    flip: false,
  },
];

let defaultStocks: Stock[] = [
  {
    height: 36,
    width: 8,
    depth: 1,
    qty: 2,
    material: 'Red Oak',
    name: 'WStock_1',
  },
  {
    height: 24,
    width: 6,
    depth: 1,
    qty: 1,
    material: 'Walnut',
    name: 'Stock_1',
  },
];

class Packer {
  w: number;
  h: number;
  root: any;
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.root = { x: 0, y: 0, w: w, h: h };
  }
  fit(blocks) {
    var n, node, block;
    for (n = 0; n < blocks.length; n++) {
      block = blocks[n];
      if ((node = this.findNode(this.root, block.w, block.h)))
        block.fit = this.splitNode(node, block.w, block.h);
    }
  }

  findNode(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if (w <= root.w && h <= root.h) return root;
    else return null;
  }

  splitNode(node, w, h) {
    node.used = true;
    node.down = { x: node.x, y: node.y + h, w: node.w, h: node.h - h };
    node.right = { x: node.x + w, y: node.y, w: node.w - w, h: h };
    return node;
  }
}

var blocks = [
  { w: 100, h: 100, fit: { x: 0, y: 0 } },
  { w: 100, h: 100, fit: { x: 0, y: 0 } },
  { w: 80, h: 80, fit: { x: 0, y: 0 } },
  { w: 80, h: 80, fit: { x: 0, y: 0 } },
];

const flatParts = defaultParts.reduce((acc: [], part: Part) => {
  let boxes = [];
  for (let i = 0; i < part.qty; i++) {
    boxes.push({ ...part, id: `${part.name}_${i + 1}` });
  }
  return [...acc, ...boxes];
}, []);

blocks = flatParts.map((part: Part) => {
  return { ...part, w: part.w, h: part.h, fit: { x: 0, y: 0 } };
});

var packer = new Packer(36, 8);
packer.fit(blocks);

for (var n = 0; n < blocks.length; n++) {
  var block = blocks[n];
  if (block.fit) {
    console.log(block.fit.x, block.fit.y, block.w, block.h);
  }
}
