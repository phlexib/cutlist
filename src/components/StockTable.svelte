<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    NumberInput,
    Button,
    Input,
  } from "flowbite-svelte";

  import { stocks } from "../stores/cuts-store";
  import { FaPlus, FaMinus } from "svelte-icons/fa";

  let length = 20;
  let width = 1;
  let qty = 1;
  let headers = ["name", "length", "width", "qty", "material"];

  let totalBoardFeet;
  $: {
    totalBoardFeet = $stocks.reduce((acc, s) => {
      let bf = (s.width / 12) * (s.height / 12);
      console.log(bf);
      return acc + bf * s.qty;
    }, 0);
  }

  const addStock = () => {
    stocks.set([
      ...$stocks,
      { name: "", height: 1, width: 1, depth: 1, material: "" },
    ]);
  };
  const removeStock = (name) => {
    const updatedStocks = $stocks.filter((part) => part.name !== name);
    stocks.set([...updatedStocks]);
  };
</script>

<div class="flex justify-between">
  <h4>Stock</h4>
  <button on:click={addStock}>
    <icon>
      <FaPlus />
    </icon>
  </button>
</div>
<div class="mx-2">
  <table class="styled-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Length</th>
        <th>Width</th>
        <th>Qty</th>
        <th>Material</th>
        <th>Board/Ft</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each $stocks as el, id (el.name)}
        <tr id={id.toString()}>
          <td>
            <Input
              type="text"
              placeholder="Name"
              size="sm"
              bind:value={el.name}
            />
          </td>
          <td>
            <Input
              type="number"
              placeholder="Length"
              size="sm"
              bind:value={el.width}
            />
          </td>
          <td>
            <Input
              type="number"
              placeholder="Width"
              size="sm"
              bind:value={el.height}
            />
          </td>
          <td>
            <Input
              type="number"
              placeholder="Qty"
              size="sm"
              bind:value={el.qty}
            />
          </td>
          <td>
            <Input
              type="text"
              placeholder="Material"
              size="sm"
              bind:value={el.material}
            />
          </td>
          <td>
            {(el.width / 12) * (el.height / 12) * el.qty}
          </td>
          <td
            ><button
              on:click={() => {
                removeStock(el.name);
              }}
            >
              <icon>
                <FaMinus />
              </icon>
            </button></td
          >
        </tr>
      {/each}
      <tr>
        <td>Total </td>
        <td />
        <td />
        <td />
        <td />
        <td>{totalBoardFeet}</td>
      </tr>
    </tbody>
  </table>
</div>

<style lang="scss">
  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.8em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
  }
  .styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }
  .styled-table th,
  .styled-table td {
    padding: 4px 6px;
  }
  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }
  h4 {
    margin-left: 1.5rem;
    font-weight: bold;
  }
  icon {
    width: 24px;
    height: 24px;
  }
  button {
    width: 24px;
    height: 24px;
    padding: 4px;
  }
</style>
