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

let defaultParts: Part[] = [
  {
    id: "1",
    w: 1,
    h: 20,
    qty: 8,
    name: "Side",
    material: "Red Oak",
    flip: false,
  },
  {
    id: "2",
    w: 1,
    h: 4.5,
    qty: 2,
    name: "Feet",
    material: "Red Oak",
    flip: false,
  },
  {
    id: "3",
    w: 1,
    h: 10,
    qty: 10,
    name: "Apron",
    material: "Red Oak",
    flip: false,
  },
];

let defaultStocks: Stock[] = [
  {
    height: 36,
    width: 8,
    depth: 1,
    qty: 2,
    material: "Red Oak",
    name: "WStock_1",
  },
  {
    height: 24,
    width: 6,
    depth: 1,
    qty: 1,
    material: "Walnut",
    name: "Stock_1",
  },
];

class Packer {
  w: number;
  h: number;
  material: string;
  name: string;
  root: any;
  kerf: number = 0.125;
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
    node.down = {
      x: node.x,
      y: node.y + h + this.kerf,
      w: node.w,
      h: node.h - h - this.kerf,
    };
    node.right = {
      x: node.x + w + this.kerf,
      y: node.y,
      w: node.w - w - this.kerf,
      h: h,
    };
    return node;
  }
}

const buildCuts = (fitBoxes, kerf) => {
  // Get Cuts
  let hor = [];
  let ver = [];
  fitBoxes.forEach((box) => {
    let top = {
      from: { x: box.x, y: box.y - kerf },
      to: { x: box.x + box.w, y: box.y - kerf },
    };
    let left = {
      from: { x: box.x - kerf, y: box.y },
      to: { x: box.x - kerf, y: box.y + box.h },
    };
    let right = {
      from: { x: box.x + box.w - kerf, y: box.fit.y },
      to: { x: box.x + box.w - kerf, y: box.fit.y + box.h },
    };
    let bottom = {
      from: { x: box.fit.down.x, y: box.fit.down.y - kerf },
      to: { x: box.fit.down.x, y: box.fit.y - kerf },
    };
    hor.push(top, bottom);
    ver.push(left, right);

    return [top, left, right, bottom];
  });

  // for each cut, find the longest distance between the same x or y
  const sortedCuts = { h: hor, v: ver };
  console.log("sortedCuts", sortedCuts);
  let horizontalCuts = sortedCuts.h.reduce((acc: [], cut: any) => {
    let longestCut;
    const { from, to } = cut;
    const { x, y } = from;
    const { x: x2, y: y2 } = to;
    if (y2 == y) {
      if (x2 > x) {
        longestCut = { minX: x, y: from.y, w: x2 };
      }
      return { ...acc, [y]: longestCut.w };
    } else {
      return acc;
    }
  }, {});

  const horizontalCutsArray = Object.keys(horizontalCuts).map((key) => {
    return {
      from: { x: 0, y: parseFloat(key) },
      to: { y: parseFloat(key), x: horizontalCuts[key] },
    };
  });
  console.log("horizontalCuts", horizontalCutsArray);
  let verticalCuts = sortedCuts.v.reduce((acc: [], cut: any) => {
    let longestCut;
    const { from, to } = cut;
    const { x, y } = from;
    const { x: x2, y: y2 } = to;
    if (x2 == x) {
      if (y2 > y) {
        longestCut = { minX: x, y: from.y, w: y2 };
      } else {
        longestCut = { minX: x, y: from.y, w: y };
      }
      return { ...acc, [x]: longestCut.w };
    } else {
      return acc;
    }
  }, {});
  console.log("verticalCuts", verticalCuts);
  const verticalCutsArray = Object.keys(verticalCuts).map((key) => {
    return {
      from: { y: 0, x: parseFloat(key) },
      to: { x: parseFloat(key), y: verticalCuts[key] },
    };
  });

  console.log("verticalCutsArray", verticalCutsArray);
  return [...horizontalCutsArray, ...verticalCutsArray];
};

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
  console.log("blocks", blocks);
  let flatBins = [];

  materialBins.every((stock: Stock) => {
    const bin = buildBin(blocks, stock);
    console.log("bin", bin);
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
    console.log("fitBoxes", fitBoxes);

    const remainingBoxes = bin.parts.filter((block: Block) => !block.fit);
    if (fitBoxes.length > 0) {
      const cuts = buildCuts(fitParts, kerf);
      bin.parts = fitParts;
      bin.blocks = fitBoxes;
      bin.cuts = cuts;

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

const buildBin = (blocks: Block[], bin: Stock) => {
  let packer = new Packer(bin.width, bin.height, bin.material, bin.name);
  packer.fit(blocks);

  return {
    ...bin,
    parts: blocks,
    blocks: blocks,
    cuts: {},
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
    console.log("matbins", matBins);

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
        return { ...part, h: part.h, w: part.w };
      });
    console.log("partsByMat", partsByMat);

    materialGroups[mat] = { bins: matBins, parts: partsByMat };
  });

  console.log("materialGroups", materialGroups);

  const packs = Object.keys(materialGroups).map((mat: string) => {
    const { bins, parts } = materialGroups[mat];
    const pack = buildBins(parts, bins, kerf, scale);
    return pack;
  });

  console.log("end packs", packs);
  return packs.reduce((acc: [], pack: []) => [...acc, ...pack], []);
};
