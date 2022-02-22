const doc = require("pdfkit");
const PDFDocumentWithCells = require("./cell");

class PDFDocumentWithTables extends PDFDocumentWithCells {}

const cell = new PDFDocumentWithCells({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

cell.insertTextCell("Text");

const configCell = {};

doc.table(table, {
  header: [],
  rows: [],
});
