const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({
	size: 'A4',
	margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

doc.pipe(fs.createWriteStream('test.pdf'));

doc.rect(5, 5, 200, 200).lineWidth(10).stroke();

doc.fillColor('red').rect(5, 200, 200, 200).stroke();

doc.end();
