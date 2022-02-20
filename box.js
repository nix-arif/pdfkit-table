const fs = require('fs');
const PDFDocument = require('pdfkit');

const borderCollapse = false;

const doc = new PDFDocument({
	size: 'A4',
	margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

const rowHeight = doc.heightOfString('hello');
console.log(rowHeight);
doc.pipe(fs.createWriteStream('test.pdf'));

if (borderCollapse) {
	// totalheight = 2*borderWidth + boxHeight
	doc.rect(5, 5, 200, 200).lineWidth(10).stroke();
	doc.rect(5, 205, 200, 200).stroke();
} else {
	// totalheight =
	doc.rect(5, 5, 200, 200).lineWidth(10).stroke();
	doc.rect(5, 215, 200, 200).stroke();
}

console.log(doc.y);

doc.end();
