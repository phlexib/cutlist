<script lang="ts">
  export let scale = 20;
  export let stock: any;
  import Part from "./Part.svelte";
  import Cut from "./Cut.svelte";
  import { materials } from "../stores/cuts";
  import { selectedItem } from "../stores/app";

  const setSelectedItem = (part) => {
    selectedItem.set(part);
  };
</script>

<svg width={stock.width * scale} height={stock.height * scale} class="stock">
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

<style>
  .stock {
    margin-bottom: 10px;
  }
</style>
