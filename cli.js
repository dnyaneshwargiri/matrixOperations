const process = require('process');
const fs = require('fs'); 
const parse = require('csv-parse');
const fastcsv = require('fast-csv');

let inputFile="/"+process.argv[2]
let outputFile="/"+process.argv[3]


function verifyMatrix(matrixList){
	let length=JSON.parse(matrixList).length;
 	return length > 0 && Math.sqrt(length) % 1 === 0;
} 

function rotateMatrix(matrix){
 console.log(matrix)
}
function getRotatedTable(matrix){
	return verifyMatrix(matrix) ? rotateMatrix(matrix) : [[],false]
}

function writeCsv(){

}

const writeStream = fs.createWriteStream(__dirname+outputFile);
const csvParser = parse.parse({columns: true}, function (err, records) {
	//rotate each matrix
	records.forEach(element => {
		getRotatedTable(element.json)
	});
});
//let writeCsv=fastcsv.write([ ["id","json" ],['3','"[6,7]"' ]],{headers:true}).pipe(writeStream)

fs.createReadStream(__dirname+inputFile).pipe(csvParser);








// for(const i = 0; i < tempArray.length; i++){
//     fast_csv.write( [ tempArray[i]  ] );             //each element inside bracket
//     }
// fast_csv.end();