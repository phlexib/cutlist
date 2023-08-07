<script lang="ts">
  import { BP2D } from 'binpackingjs';
  const { heuristics } = BP2D;
  import { buildBins } from './api/packer';
  import Table from './components/PartsTable.svelte';
  import { parts } from './stores/cuts';

  let scale = 20;
  let kerf = 0.2;
  let algo = new heuristics.BestLongSideFit();

  let stock = {
    name: 'stock',
    height: 8,
    width: 36,
    depth: 1,
  };

  $: flatParts = $parts.reduce((acc: [], part: Part) => {
    let boxes = [];
    for (let i = 0; i < part.qty; i++) {
      boxes.push({ ...part, id: `${part.name}_${i + 1}` });
    }
    return [...acc, ...boxes];
  }, []);

  $: scaledBoxes = buildBins(flatParts, [stock], kerf, algo).map(
    (box: Box) => ({
      ...box,
      height: box.height * scale,
      width: box.width * scale,
      x: box.x * scale,
      y: box.y * scale,
    })
  );

  $: console.log(scaledBoxes);

  $: bin = {
    width: stock.width * scale,
    height: stock.height * scale,
  };

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

  parts.subscribe((val) => {
    if (val) {
      colors = getColors();
      console.log(colors);
    }
  });
</script>

<main class="grid grid-cols-2 gap-x-4">
  <div>
    <Table />
  </div>
  <div id="stock" style={`width:${bin.width}px; height:${bin.height}px`}>
    {#each scaledBoxes as box, id (id)}
      <div
        class="box flex items-center"
        style={`height:${box.height}px; width:${
          box.width
        }px; transform:translate(${box.x}px, ${box.y}px);
        background-color:${colors[box.id.split('_')[0]] || getRandomColor()};
        border:${kerf}px solid red`}
      >
        <span class="text-xs text-black mx-2">{box.id}</span>
      </div>
    {/each}
  </div>
</main>

<style>
  #stock {
    color: #888;
    outline: 1px solid #888;
  }

  .box {
    position: absolute;
    outline: 1px solid #888;
  }
</style>
