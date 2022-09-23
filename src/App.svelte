<script lang="ts">
  import { filledPDF, openTemplateFile, populatePDF } from "./stores/pdf";

  openTemplateFile();

  const testData = {
    firstName: "John",
    lastName: "Smith",
    date: "11/11/1111",
    pageNumbers: "1",
    workType: "Benefits",
    comments: "Some comments",
    caseNumber: "0001",
    pri: "123456789",
    department: "Employment and Social Development Canada",
  };

  populatePDF(testData);
</script>

<main>
  <div class="container">
    <div class="mrgn-tp-lg">
      <h1 id="title">PDF Automation</h1>
    </div>

    <div>
      <h3>Example Data</h3>
      <table class="table table-condensed mrgn-tp-lg">
        <thead>
          <tr>
            <th scope="col" class="col-sm-2">Key</th>
            <th scope="col" class="col-sm-6">Value</th>
          </tr>
        </thead>
        <tbody>
          {#each Object.keys(testData) as key}
            <tr>
              <td>
                <p>
                  {key}
                </p>
              </td>
              <td>
                <p>
                  {testData[key]}
                </p>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>

      <div>
        <button
          class="btn btn-primary mrgn-rght-md"
          on:click={() => {
            populatePDF(testData);
          }}>Generate PDF</button
        >
        {#if $filledPDF}
          <a href={$filledPDF} download="Filled.pdf"> Download </a>
        {/if}
      </div>
    </div>

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
