import * as XLSX from "xlsx";

export function generateExcelReport(data: object[]) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Máquinas");
  XLSX.writeFile(workbook, "relatorio_maquinas.xlsx");
}
