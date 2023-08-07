import { BP2D } from 'binpackingjs';
const { Bin, Box, Packer } = BP2D;

export const buildBins = (parts: Part[], bins: Stock[], kerf, algo) => {
  console.log('parts', parts);

  let bin_1 = new Bin(bins[0].width, bins[0].height, algo);

  let boxes = parts.map((part: Part) => {
    return new Box(part.id, part.h, part.w, false);
  });
  console.log('boxes', boxes);
  let packer = new Packer([bin_1]);

  return packer.pack(boxes);
};
