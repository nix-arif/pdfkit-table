const fs = require("fs");
const PDFDocument = require("pdfkit");

// const borderCollapse = false;
// const borderWidth = 10;
// const cellPadding = 10;
// const cellWidth = 200;
// const cellHeight = 200;

const doc = new PDFDocument({
  size: "A4",
  margins: { top: 0, left: 0, right: 0, bottom: 0 },
});

const rowHeight = doc.heightOfString("hello");
// console.log(rowHeight);
doc.pipe(fs.createWriteStream("test.pdf"));

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

  const borderWidth = cellOptions.borderWidth || 10;
  const cellPadding = cellOptions.cellPadding || 10;
  const cellWidth = cellOptions.cellWidth || 200;
  const cellHeight = cellOptions.cellHeight || 200;

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
      .stroke();

    const prevX = doc.x;
    const prevY = doc.y;
    doc.text(text, 10, 10);
    doc.x = prevX;
    doc.y = prevY;

    doc.y = doc.y + cellHeight + borderWidth / 2;
  } else {
    // totalheight =
    // doc.rect(5, 5, 200, 200).lineWidth(10).stroke();
    // doc.rect(5, 215, 200, 200).stroke();

    console.log(doc.y);
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
    console.log("doc.y:", doc.y);
  }
}

textBox("Hello", { borderCollapse: true });
textBox("Hello", { borderCollapse: true });
textBox("Hello", { borderCollapse: true });
textBox("Hello", { borderCollapse: true });
textBox("Hello", { borderCollapse: true });
textBox("Hello", { borderCollapse: true });

doc.end();
