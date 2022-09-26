<script lang="ts">
  import { documentSelection, filledPDF, openTemplateFile, populatePDF } from "./stores/pdf";

  const testData = {
    "PSPC-SPAC-446-3E": {
      employeeFirstName: "John",
      employeeLastName: "Smith",
      employeePRI: "123456789",
      workType: "Benefits",
      department: "Employment and Social Development Canada",
      caseNumber: "0001",
      comments: "Some comments",
      pageNumbers: "1",
      date: "11/11/1111",
    },
    "PSPC-SPAC-446-5E": {
      employeeFirstName: "John",
      employeeLastName: "Smith",
      employeePRI: "123456789",
      employeeEmail: "johnsmith@email.com",
      employeeTelephone: "1111111",
      employeeAreaCode: "613",
      workType: "Benefits",
      department: "Employment and Social Development Canada",
      caseNumber: "0001",
      comments: "Some comments",
      // subType: "",
      effectiveStartDate: "11/11/1111",
      requestorName: "Alice",
      requestorEmail: "alice@email.com",
      requestorAreaCode: "343",
      requestorTelephone: "1111111",
      trustedSourceName: "Bob",
      trustedSourceEmail: "bob@email.com",
      trustedSourceAreaCode: "416",
      trustedSourceTelephone: "1111111",
      pageNumbers: "1",
      date: "11/11/1111",
    },
  };

  $: {
    if ($documentSelection) {
      openTemplateFile();
    }
  }
</script>

<main>
  <div class="container">
    <div class="mrgn-tp-lg">
      <h1 id="title">PDF Automation</h1>
    </div>

    <div>
      <h3>Document</h3>
      <div class="form-group mrgn-tp-md">
        <select id="documentSelection" class="form-control" bind:value={$documentSelection}>
          <option label="Select a document" />
          <option value="PSPC-SPAC-446-3E">PSPC-SPAC-446-3E</option>
          <option value="PSPC-SPAC-446-5E">PSPC-SPAC-446-5E</option>
        </select>
      </div>
    </div>

    {#if $documentSelection}
      <div class="mrgn-tp-lg">
        <h3>Example Data</h3>
        <table class="table table-condensed mrgn-tp-lg">
          <thead>
            <tr>
              <th scope="col" class="col-sm-2">Key</th>
              <th scope="col" class="col-sm-6">Value</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.keys(testData[$documentSelection]) as key}
              <tr>
                <td>
                  <small>
                    {key}
                  </small>
                </td>
                <td>
                  <small>
                    {testData[$documentSelection][key]}
                  </small>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>

        <div>
          <button
            class="btn btn-primary mrgn-rght-md"
            on:click={() => {
              populatePDF(testData[$documentSelection]);
            }}>Generate PDF</button
          >
          {#if $filledPDF}
            <a href={$filledPDF} download="Filled.pdf" class="btn btn-success"> Download </a>
          {/if}
        </div>
      </div>
    {/if}

    {#if $filledPDF}
      <div class="pdf-container mrgn-tp-lg">
        <iframe src={$filledPDF} frameborder="0" title="Filled PDF" width="100%" height="100%" />
      </div>
    {/if}
  </div>
</main>

<style>
  main {
    padding-bottom: 20px;
    min-height: 100vh;
  }

  #title {
    border-bottom: 3px solid #af3c43;
    margin-bottom: 0.2em;
    margin-top: 1em;
    padding-bottom: 0.2em;
  }

  .pdf-container {
    width: 100%;
    height: 800px;
  }
</style>
