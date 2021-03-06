const fs = require("fs");
const PDFDocument = require("pdfkit");

// const borderCollapse = false;
// const borderWidth = 10;
// const cellPadding = 10;
// const cellWidth = 200;
// const cellHeight = 200;

class PDFDocumentWithCells extends PDFDocument {
  constructor(options, cellOptions) {
    super(options);
    this.cellOptions = cellOptions;
    if (this.cellOptions === undefined) {
      this.cellOptions = {};
    }

    const {
      borderCollapse = true,
      borderWidth = 10,
      cellPadding = 10,
      cellWidth = 200,
      cellHeight = 200,
    } = this.cellOptions;
    const usableTextWidth = cellWidth - borderWidth - 2 * cellPadding;
    console.log("borderCollapse:", borderCollapse);
    console.log("borderWidth:", borderWidth);
    console.log("cellPadding:", cellPadding);
    console.log("cellWidth:", cellWidth);
    console.log("cellHeight:", cellHeight);

    // borderWidth set by user or default to 10 point
    // cellPadding set by user or default to 10 point top, left, right and bottom
    // cellWidth set by user or default t0 200 point
    // actual cellWidth include the border is borderWidth / 2 + cellWidth + borderWidth / 2
    // cellHeight set by user or default t0 200 point
    // actual cellHeight include the border is borderWidth / 2 + cellWidth + borderWidth / 2
    // usableTextWidth is cellWidth - borderWidth / 2 - borderWidth / 2 - 2 * cellPadding
  }

  insertTextCell(text) {
    console.log(text);
  }
}

module.exports = PDFDocumentWithCells;

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

const rowHeight = doc.heightOfString("hello");
// console.log(rowHeight);
doc.pipe(fs.createWriteStream("test.pdf"));

// function textBox(text, cellOptions)
// @param text = string
// @param cellOption[optional] = {
//   borderCollapse: boolean,
//   borderWidth: number,
//   cellPadding: number,
//   cellWidth: number,
//   cellHeight: number,
// }
function textBox(text, cellOptions) {
  if (cellOptions === undefined) {
    cellOptions = {};
  }

  let borderCollapse;

  if (cellOptions.borderCollapse === undefined) {
    borderCollapse = true;
  } else {
    borderCollapse = cellOptions.borderCollapse;
  }

  // borderWidth set by user or default to 10 point
  // cellPadding set by user or default to 10 point top, left, right and bottom
  // cellWidth set by user or default t0 200 point
  // actual cellWidth include the border is borderWidth / 2 + cellWidth + borderWidth / 2
  // cellHeight set by user or default t0 200 point
  // actual cellHeight include the border is borderWidth / 2 + cellWidth + borderWidth / 2
  // usableTextWidth is cellWidth - borderWidth / 2 - borderWidth / 2 - 2 * cellPadding
  const borderWidth = cellOptions.borderWidth || 10;
  const cellPadding = cellOptions.cellPadding || 10;
  const cellWidth = cellOptions.cellWidth || 200;
  const cellHeight = cellOptions.cellHeight || 200;
  const usableTextWidth = cellWidth - borderWidth - 2 * cellPadding;
  // get doc.y
  // console.log(doc.y);
  // check doc.y + nextboxtotalheight < doc.page.maxY()

  // if true run below code
  // else run doc.addPage()
  // after run addPage insert new textbox

  if (borderCollapse) {
    // totalheight = 2*borderWidth + boxHeight
    // doc.rect(5, 5, 200, 200).lineWidth(10).stroke();
    // doc.rect(5, 205, 200, 200).stroke();
    doc
      .rect(
        doc.x + borderWidth / 2,
        doc.y + borderWidth / 2,
        cellWidth,
        cellHeight
      )
      .lineWidth(borderWidth)
      .stroke("black");

    const prevX = doc.x;
    const prevY = doc.y;
    // Position line x line feed after borderWidth and cellPadding
    doc.x = doc.x + borderWidth + cellPadding;
    doc.y = doc.y + borderWidth + cellPadding;
    doc.text(text, doc.x, doc.y);
    doc.x = prevX;
    doc.y = prevY;

    doc.y = doc.y + cellHeight + borderWidth / 2;
  } else {
    // totalheight =
    // doc.rect(5, 5, 200, 200).lineWidth(10).stroke();
    // doc.rect(5, 215, 200, 200).stroke();

    doc
      .rect(
        doc.x + borderWidth / 2,
        doc.y + borderWidth / 2,
        cellWidth,
        cellHeight
      )
      .lineWidth(borderWidth)
      .stroke();
    // next line feed
    doc.y = doc.y + cellHeight + borderWidth;
  }
}

// textBox(
// 	'Berdasarkan data menerusi laman web COVIDNOW, sejumlah 13,924,411 atau 59.2 peratus populasi dewasa di dalam negara pula menerima dos penggalak COVID-19 dan seramai 22,943,785 atau 97.5 peratus lengkap vaksinasi, manakala 23,220,757 atau 98.7 peratus menerima sekurang-kurangnya satu dos.',
// 	{ borderCollapse: true }
// );
textBox("Hello", { borderCollapse: true });
textBox("Hello", { borderCollapse: true });
// textBox('Hello', { borderCollapse: true });

doc.end();
