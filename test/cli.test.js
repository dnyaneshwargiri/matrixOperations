const expect = require("chai").expect;
const app = require("../cli");

it("Should verify if list can form correct matrix for same rows and column", function () {
  const squareMatrix = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = app.isMatrixPossible(squareMatrix);
  const expectedResult = [true, 3, 3];
  expect(result).deep.to.equal(expectedResult);
});

it("Should verify if list decide invalid matrix for different rows and column", function () {
  const nonSquareMatrix = [1, 1, 1, 1, 1];
  result = app.isMatrixPossible(nonSquareMatrix);
  expectedResult = [false, 0, 0];
  expect(result).deep.to.equal(expectedResult);
});

it("Should form a matrix for given list", function () {
  const squareList = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const n = (m = Math.sqrt(squareList.length));
  const result = app.buildMatrix(squareList, n, m);
  const expectedResult = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  expect(result).deep.to.equal(expectedResult);
});

it("Should form a list for given matrix input-1", function () {
  const input = [
    [4, 1, 2],
    [7, 5, 3],
    [8, 9, 6],
  ];
  const result = app.buildList(input, input.length, input[0].length);
  const expectedResult = [4, 1, 2, 7, 5, 3, 8, 9, 6];
  expect(result).deep.to.equal(expectedResult);
});

it("Should form a list for given matrix input-2", function () {
  const input = [
    [40, 20],
    [90, 10],
  ];
  const result = app.buildList(input, input.length, input[0].length);
  const expectedResult = [40, 20, 90, 10];
  expect(result).deep.to.equal(expectedResult);
});

it("Should rotate a matrix edges correctly clockwise input-1", function () {
  const input = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const n = (m = input.length);
  const rotateDirection="CLOCKWISE"
  const result = app.rotateMatrixEdges(input, n, m,rotateDirection);
  const expectedResult = [
    [4, 1, 2],
    [7, 5, 3],
    [8, 9, 6],
  ];
  expect(result).deep.to.equal(expectedResult);
});

it("Should rotate a matrix edges correctly clockwise input-2", function () {
  const input = [
    [40, 20],
    [90, 10],
  ];
  const n = (m = input.length);
  const rotateDirection="CLOCKWISE"
  const result = app.rotateMatrixEdges(input, n, m,rotateDirection);
  const expectedResult = [
    [90, 40],
    [10, 20],
  ];
  expect(result).deep.to.equal(expectedResult);
});

it("Should rotate a matrix edges correctly anticlockwise input-1", function () {
  const input = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const n = (m = input.length);
  const rotateDirection="ANTICLOCKWISE"
  const result = app.rotateMatrixEdges(input, n, m,rotateDirection);
  const expectedResult = [
    [2, 3, 6],
    [1, 5, 9],
    [4, 7, 8],
  ];
  expect(result).deep.to.equal(expectedResult);
});

it("Should get rotated table for a table list input-1", function () {
  const input = {
    id: 14,
    json: "[1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]",
  };
  const result = app.rotateTable(input.json, Number(input.id));
  const expectedResult = [14, "[5,1,2,3,9,10,6,4,13,11,7,8,14,15,16,12]", true];
  expect(result).deep.to.equal(expectedResult);
});

it("Should get rotated table for a table list input-2", function () {
  const input = { id: 3, json: "[-5]" };
  const result = app.rotateTable(input.json, Number(input.id));
  const expectedResult = [3, "[-5]", true];
  expect(result).deep.to.equal(expectedResult);
});

it("Should get rotated table for a table list input-3", function () {
  const input = { id: 9, json: "[2, -0]" };
  const result = app.rotateTable(input.json, Number(input.id));
  const expectedResult = [9, "[]", false];
  expect(result).deep.to.equal(expectedResult);
});

it("Should get rotated table for a table list input-4", function () {
  const input = { id: 1, json: "[1, 2, 3, 4, 5, 6, 7, 8, 9]" };
  const result = app.rotateTable(input.json, Number(input.id));
  const expectedResult = [1, "[4,1,2,7,5,3,8,9,6]", true];
  expect(result).deep.to.equal(expectedResult);
});

it("Should get rotated table for a table list input-5", function () {
  const input = { id: 2, json: "[40, 20, 90, 10]" };
  const result = app.rotateTable(input.json, Number(input.id));
  const expectedResult = [2, "[90,40,10,20]", true];
  expect(result).deep.to.equal(expectedResult);
});

it("Should get rotated table for a table list input-6", function () {
  const input = { id: 5, json: "[2, -5, -5]" };
  const result = app.rotateTable(input.json, Number(input.id));
  const expectedResult = [5, "[]", false];
  expect(result).deep.to.equal(expectedResult);
});

it("Should get rotated table for a table list input-7", function () {
  const input = { id: 8, json: "[1, 1, 1, 1, 1]" };
  const result = app.rotateTable(input.json, Number(input.id));
  const expectedResult = [8, "[]", false];
  expect(result).deep.to.equal(expectedResult);
});
