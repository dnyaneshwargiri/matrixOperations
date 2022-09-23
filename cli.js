const process = require('process');
const csv = require('csv-stream')
const fs = require('fs'); 
const parse = require('csv-parse');

let inputFile="/"+process.argv[2]
let outputFile=process.argv[3]



var parser = parse.parse({columns: true}, function (err, records) {
	console.log(records);
});

fs.createReadStream(__dirname+inputFile).pipe(parser);