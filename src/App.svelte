<script lang="ts">
  import { BP2D } from 'binpackingjs';
  const { heuristics } = BP2D;
  import { buildBins } from './api/packer';
  import Table from './components/Table.svelte';
  import { parts } from './stores/cuts';

  let scale = 20;
  let kerf = 10;
  let algo = new heuristics.BestLongSideFit();

  let stock = {
    height: 8,
    width: 36,
  };

  $: scaledBoxes = buildBins($parts, [stock], algo).map((box: Box) => ({
    ...box,
    height: box.height * scale,
    width: box.width * scale,
    x: box.x * scale,
    y: box.y * scale,
  }));

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
</script>

<main class="grid grid-cols-2 gap-x-4">
  <div>
    <Table list={$parts} />
  </div>
  <div id="stock" style={`width:${bin.width}px; height:${bin.height}px`}>
    {#each scaledBoxes as box}
      <div
        class="box"
        style={`height:${box.height}px; width:${
          box.width
        }px; transform:translate(${box.x}px, ${
          box.y
        }px);background-color:${getRandomColor()}`}
      />
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
