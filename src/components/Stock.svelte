<script lang="ts">
  export let scale = 20;
  export let stock: any;
  import Part from "./Part.svelte";
  import Cut from "./Cut.svelte";
  import { materials } from "../stores/cuts";
  import { selectedItem } from "../stores/app";

  const setSelectedItem = (part) => {
    selectedItem.set({ ...part, stock: stock.id });
    console.log(part);
  };
</script>

<svg
  width={stock.width * scale + 10}
  height={stock.height * scale + 10}
  class="stock"
>
  {#if $selectedItem && $selectedItem.stock == stock.id}
    <line
      id="top-ruler"
      x1={10 + $selectedItem.x * scale}
      x2={10 + $selectedItem.x * scale}
      y1={5}
      y2={5}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="top-left-ruler"
      x1={10 + $selectedItem.x * scale}
      x2={10 + $selectedItem.x * scale}
      y1={0}
      y2={10}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="top-right-ruler"
      x1={($selectedItem.x + $selectedItem.w) * scale + 10}
      y1={0}
      x2={($selectedItem.x + $selectedItem.w) * scale + 10}
      y2={10}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="left-ruler-top"
      x1={0}
      y1={$selectedItem.y * scale + 10}
      x2={10}
      y2={$selectedItem.y * scale + 10}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="left-ruler-bottom"
      x1={0}
      y1={($selectedItem.y + $selectedItem.h) * scale + 10}
      x2={10}
      y2={($selectedItem.y + $selectedItem.h) * scale + 10}
      stroke-width="1"
      stroke="red"
    />
  {/if}
  <svg
    x="10"
    y="10"
    width={stock.width * scale}
    height={stock.height * scale}
    class="stock"
  >
    <rect
      x="0"
      y="0"
      width={stock.width * scale}
      height={stock.height * scale}
      fill={$materials.find((m) => m.name == stock.material).color}
    />
    {#each stock.parts as part, i}
      <Part {part} {scale} onClick={setSelectedItem} />
    {/each}
    {#each stock.cuts as cut, i}
      <Cut {cut} {scale} onClick={setSelectedItem} />
    {/each}
  </svg>
</svg>

<style>
  .stock {
    margin-bottom: 10px;
  }
</style>
