<script lang="ts">
  import { onMount } from "svelte";
  import InfosTable from "./components/InfosTable.svelte";
  import { Accordion } from "flowbite-svelte";
  export let data = [];

  const getStokcCuts = (d) => {
    return d.cuts
      .map((cut, index) => {
        let direction = cut.to.x - cut.from.x > 0 ? "W" : "H";
        return {
          direction: direction,
          fromLeft: cut.from.x,
          toRight: cut.to.x,
          fromTop: cut.from.y,
          toBottom: cut.to.y,
          length: `${
            direction === "W" ? cut.to.x - cut.from.x : cut.to.y - cut.from.y
          }`,
          stock: d.id,
        };
      })
      .sort((a, b) => {
        //   let aVal = a.direction.toLowerCase() === "w" ? 0 : 1;
        //   let bVal = b.direction.toLowerCase() === "w" ? 0 : 1;
        //   return bVal - aVal;
        return b.length - a.length;
      })
      .map((cut, index) => {
        return {
          id: index + 1,
          ...cut,
        };
      });
  };

  let tableData = data
    .reduce((acc, d) => {
      return [...acc, ...getStokcCuts(d)];
    }, [])
    .sort((a, b) => {
      return b.length - a.length;
    });
  onMount(() => {
    console.log(data);
  });
</script>

{#if data}
  <div class="mx-2">
    <InfosTable {tableData} />
  </div>
{/if}

<style lang="scss">
</style>
