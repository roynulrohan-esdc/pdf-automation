import { PDFDocument } from "pdf-lib";
import { get, writable } from "svelte/store";

const pdfDoc = writable<PDFDocument>();
export const filledPDF = writable<any>();

const pdfFieldNames = {
  firstName: "PWGSC-TPSGC446-3E[0].Page1[0].FirstNme[0]",
  lastName: "PWGSC-TPSGC446-3E[0].Page1[0].LastName[0]",
  pageNumbers: "PWGSC-TPSGC446-3E[0].Page1[0].sfHeader[0].PageNumberOne[0]",
  date: "PWGSC-TPSGC446-3E[0].Page1[0].sfHeader[0].ActionRequestDate[0]",
  workType: "PWGSC-TPSGC446-3E[0].Page1[0].WorkTypeList[0]",
  comments: "PWGSC-TPSGC446-3E[0].Page1[0].Comments[0]",
  caseNumber: "PWGSC-TPSGC446-3E[0].Page1[0].CaseNumber[0]",
  pri: "PWGSC-TPSGC446-3E[0].Page1[0].PRI[0]",
  barcode: "PWGSC-TPSGC446-3E[0].Page1[0].Code3of9BarCode1[0]",
  department: "PWGSC-TPSGC446-3E[0].Page1[0].DropDownList1[0]",
};

export const openTemplateFile = async () => {
  const existingPdfBytes = await fetch("./Template.pdf").then((res) => res.arrayBuffer());

  const pdf = await PDFDocument.load(existingPdfBytes);

  pdfDoc.set(pdf);
};

export const populatePDF = async (data) => {
  if (!get(pdfDoc)) {
    return;
  }

  const pdf: PDFDocument = get(pdfDoc);

  const form = pdf.getForm();

  const keys = Object.keys(data);

  keys.forEach((key) => {
    if (key !== "department" && key !== "workType") {
      const textField = form.getTextField(pdfFieldNames[key]);

      textField.setText(data[key]);
    } else {
      const dropdown = form.getDropdown(pdfFieldNames[key]);

      dropdown.select(data[key]);
    }
  });

  const pdfBytes = await pdf.save();

  const blob = new Blob([pdfBytes], {
    type: "application/pdf",
  });

  filledPDF.set(URL.createObjectURL(blob));
};
