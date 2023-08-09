import { derived, writable } from 'svelte/store';
import { defaultAlgo } from '../api/packer';

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
  {
    id: '4',
    w: 2,
    h: 6,
    qty: 4,
    name: 'Wall',
    material: 'Walnut',
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

export const parts = writable<Part[]>(defaultParts);
export const stocks = writable<Stock[]>(defaultStocks);
export let kerf = writable(0.2);
export let algo = writable(defaultAlgo);

export const materials = derived(stocks, ($stocks) => {
  return $stocks.map((stock) => stock.material);
});
