let defaultParts: Part[] = [
  {
    id: '1',
    w: 20,
    h: 1,
    qty: 10,
    name: 'Side',
    material: 'Red Oak',
    flip: false,
  },
  {
    id: '2',
    w: 4.5,
    h: 1,
    qty: 2,
    name: 'Feet',
    material: 'Red Oak',
    flip: false,
  },
  {
    id: '3',
    w: 10,
    h: 1,
    qty: 10,
    name: 'Apron',
    material: 'Red Oak',
    flip: false,
  },
  {
    id: '4',
    w: 6,
    h: 2,
    qty: 4,
    name: 'WalnutApron',
    material: 'Walnut',
    flip: false,
  },
];

let defaultStocks: Stock[] = [
  {
    height: 8,
    width: 36,
    depth: 1,
    qty: 2,
    material: 'Red Oak',
    name: 'WStock_1',
  },
  {
    height: 24,
    width: 8,
    depth: 1,
    qty: 1,
    material: 'Walnut',
    name: 'Stock_1',
  },
];
interface Fit {
  x: number;
  y: number;
  used?: boolean;
}
interface Block {
  w: number;
  h: number;
  name?: string;
  material?: string;
  fit?: Fit | null;
}

class Packer {
  w: number;
  h: number;
  material: string;
  name: string;
  root: any;
  constructor(w, h, material, name) {
    this.w = w;
    this.h = h;
    this.material = material;
    this.name = name;
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

const buildBins = (parts: Part[], bins: Stock[], kerf, scale) => {
  const materialBins = bins.reduce((acc: [], bin: Stock) => {
    let matBins = [];
    for (let i = 0; i < bin.qty; i++) {
      matBins.push({ ...bin, id: `${bin.name}_${i + 1}` });
    }
    return [...acc, ...matBins];
  }, []);

  let blocks: Block[] = parts.map((part: Part) => {
    return { ...part, w: part.w, h: part.h };
  });
  console.log('blocks', blocks);
  let flatBins = [];

  materialBins.every((stock: Stock) => {
    const bin = buildBin(blocks, stock, kerf, scale);
    console.log('bin', bin);
    const fitBoxes = bin.parts.filter((p) => p.fit);
    const fitParts = fitBoxes.map((box) => {
      return {
        ...box,
        x: box.fit.x,
        y: box.fit.y,
        w: box.w,
        h: box.h,
      };
    });
    console.log('fitBoxes', fitBoxes);
    const remainingBoxes = bin.parts.filter((block: Block) => !block.fit);
    if (fitBoxes.length > 0) {
      bin.parts = fitParts;
      bin.blocks = fitBoxes;
      flatBins.push(bin);
    }
    if (remainingBoxes.length > 0) {
      blocks = remainingBoxes;
      return true;
    } else {
      return false;
    }
  });
  console.log(flatBins);
  return flatBins;
};

const buildBin = (blocks: Block[], bin: Stock, kerf, scale) => {
  let packer = new Packer(bin.width, bin.height, bin.material, bin.name);
  packer.fit(blocks);

  return {
    ...bin,
    parts: blocks,
    blocks: blocks,
  };
};

export const buildManifest = (
  materials: string[],
  parts: Part[],
  bins: Stock[],
  kerf: number,
  scale: number
) => {
  let materialGroups = {};
  materials.forEach((mat: string) => {
    const flatBins = bins.reduce((acc: [], bin: Stock) => {
      let flatBin = [];
      for (let i = 0; i < bin.qty; i++) {
        flatBin.push({ ...bin, id: `${bin.name}_${i + 1}` });
      }
      return [...acc, ...flatBin];
    }, []);
    const matBins = flatBins.filter((bin: Stock) => bin.material === mat);
    console.log('matbins', matBins);

    const flatParts = parts.reduce((acc: [], part: Part) => {
      let boxes = [];
      for (let i = 0; i < part.qty; i++) {
        boxes.push({ ...part, id: `${part.name}_${i + 1}` });
      }
      return [...acc, ...boxes];
    }, []);

    const partsByMat = flatParts
      .filter((part: Part) => part.material === mat)
      .map((part: Part) => {
        return { ...part, h: part.h + kerf, w: part.w + kerf };
      });
    console.log('partsByMat', partsByMat);

    materialGroups[mat] = { bins: matBins, parts: partsByMat };
  });

  console.log('materialGroups', materialGroups);

  const packs = Object.keys(materialGroups).map((mat: string) => {
    const { bins, parts } = materialGroups[mat];
    const pack = buildBins(parts, bins, kerf, scale);
    return pack;
  });

  console.log('end packs', packs);
  return packs.reduce((acc: [], pack: []) => [...acc, ...pack], []);
};
