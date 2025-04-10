import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Papa from "papaparse";
import ExcelJS from "exceljs";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

function exportToXLSX<TObject extends object>(
  jsonData: TObject[],
  fileName = new Date().toISOString()
) {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, `${fileName}.xlsx`);
}

function exportToCSV<TObject extends object>(
  jsonData: TObject[],
  fileName = new Date().toISOString()
) {
  const csv = Papa.unparse(jsonData);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  saveAs(blob, `${fileName}.csv`);
}

function exportToTXT<TObject extends object>(
  jsonData: TObject[],
  fileName = new Date().toISOString()
) {
  const textContent = jsonData.map((row) => JSON.stringify(row)).join("\n");
  const blob = new Blob([textContent], { type: "text/plain;charset=utf-8;" });
  saveAs(blob, `${fileName}.txt`);
}

function exportToPDF<TObject extends object>(
  jsonData: TObject[],
  fileName = new Date().toISOString()
) {
  const doc = new jsPDF();
  const header = [Object.keys(jsonData[0])];
  const data = jsonData.map((item) => Object.values(item));

  autoTable(doc, {
    head: header,
    body: data,
    styles: {
      fontSize: 6,
      fillColor: "#ffffff",
      lineWidth: 0.01,
      lineColor: "#313131",
    },
    headStyles: { fillColor: "#313131" },
  });

  doc.save(`${fileName}.pdf`);
}

// exportar XLSX com ExcelJS (caso precise de estilos avançados)
async function exportToExcelJS<TObject extends object>(
  jsonData: TObject[],
  fileName = new Date().toISOString()
) {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  worksheet.columns = Object.keys(jsonData[0]).map((key) => ({
    header: key,
    key,
  }));

  jsonData.forEach((row) => worksheet.addRow(row));
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `${fileName}.xlsx`);
}

function exportTo<TObject extends object>(
  format: ExportFormat,
  data: TObject[],
  fileName = new Date().toISOString()
) {
  switch (format) {
    case "xlsx":
      exportToXLSX(data, fileName);
      break;
    case "csv":
      exportToCSV(data, fileName);
      break;
    case "txt":
      exportToTXT(data, fileName);
      break;
    case "pdf":
      exportToPDF(data, fileName);
      break;
    case "exceljs":
      exportToExcelJS(data, fileName);
      break;
    default:
      console.error("Formato não suportado");
  }
}
export { exportTo };

type ExportFormat = "xlsx" | "csv" | "txt" | "pdf" | "exceljs";
