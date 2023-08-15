<script lang="ts">
  export let tableData = [
    {
      id: 1,
      name: "name",
      email: "email",
    },
  ];

  const getHeaders = () => {
    return Object.keys(tableData[0]);
  };
  let headers = getHeaders();
</script>

<div>
  <table class="styled-table">
    <thead>
      <tr>
        {#each headers as header, id (header)}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each tableData as row, id (row)}
        <tr>
          {#each headers as header, id (header)}
            <td>{row[header]}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="scss">
  .styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  }
  .styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }
  .styled-table th,
  .styled-table td {
    padding: 6px 8px;
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
</style>
