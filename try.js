const fs = require("fs");
const PDFDocument = require("pdfkit");

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

doc.pipe(fs.createWriteStream("try.pdf"));

doc.rect(5, 5, 200, 200).lineWidth(10).stroke();
doc.rect(5, 215, 200, 200).lineWidth(10).stroke("red");

doc.end();
