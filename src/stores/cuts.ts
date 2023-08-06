import { writable } from 'svelte/store';

let defaultParts: Part[] = [
  {
    w: 1,
    h: 20,
    qty: 2,
    name: 'Side',
    material: 'Red Oak',
    flip: false,
  },
  {
    w: 1,
    h: 4.5,
    qty: 2,
    name: 'Feet',
    material: 'Red Oak',
    flip: false,
  },
  {
    w: 1,
    h: 10,
    qty: 10,
    name: 'Apron',
    material: 'Red Oak',
    flip: false,
  },
];

export const parts = writable<Part[]>(defaultParts);
export const bin = writable({ width: 0, height: 0 });
