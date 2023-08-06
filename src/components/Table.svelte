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
  } from 'flowbite-svelte';

  import { FaPlus } from 'svelte-icons/fa';

  export let list: any[] = [];
  let length = 20;
  let width = 1;
  let qty = 1;

  const addPart = () => {
    console.log('add part');
  };
</script>

<div class="flex justify-between">
  <h4>Parts</h4>

  <button on:click={addPart}>
    <icon>
      <FaPlus />
    </icon>
  </button>
</div>
<Table striped={true}>
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
    {#each list as el, id (id)}
      <TableBodyRow>
        <TableBodyCell>{el.name}</TableBodyCell>
        <TableBodyCell>
          <NumberInput size="sm" bind:value={el.h} /></TableBodyCell
        >
        <TableBodyCell>
          <NumberInput size="sm" bind:value={el.w} /></TableBodyCell
        >
        <TableBodyCell
          ><NumberInput size="sm" bind:value={el.qty} /></TableBodyCell
        >
        <TableBodyCell>{el.material}</TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</Table>

<style>
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
