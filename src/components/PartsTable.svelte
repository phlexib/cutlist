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
    Dropdown,
    DropdownItem,
    Chevron,
  } from 'flowbite-svelte';

  import { parts, materials } from '../stores/cuts';
  import { FaPlus, FaMinus, FaRedo } from 'svelte-icons/fa';

  let length = 20;
  let width = 1;
  let qty = 1;

  const addPart = () => {
    parts.set([
      ...$parts,
      { id: crypto.randomUUID(), name: '', h: 1, w: 1, qty: 1 },
    ]);
  };

  const removePart = (id) => {
    const updatedParts = $parts.filter((part) => part.id !== id);
    parts.set([...updatedParts]);
  };

  const flipPart = (id) => {
    const parToUpdate = $parts.find((part) => part.id === id);

    const updatedParts = $parts.map((part) => {
      if (part.id === id) {
        return { ...part, h: parToUpdate.w, w: parToUpdate.h };
      }
      return part;
    });
    parts.set([...updatedParts]);
  };

  const handleMaterialSelect = (id, material) => {
    console.log(id, material);
    const updatedParts = $parts.map((part) => {
      if (part.name === id) {
        return { ...part, material: material };
      }
      return part;
    });
    parts.set(updatedParts);
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
      <span class="sr-only">Orientation</span>
    </TableHeadCell>
    <TableHeadCell>
      <span class="sr-only"> Edit </span>
    </TableHeadCell>
  </TableHead>
  <TableBody>
    {#each $parts as el, id (el.name)}
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
          <NumberInput size="sm" bind:value={el.w} /></TableBodyCell
        >
        <TableBodyCell>
          <NumberInput size="sm" bind:value={el.h} /></TableBodyCell
        >
        <TableBodyCell
          ><NumberInput size="sm" bind:value={el.qty} /></TableBodyCell
        >
        <TableBodyCell>
          <Button id="dd-button" size="sm" outline={true} color="none">
            <Chevron>{el.material}</Chevron></Button
          >
          <Dropdown>
            {#each $materials as material}
              <DropdownItem
                on:click={() => {
                  handleMaterialSelect(el.name, material);
                }}>{material}</DropdownItem
              >
            {/each}
          </Dropdown>
        </TableBodyCell>
        <TableBodyCell>
          <button
            on:click={() => {
              flipPart(el.id);
            }}
          >
            <icon>
              <FaRedo />
            </icon>
          </button>
        </TableBodyCell>
        <TableBodyCell>
          <button
            on:click={() => {
              removePart(el.id);
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
