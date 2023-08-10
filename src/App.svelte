<script lang="ts">
  import { BP2D } from 'binpackingjs';
  import './api/simple-packer';
  const { heuristics } = BP2D;
  import { buildManifest } from './api/simple-packer';
  // import { buildManifest } from './api/simple-packer';
  import PartTable from './components/PartsTable.svelte';
  import StockTable from './components/StockTable.svelte';
  import { parts, stocks, materials, kerf, algo } from './stores/cuts';
  import { Range, Label, Tooltip, NumberInput } from 'flowbite-svelte';
  let scale = 20;

  $: manifest = buildManifest($materials, $parts, $stocks, $kerf, scale);

  $: console.log('scaled boxes', manifest);

  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const getRandomColor = () => {
    let rng = getRandom(0, 16777215);
    return '#' + rng.toString(16).slice(2, 8).toUpperCase();
  };

  const getColors = () => {
    let newColors = {};
    for (let i = 0; i < $parts.length; i++) {
      newColors = { ...newColors, [$parts[i].name]: getRandomColor() };
    }
    return newColors;
  };

  let colors = getColors();

  materials.subscribe((val) => {
    if (val) {
      colors = getColors();
      console.log(colors);
    }
  });

  // parts.subscribe((val) => {
  //   if (val) {
  //     const packs = buildManifest($materials, $parts, $stocks, $kerf, scale);
  //     console.log(packs);
  //   }
  // });
</script>

<main class="grid grid-cols-3 gap-x-4">
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
  <div>
    <div class="m-4 col-span-2">
      <Label>Scale</Label>
      <Range id="range1" bind:value={scale} min="10" max="50" size="sm" />
    </div>
    {#each manifest as stock}
      <div
        id={stock.id}
        class="stock"
        style={`width:${stock.width * scale}px; height:${
          stock.height * scale
        }px; background-image:url("brown-wooden-textured.png"); `}
      >
        <p class="stock-label">{stock.material}</p>
        {#each stock.parts as part, id (id)}
          <div
            id={part.id}
            class="box flex items-center"
            style={`height:${part.h * scale}px; width:${
              part.w * scale
            }px; transform:translate(${part.x * scale}px, ${part.y * scale}px);
          background-color:${colors[part.id.split('_')[0]] || getRandomColor()};
          border:${$kerf}px solid red`}
          >
            <span class="text-xs text-black mx-2">{part.id}</span>
          </div>
          <Tooltip triggeredBy={`[id^='${part.id}']`}>
            <div class="p-2">
              <p class="text-xs">
                {part.name} : {part.w - $kerf} x {part.h - $kerf}
              </p>
            </div>
          </Tooltip>
        {/each}
      </div>
      <Tooltip triggeredBy={`[id^='${stock.id}']`}>
        <div class="p-2">
          <p class="text-xs">
            {stock.material} | {stock.name} : {stock.width} x {stock.height}
          </p>
        </div>
      </Tooltip>
    {/each}
  </div>
</main>

<style>
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
