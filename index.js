const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({
	size: 'A4',
	margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

doc.pipe(fs.createWriteStream('example.pdf'));

const arrayList = [
	'Berdasarkan data menerusi laman web COVIDNOW, sejumlah 13,924,411 atau 59.2 peratus populasi dewasa di dalam negara pula menerima dos penggalak COVID-19 dan seramai 22,943,785 atau 97.5 peratus lengkap vaksinasi, manakala 23,220,757 atau 98.7 peratus menerima sekurang-kurangnya satu dos.',
	// 'Sebanyak 151,156 dos suntikan vaksin diberikan semalam membabitkan 72,991 suntikan dos pertama, 648 suntikan dos lengkap dan 77,517 suntikan dos penggalak menjadikan jumlah kumulatif vaksin bagi Program Imunisasi COVID-19 Kebangsaan (PICK) kini meningkat kepada 66,018,432.',
	// 'Sementara itu, menurut portal GitHub Kementerian Kesihatan, sejumlah 34 kes kematian akibat COVID-19 direkodkan semalam dengan Johor melaporkan lapan kes, diikuti Sabah dengan tujuh kes, Selangor (lima), Melaka (empat), masing-masing dua kes di Kedah, Negeri Sembilan dan Perak, manakala satu kes dicatatkan masing-masing di Kelantan, Pulau Pinang, Sarawak dan Terengganu. - BERNAMA',
];

const boxLineWidth = 50;
const cellPadding = 10;

const computeRowHeight = (cell) => {
	const rowHeight = doc.heightOfString(cell, {
		width: 200 - boxLineWidth - 2 * cellPadding,
		align: 'justify',
	});
	return rowHeight;
};

arrayList.forEach((item) => {
	const rowHeight = computeRowHeight(item);
	console.log('rowHeight:', rowHeight);

	const xBoxFeed = doc.x;
	const yBoxFeed = doc.y;

	// x line feed for the text
	doc.x = doc.x + boxLineWidth + cellPadding;
	doc.y = doc.y + boxLineWidth + cellPadding;
	doc.text(item, {
		width: 200 - boxLineWidth - 2 * cellPadding,
		align: 'justify',
	});

	// return doc.y to beginning of the text
	doc.x = xBoxFeed;
	doc.y = yBoxFeed;

	doc
		.rect(doc.x + boxLineWidth / 2, doc.y + boxLineWidth / 2, 200, rowHeight)
		.lineWidth(boxLineWidth)
		.stroke();
});

doc.end();
