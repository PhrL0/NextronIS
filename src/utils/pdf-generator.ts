import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function generatePDFReport(data) {
  const doc = new jsPDF();
  doc.text('Relatório de Máquinas', 14, 20);
  const tableColumn = ['ID', 'Nome', 'Temperatura', 'Vibração'];
  const tableRows = [];

  data.forEach((machine) => {
    const machineData = [machine.id, machine.name, machine.temperature, machine.vibration];
    tableRows.push(machineData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30
  });

  doc.save('relatorio_maquinas.pdf');
}
