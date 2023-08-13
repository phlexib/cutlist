<script lang="ts">
  import { partsColor } from "../stores/cuts";
  export let scale = 20;
  export let cut: any;
</script>

<line class="cut-line" x1="0" y1="80" x2="100" y2="20" stroke="black" />

<style>
  .cut-line {
    cursor: pointer;
  }
</style>
