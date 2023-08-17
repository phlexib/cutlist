import { derived, writable } from "svelte/store";
import { defaultAlgo } from "../api/packer";

let defaultParts: Part[] = [
  {
    id: "1",
    w: 20,
    h: 1,
    qty: 8,
    name: "Side",
    material: "Red Oak",
    flip: false,
  },
  {
    id: "2",
    w: 4.5,
    h: 1,
    qty: 2,
    name: "Feet",
    material: "Red Oak",
    flip: false,
  },
  {
    id: "3",
    w: 10,
    h: 1,
    qty: 10,
    name: "Apron",
    material: "Red Oak",
    flip: false,
  },
  {
    id: "4",
    w: 6,
    h: 4,
    qty: 4,
    name: "Wall",
    material: "Walnut",
    flip: false,
  },
];

let defaultStocks: Stock[] = [
  {
    height: 8,
    width: 36,
    depth: 1,
    qty: 2,
    material: "Red Oak",
    name: "RStock",
  },
  {
    height: 8,
    width: 24,
    depth: 1,
    qty: 1,
    material: "Walnut",
    name: "WStock",
  },
];
let materialColors = ["#8b5a2b", "#ffa54f", "#a0522d", "#cd8500", "#8b4513"];
let defaultColors = ["#ffc3c3", "#97cde1", "#ffb454", "#005a59", "#fe6358"];
export let colors = writable<string[]>(defaultColors);

export const parts = writable<Part[]>(defaultParts);
export const stocks = writable<Stock[]>(defaultStocks);
export let kerf = writable(0.125);
export let algo = writable(defaultAlgo);

export const materials = derived([stocks], ([$stocks]) => {
  return $stocks.map((stock, id) => {
    return { name: stock.material, color: materialColors[id] };
  });
});

export const partsColor = derived([parts, colors], ([$parts, $colors]) => {
  let newColors = {};
  for (let i = 0; i < $parts.length; i++) {
    newColors = { ...newColors, [$parts[i].name]: $colors[i] };
  }
  return newColors;
});
