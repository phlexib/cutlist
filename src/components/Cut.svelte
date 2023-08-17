<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { partsColor, kerf } from "../stores/cuts-store";
  export let scale = 20;
  export let cut: any;
  let rect: any;
  export let onClick;

  const handleClick = () => {
    if (onClick) onClick(cut);
  };

  onMount(() => {
    rect = document.getElementById(cut.id);
    if (rect) {
      rect.addEventListener("click", handleClick);
    }
  });
  onDestroy(() => {
    document.removeEventListener("click", handleClick, {
      capture: true,
    });
  });
</script>

<line
  id={`${cut.stock}-${cut.id}`}
  class="cut-line"
  x1={cut.from.x * scale - ($kerf * scale) / 2}
  y1={cut.from.y * scale - ($kerf * scale) / 2}
  x2={cut.to.x * scale - ($kerf * scale) / 2}
  y2={cut.to.y * scale - ($kerf * scale) / 2}
  stroke-width={$kerf * scale}
  stroke="rgba(0,200,0,0.5)"
/>

<style>
  .cut-line {
    cursor: pointer;
  }
</style>
