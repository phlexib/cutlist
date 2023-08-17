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
  } from "flowbite-svelte";

  import { parts, materials } from "../stores/cuts-store";
  import { FaPlus, FaMinus, FaRedo } from "svelte-icons/fa";

  let length = 20;
  let width = 1;
  let qty = 1;

  const addPart = () => {
    parts.set([
      ...$parts,
      { id: crypto.randomUUID(), name: "", h: 1, w: 1, qty: 1 },
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

<div class="mx-2">
  <table class="styled-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Length</th>
        <th>Width</th>
        <th>Qty</th>
        <th>Material</th>
        <th>Orientation</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {#each $parts as el, id (el.name)}
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
              bind:value={el.w}
            />
          </td>
          <td>
            <Input
              type="number"
              placeholder="Width"
              size="sm"
              bind:value={el.h}
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
            <select bind:value={el.material}>
              {#each $materials.map((m) => m.name) as material, id}
                <option value={material}>{material} </option>
              {/each}
            </select>
          </td>
          <td>
            <button
              on:click={() => {
                flipPart(el.id);
              }}
            >
              <icon>
                <FaRedo />
              </icon>
            </button>
          </td>
          <td>
            <button
              on:click={() => {
                removePart(el.id);
              }}
            >
              <icon>
                <FaMinus />
              </icon>
            </button>
          </td>
        </tr>
      {/each}
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
  select {
    padding: 4px;
    width: 100%;
    min-width: 100px;
    height: 40px;
    border: none;
    background-color: transparent;
    font-size: 0.8em;
    font-family: sans-serif;
    border: 1px sole #dddddd;
  }
</style>
