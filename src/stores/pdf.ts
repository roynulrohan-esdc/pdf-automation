import { PDFDocument } from "pdf-lib";
import { get, writable } from "svelte/store";

export const documentSelection = writable<string>();
export const filledPDF = writable<string>();

const pdfDoc = writable<PDFDocument>();

const pdfFieldNames = {
  "PSPC-SPAC-446-3E": {
    employeeFirstName: "PWGSC-TPSGC446-3E[0].Page1[0].FirstNme[0]",
    employeeLastName: "PWGSC-TPSGC446-3E[0].Page1[0].LastName[0]",
    employeePRI: "PWGSC-TPSGC446-3E[0].Page1[0].PRI[0]",
    pageNumbers: "PWGSC-TPSGC446-3E[0].Page1[0].sfHeader[0].PageNumberOne[0]",
    date: "PWGSC-TPSGC446-3E[0].Page1[0].sfHeader[0].ActionRequestDate[0]",
    workType: "PWGSC-TPSGC446-3E[0].Page1[0].WorkTypeList[0]",
    comments: "PWGSC-TPSGC446-3E[0].Page1[0].Comments[0]",
    caseNumber: "PWGSC-TPSGC446-3E[0].Page1[0].CaseNumber[0]",
    barcode: "PWGSC-TPSGC446-3E[0].Page1[0].Code3of9BarCode1[0]",
    department: "PWGSC-TPSGC446-3E[0].Page1[0].DropDownList1[0]",
  },
  "PSPC-SPAC-446-5E": {
    employeeFirstName: "PWGSC-TPSGC446-1E[0].Page1[0].EmployeeFirstNme[0]",
    employeeLastName: "PWGSC-TPSGC446-1E[0].Page1[0].EmployeeLastName[0]",
    employeeEmail: "PWGSC-TPSGC446-1E[0].Page1[0].EmployeeEmailAddress[0]",
    employeeTelephone: "PWGSC-TPSGC446-1E[0].Page1[0].EmployeeTelephoneNumber[0]",
    employeeAreaCode: "PWGSC-TPSGC446-1E[0].Page1[0].EmployeeAreaCode[0]",
    employeePRI: "PWGSC-TPSGC446-1E[0].Page1[0].EmployeePRI[0]",
    pageNumbers: "PWGSC-TPSGC446-1E[0].Page1[0].sfHeader[0].PageNumberOne[0]",
    date: "PWGSC-TPSGC446-1E[0].Page1[0].sfHeader[0].ActionRequestDate[0]",
    workType: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].WorkTypeList[0]",
    comments: "PWGSC-TPSGC446-1E[0].Page1[0].Comments[0]",
    caseNumber: "PWGSC-TPSGC446-1E[0].Page1[0].EmployeeCaseNumber[0]",
    department: "PWGSC-TPSGC446-1E[0].Page1[0].DepartmentList[0]",
    subType: "PWGSC-TPSGC446-1E[0].Page1[0].#subform[2].SubTypeList[0]",
    effectiveStartDate: "PWGSC-TPSGC446-1E[0].Page1[0].ActionRequestDate[0]",
    requestorName: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].RequestorName[0]",
    requestorEmail: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].RequestorEmailAddress[0]",
    requestorAreaCode: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].RequestorAreaCode[0]",
    requestorTelephone: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].RequestorTelephoneNumber[0]",
    trustedSourceName: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].TrustedSourceName[0]",
    trustedSourceEmail: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].TrustedSourceEmailAddress[0]",
    trustedSourceAreaCode: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].TrustedSourceAreaCode[0]",
    trustedSourceTelephone: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].TrustedSourceTelephoneNumber[0]",
    barcode: "PWGSC-TPSGC446-1E[0].Page1[0].sfFooter[0].Code3of9BarCode1[0]",
  },
};

export const openTemplateFile = async () => {
  const existingPdfBytes = await fetch(`./templates/${get(documentSelection)}.pdf`).then((res) => res.arrayBuffer());

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

  const fieldNames = pdfFieldNames[get(documentSelection)];

  keys.forEach((key) => {
    if (key !== "department" && key !== "workType" && key !== "subType") {
      const textField = form.getTextField(fieldNames[key]);

      textField.setText(data[key]);
    } else {
      const dropdown = form.getDropdown(fieldNames[key]);

      dropdown.select(data[key]);
    }
  });

  const pdfBytes = await pdf.saveAsBase64({ dataUri: true, updateFieldAppearances: true });

  filledPDF.set(pdfBytes);
};
