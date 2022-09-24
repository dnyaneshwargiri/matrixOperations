const process = require("process");
const fs = require("fs");
const parse = require("csv-parse");
const { format } = require("@fast-csv/format");
const stream = format({ delimiter: "," });
const csvParser = parse.parse({ columns: true });
if (process.argv.length < 3) throw new Error("No input file provided");
const inputFile = "/" + process.argv[2];
const outputFileHeaders = ["id", "json", "is_valid"];
stream.pipe(process.stdout);
const emptyList = "[]";
const openingSquare = "[";
const closingSquare = "]";

function isMatrixPossible(table) {
  let rowCount = (columnCount = 0);
  let isValidMatrix = false;
  const length = table.length;
  isValidMatrix = length > 0 && Math.sqrt(length) % 1 === 0;
  isValidMatrix
    ? (rowCount = columnCount = Math.sqrt(length))
    : (rowCount = columnCount = 0);
  switch (isValidMatrix) {
    //square matrix
    case true:
      return [true, rowCount, columnCount];
    case false:
      //rectangular matrix
      return [false, rowCount, columnCount];
    default:
      return [false, rowCount, columnCount];
  }
}

function buildMatrix(table, rowCount, columnCount) {
  let matrix = [];
  for (let iterator = 0; iterator < rowCount; iterator++) {
    matrix[iterator] = table.slice(
      iterator * columnCount,
      iterator * columnCount + columnCount
    );
  }
  return matrix;
}

function buildList(matrix, rowCount, columnCount) {
  let tempList = [];
  for (let iterator = 0; iterator < rowCount; iterator++) {
    for (let innerIterator = 0; innerIterator < columnCount; innerIterator++) {
      tempList.push(matrix[iterator][innerIterator]);
    }
  }
  return tempList;
}

function rotateMatrixEdges(matrix, rowCount, columnCount) {
  const k = 1;
  let top = 0,
    bottom = rowCount - 1,
    left = 0,
    right = columnCount - 1;
  while (top <= bottom) {
    let elements = [];
    for (let iterator = left; iterator <= right; iterator++) {
      elements.push(matrix[top][iterator]);
    }
    for (let iterator = top + 1; iterator <= bottom; iterator++) {
      elements.push(matrix[iterator][right]);
    }
    for (let iterator = right - 1; iterator >= left; iterator--) {
      elements.push(matrix[bottom][iterator]);
    }
    for (let iterator = bottom - 1; iterator > top; iterator--) {
      elements.push(matrix[iterator][left]);
    }
    if (elements.length <= k) {
      break;
    }
    let size = elements.length;
    let index = size - k;
    for (let iterator = left; iterator <= right; iterator++) {
      matrix[top][iterator] = elements[index];
      index++;
      index %= size;
    }
    for (let iterator = top + 1; iterator <= bottom; iterator++) {
      matrix[iterator][right] = elements[index];
      index++;
      index %= size;
    }
    for (let iterator = right - 1; iterator >= left; iterator--) {
      matrix[bottom][iterator] = elements[index];
      index++;
      index %= size;
    }
    for (let iterator = bottom - 1; iterator > top; iterator--) {
      matrix[iterator][left] = elements[index];
      index++;
      index %= size;
    }
    top++;
    bottom--;
    left++;
    right--;
  }
  return matrix;
}

function rotateTable(table, id) {
  table = JSON.parse(table);
  const matrix = isMatrixPossible(table);
  const isValidMatrix = matrix[0];
  const rowCount = matrix[1];
  const columnCount = matrix[2];
  return isValidMatrix
    ? [
        id,
        openingSquare +
          buildList(
            rotateMatrixEdges(
              buildMatrix(table, rowCount, columnCount),
              rowCount,
              columnCount
            ),
            rowCount,
            columnCount
          ) +
          closingSquare,
        true,
      ]
    : [id, emptyList, false];
}

function readCSV() {
  fs.createReadStream(__dirname + inputFile)
    .pipe(csvParser)
    .on("data", (element) => {
      try {
        stream.write(rotateTable(element.json, Number(element.id)));
      } catch (e) {
        console.log(`Error- File is not properly formatted.${e}`);
      }
    })
    .on("end", function () {
      stream.end();
    })
    .on("error", (err) => {
      console.log(`\nError- Invalid row in the input file-,${err}`);
    });
}

stream.write(outputFileHeaders);
readCSV();

module.exports = {
  isMatrixPossible,
  buildMatrix,
  buildList,
  rotateMatrixEdges,
  rotateTable,
};
