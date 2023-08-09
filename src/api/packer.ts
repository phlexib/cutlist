import { BP2D } from 'binpackingjs';
const { Bin, Box, Packer, heuristics } = BP2D;

export const defaultAlgo = new heuristics.BottomLeft();

// $: scaledBoxes = buildBins(
//   flatParts,
//   $stocks.filter((s) => s.material == 'Red Oak'),
//   $kerf,
//   $algo
// ).map((box: Box) => ({
//   ...box,
//   height: box.height * scale,
//   width: box.width * scale,
//   x: box.x * scale,
//   y: box.y * scale,
// }));

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

    const partsByMat = parts
      .filter((part: Part) => part.material === mat)
      .map((part: Part) => {
        return { ...part, h: part.h + kerf, w: part.w + kerf };
      });
    console.log('partsByMat', partsByMat);

    // const kerfedParts = partsByMat.reduce((acc, part: Part, index) => {
    //   return [...acc, part, { name: '', id: `kerf${index}`, h: kerf, w: kerf }];
    // }, []);

    // console.log('kerfedParts', kerfedParts);

    materialGroups[mat] = { bins: matBins, parts: partsByMat };
  });

  console.log('materialGroups', materialGroups);

  let algo = defaultAlgo;

  const packs = Object.keys(materialGroups).map((mat: string) => {
    const { bins, parts } = materialGroups[mat];
    const pack = buildBins(parts, bins, kerf, algo, scale);

    return pack;
  });

  console.log('end packs', packs);
  return packs.reduce((acc: [], pack: []) => [...acc, ...pack], []);
};

export const buildBins = (parts: Part[], bins: Stock[], kerf, algo, scale) => {
  let flatBins = [];

  let containerBins = bins.map((bin: Stock) => {
    return new Bin(bin.height, bin.width, algo);
  });
  console.log('parts', parts);
  let boxes = parts.map((part: Part) => {
    return new Box(part.id, part.h, part.w, true);
  });
  console.log('boxes', boxes);
  containerBins.forEach((bin: any, index) => {
    let packer = new Packer([bin]);
    let packedBoxes = packer.pack(boxes);
    const uniqueBin = individualBin(packer.bins[0], bins[index], scale);
    console.log('uniqueBin', uniqueBin);
    flatBins.push(uniqueBin);
    boxes = packer.unpackedBoxes;
    console.log('remainingBoxes', packer.unpackedBoxes);
    console.log('packedBoxes', packedBoxes);
    console.log('flatBins', flatBins);
  });
  return flatBins;
};

const individualBin = (bin, sourceBin, scale) => {
  const stockParts = bin.boxes.map((box: Box) => ({
    ...box,
    height: box.height * scale,
    width: box.width * scale,
    x: box.x * scale,
    y: box.y * scale,
  }));
  return {
    ...bin,
    parts: stockParts,
    material: sourceBin.material,
    name: sourceBin.name,
  };
};
