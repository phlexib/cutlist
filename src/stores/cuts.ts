import { derived, writable } from 'svelte/store';
import { defaultAlgo } from '../api/packer';

let defaultParts: Part[] = [
  {
    id: '1',
    w: 20,
    h: 1,
    qty: 8,
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
    h: 4,
    qty: 4,
    name: 'Wall',
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
    name: 'RStock',
  },
  {
    height: 8,
    width: 24,
    depth: 1,
    qty: 1,
    material: 'Walnut',
    name: 'WStock',
  },
];

export const parts = writable<Part[]>(defaultParts);
export const stocks = writable<Stock[]>(defaultStocks);
export let kerf = writable(0.125);
export let algo = writable(defaultAlgo);

export const materials = derived(stocks, ($stocks) => {
  return $stocks.map((stock) => stock.material);
});
