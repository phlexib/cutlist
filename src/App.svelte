<script lang="ts">
  import { BP2D } from "binpackingjs";
  import "./api/simple-packer";
  const { heuristics } = BP2D;
  import { buildManifest } from "./api/simple-packer";
  // import { buildManifest } from './api/simple-packer';
  import PartTable from "./components/PartsTable.svelte";
  import StockTable from "./components/StockTable.svelte";
  import Part from "./components/Part.svelte";
  import Stock from "./components/Stock.svelte";
  import {
    parts,
    stocks,
    materials,
    kerf,
    partsColor,
  } from "./stores/cuts-store";
  import { selectedPart } from "./stores/app-store";
  import { Range, Label, Tooltip, NumberInput } from "flowbite-svelte";
  import Inspector from "./Inspector.svelte";
  let scale = 20;

  $: manifest = buildManifest(
    $materials.map((m) => m.name),
    $parts,
    $stocks,
    $kerf,
    scale
  );

  $: console.log("manifest", manifest);
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  materials.subscribe((val) => {
    if (val) {
      console.log(val);
    }
  });

  // parts.subscribe((val) => {
  //   if (val) {
  //     const packs = buildManifest($materials, $parts, $stocks, $kerf, scale);
  //     console.log(packs);
  //   }
  // });
</script>

<main class="grid grid-cols-3 gap-x-8">
  <div>
    <div class="flex m-4 items-center gap-x-2">
      <Label>Blade Kerf</Label>
      <input
        type="number"
        id="kerf-input"
        name="Blade Kerf"
        min="0.0625"
        max="2"
        step="0.0625"
        bind:value={$kerf}
      />
    </div>
    <StockTable />
    <PartTable />
  </div>
  <div id="viewer-container">
    <div class="m-4">
      <Label>Scale</Label>
      <Range id="range1" bind:value={scale} min="10" max="50" size="sm" />
    </div>

    {#each manifest as stock}
      <Stock {stock} {scale} />
    {/each}
  </div>
  <div><Inspector data={manifest} /></div>
</main>

<style>
  #viewer-container {
    overflow: auto;
  }
  .stock-label {
    position: absolute;
    bottom: 0;
    right: 0;
    color: black;
    transform-origin: 0 0;
    margin-right: 4px;
  }
  .stock {
    position: relative;
    color: #888;
    margin-bottom: 10px;
  }

  .box {
    position: absolute;
    cursor: pointer;
  }
  input {
    border-radius: 6px;
    height: 32px;
  }
</style>
