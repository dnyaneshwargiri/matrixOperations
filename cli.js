const process = require('process');
const fs = require('fs'); 
const parse = require('csv-parse');
const fastcsv = require('fast-csv');

let inputFile="/"+process.argv[2]
let outputFile="/"+process.argv[3]
var writeStream = fs.createWriteStream(__dirname+outputFile);

var parser = parse.parse({columns: true}, function (err, records) {
	console.log(records);
});
fs.createReadStream(__dirname+inputFile).pipe(parser);

fastcsv.write([ ["id","json" ],['3','"[6,7]"' ]],{headers:true}).pipe(writeStream)






// for(var i = 0; i < tempArray.length; i++){
//     fast_csv.write( [ tempArray[i]  ] );             //each element inside bracket
//     }
// fast_csv.end();