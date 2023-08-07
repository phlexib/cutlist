<script lang="ts">
  export let box;
  export let kerf;
  export let color;
</script>

<div
  class="box"
  style={`height:${box.height}px; width:${box.width}px; transform:translate(${box.x}px, ${box.y}px);background-color:red;
        border:${kerf}px solid red`}
/>

<style lang="scss">
  .box {
    position: absolute;
    outline: 1px solid #888;
  }
</style>
