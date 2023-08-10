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
  } from 'flowbite-svelte';

  import { stocks } from '../stores/cuts';
  import { FaPlus, FaMinus } from 'svelte-icons/fa';

  let length = 20;
  let width = 1;
  let qty = 1;

  const addStock = () => {
    stocks.set([
      ...$stocks,
      { name: '', height: 1, width: 1, depth: 1, material: '' },
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
<Table striped={true} class="mb-10">
  <TableHead>
    <TableHeadCell>Name</TableHeadCell>
    <TableHeadCell>Length</TableHeadCell>
    <TableHeadCell>Width</TableHeadCell>
    <TableHeadCell>Qty</TableHeadCell>
    <TableHeadCell>Material</TableHeadCell>
    <TableHeadCell>
      <span class="sr-only"> Edit </span>
    </TableHeadCell>
  </TableHead>
  <TableBody>
    {#each $stocks as el, id (el.name)}
      <TableBodyRow>
        <TableBodyCell
          ><Input
            type="text"
            placeholder="Name"
            size="sm"
            bind:value={el.name}
          /></TableBodyCell
        >
        <TableBodyCell>
          <NumberInput size="sm" bind:value={el.width} /></TableBodyCell
        >
        <TableBodyCell>
          <NumberInput size="sm" bind:value={el.height} /></TableBodyCell
        >
        <TableBodyCell
          ><NumberInput size="sm" bind:value={el.qty} /></TableBodyCell
        >
        <TableBodyCell>
          <Input
            type="text"
            placeholder="Name"
            size="sm"
            bind:value={el.material}
          /></TableBodyCell
        >
        <TableBodyCell>
          <button
            on:click={() => {
              removeStock(el.name);
            }}
          >
            <icon>
              <FaMinus />
            </icon>
          </button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

<style>
  h4 {
    margin-left: 1.5rem;
    font-weight: bold;
  }
  icon {
    width: 100%;
    height: 100%;
  }
  button {
    width: 30px;
    height: 30px;
    padding: 4px;
  }
</style>
