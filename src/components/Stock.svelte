<script lang="ts">
  export let scale = 20;
  export let stock: any;
  import Part from "./Part.svelte";
  import Cut from "./Cut.svelte";
  import { materials, kerf } from "../stores/cuts-store";
  import { selectedPart, selectedCut } from "../stores/app-store";
  import { onMount } from "svelte";

  let container;
  const setselectedPart = (part) => {
    selectedPart.set({ ...part, stock: stock.id });
    console.log(part);
  };

  onMount(() => {
    container = document.getElementById("viewer-container");
    let containerWidth = container.clientWidth;
    console.log(stock.width / containerWidth);
    scale = containerWidth / stock.width;
  });
</script>

<svg
  width={stock.width * scale + 10}
  height={stock.height * scale + 10}
  class="stock"
>
  {#if $selectedPart && $selectedPart.stock == stock.id}
    <line
      id="top-ruler"
      x1={10 + $selectedPart.x * scale}
      x2={10 + $selectedPart.x * scale}
      y1={5}
      y2={5}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="top-left-ruler"
      x1={10 + $selectedPart.x * scale}
      x2={10 + $selectedPart.x * scale}
      y1={0}
      y2={10}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="top-right-ruler"
      x1={($selectedPart.x + $selectedPart.w) * scale + 10}
      y1={0}
      x2={($selectedPart.x + $selectedPart.w) * scale + 10}
      y2={10}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="left-ruler-top"
      x1={0}
      y1={$selectedPart.y * scale + 10}
      x2={10}
      y2={$selectedPart.y * scale + 10}
      stroke-width="1"
      stroke="red"
    />
    <line
      id="left-ruler-bottom"
      x1={0}
      y1={($selectedPart.y + $selectedPart.h) * scale + 10}
      x2={10}
      y2={($selectedPart.y + $selectedPart.h) * scale + 10}
      stroke-width="1"
      stroke="red"
    />
    <text
      id="lenght-text"
      class="part-text id"
      dominant-baseline="middle"
      x={($selectedPart.x + $selectedPart.w / 2) * scale}
      y={5}
      fill="red"
      stroke="none"
      font-size="8px"
      alignment-baseline="middle">{$selectedPart.w}</text
    >
    <text
      id="width-text"
      class="part-text id"
      dominant-baseline="middle"
      x={0}
      y={($selectedPart.y + $selectedPart.h / 2) * scale + 10}
      fill="red"
      stroke="none"
      font-size="8px"
      text-anchor="start"
      alignment-baseline="middle">{$selectedPart.h}</text
    >
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
      <Part {part} {scale} onClick={setselectedPart} />
    {/each}
    <!-- {#each stock.cuts as cut, i}
      <Cut {cut} {scale} onClick={setselectedPart} />
    {/each} -->
  </svg>
  {#if $selectedCut && $selectedCut.stock == stock.id}
    {#if $selectedCut.direction == "W"}
      <line
        x1={$selectedCut.fromLeft * scale + 10}
        y1={($selectedCut.fromTop + $kerf / 2) * scale + 10}
        x2={$selectedCut.toRight * scale + 10}
        y2={($selectedCut.toBottom + $kerf / 2) * scale + 10}
        stroke-width={$kerf * scale}
        stroke="red"
      />
    {:else}
      <line
        x1={($selectedCut.fromLeft + $kerf / 2) * scale + 10}
        y1={$selectedCut.fromTop * scale + 10}
        x2={($selectedCut.toRight + $kerf / 2) * scale + 10}
        y2={$selectedCut.toBottom * scale + 10}
        stroke-width={$kerf * scale}
        stroke="red"
      />
    {/if}
  {/if}
</svg>

<style>
  .stock {
    margin-bottom: 10px;
  }
</style>
