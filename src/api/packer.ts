import { BP2D } from 'binpackingjs';
const { Bin, Box, Packer, heuristics } = BP2D;

export const buildBins = (parts: Part[], bins: Stock[], algo) => {
  console.log('parts', parts);

  let bin_1 = new Bin(bins[0].width, bins[0].height, algo);
  // let boxes = parts.map((part: Part) => {
  //   return new Box(part.h, part.w);
  // });

  let boxes = parts.reduce((acc: [], part: Part) => {
    let boxes = [];
    for (let i = 0; i < part.qty; i++) {
      boxes.push(new Box(part.h, part.w));
    }
    return [...acc, ...boxes];
  }, []);

  // let boxes = [
  //   new Box(200, 10),
  //   new Box(200, 10),
  //   new Box(40, 10),
  //   new Box(40, 10),
  // ];
  let packer = new Packer([bin_1]);

  return packer.pack(boxes);
};
