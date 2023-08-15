<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { partsColor, kerf } from "../stores/cuts";
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
  x1={cut.from.x * scale}
  y1={cut.from.y * scale}
  x2={cut.to.x * scale}
  y2={cut.to.y * scale}
  stroke-width={$kerf * scale}
  stroke="blue"
/>

<style>
  .cut-line {
    cursor: pointer;
  }
</style>
