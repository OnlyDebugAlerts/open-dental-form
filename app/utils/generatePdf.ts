import jsPDF from 'jspdf';

export const generatePdf = async (screenshots: string[]) => {
  const doc = new jsPDF();

  screenshots.forEach((screenshot, index) => {
    if (index > 0) {
      doc.addPage();
    }

    // Устанавливаем размеры страницы A4
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Добавляем скриншот на всю страницу с небольшими отступами
    doc.addImage(screenshot, 'PNG', 10, 10, pageWidth - 20, pageHeight - 20);
  });

  return doc.output('blob');
}; 