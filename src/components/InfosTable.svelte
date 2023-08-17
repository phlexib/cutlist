<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import FaEye from "svelte-icons/fa/FaEye.svelte";
  import { selectedCut } from "../stores/app-store";
  export let tableData = [
    {
      id: 1,
      name: "name",
      email: "email",
    },
  ];

  let item;
  const getHeaders = () => {
    return Object.keys(tableData[0]);
  };
  let headers = getHeaders();

  const handleClick = (item) => {
    selectedCut.set(item);
    console.log(item);
  };

  //   onMount(() => {
  //     item = document.getElementById(part.id);
  //     if (item) {
  //       item.addEventListener("click", handleClick);
  //     }
  //   });
  //   onDestroy(() => {
  //     document.removeEventListener("click", handleClick, {
  //       capture: true,
  //     });
  //   });
</script>

<div>
  <table class="styled-table">
    <thead>
      <tr>
        {#each headers as header, id (header)}
          <th>{header}</th>
        {/each}
        <th>show</th>
      </tr>
    </thead>
    <tbody>
      {#each tableData as row, id (row)}
        <tr id={row.id.toString()}>
          {#each headers as header, id (header)}
            <td>{row[header]}</td>
          {/each}
          <td
            ><button
              on:click={() => {
                handleClick(row);
              }}
            >
              <icon>
                <FaEye />
              </icon>
            </button></td
          >
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
  icon {
    width: 100%;
    height: 100%;
  }
  button {
    width: 24px;
    height: 24px;
    padding: 4px;
  }
</style>
