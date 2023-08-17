<script lang="ts">
  import { onMount } from "svelte";
  import InfosTable from "./components/InfosTable.svelte";
  import { kerf } from "./stores/cuts-store";

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
        //   let aVal = a.stock.toLowerCase() === "w" ? 0 : 1;
        //   let bVal = b.stock.toLowerCase() === "w" ? 0 : 1;
        let aVal = a.stock.toLowerCase();
        let bVal = b.stock.toLowerCase();
        return bVal - aVal;
        // return b.sock - a.stock;
      })
      .filter((c) => {
        return c.fromLeft != 0 || c.fromTop != 0;
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
