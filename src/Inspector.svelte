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
          fromLeft: direction == "W" ? cut.from.x : cut.from.x,
          toRight: direction == "W" ? cut.to.x : cut.to.x,
          fromTop: direction == "W" ? cut.from.y - $kerf : cut.from.y,
          toBottom: direction == "W" ? cut.to.y - $kerf : cut.to.y,
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
        let valid = true;
        if (c.direction == "H" && c.fromLeft <= 0) {
          valid = false;
        }
        if (c.direction == "W" && c.fromTop <= 0) {
          valid = false;
        }

        return valid;
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
