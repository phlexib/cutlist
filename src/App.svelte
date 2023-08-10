<script lang="ts">
  import { BP2D } from 'binpackingjs';
  import './api/simple-packer';
  const { heuristics } = BP2D;
  import { buildManifest } from './api/simple-packer';
  // import { buildManifest } from './api/simple-packer';
  import PartTable from './components/PartsTable.svelte';
  import StockTable from './components/StockTable.svelte';
  import { parts, stocks, materials, kerf, algo } from './stores/cuts';

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

<main class="grid grid-cols-2 gap-x-4">
  <div>
    <StockTable />
    <PartTable />
  </div>
  <div>
    {#each manifest as stock}
      <div
        class="stock"
        style={`width:${stock.width * scale}px; height:${
          stock.height * scale
        }px; background-image:url("brown-wooden-textured.png"); `}
      >
        <p class="stock-label">{stock.material}</p>
        {#each stock.parts as part, id (id)}
          <div
            class="box flex items-center"
            style={`height:${part.h * scale}px; width:${
              part.w * scale
            }px; transform:translate(${part.x * scale}px, ${part.y * scale}px);
          background-color:${colors[part.id.split('_')[0]] || getRandomColor()};
          border:${$kerf}px solid red`}
          >
            <span class="text-xs text-black mx-2">{part.id}</span>
          </div>
        {/each}
      </div>
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
  }
</style>
