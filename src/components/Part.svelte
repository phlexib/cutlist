<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { partsColor } from "../stores/cuts";
  export let scale = 20;
  export let part: any;
  let rect: any;
  export let onClick;

  const handleClick = () => {
    if (onClick) onClick(part);
  };

  onMount(() => {
    rect = document.getElementById(part.id);
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

<rect
  id={part.id}
  class="part"
  fill={$partsColor[part.id.split("_")[0]] || "rgba(0,0,0,0)"}
  width={part.w * scale}
  height={part.h * scale}
  x={part.x * scale}
  y={part.y * scale}
  style={`fill: #12345;`}
/>
<text
  class="part-text id"
  dominant-baseline="middle"
  x={part.x * scale + 10}
  y={part.y * scale + (part.h * scale) / 2}
  fill="black"
  stroke="none"
  font-size="smaller"
  alignment-baseline="middle">{part.id}</text
>

<style>
  .part {
    cursor: pointer;
  }
  .part:hover {
    fill: rgb(29, 155, 196);
  }
  .part-text {
    -webkit-font-smoothing: subpixel-antialiased;
  }
  button {
    border: none;
  }
</style>
