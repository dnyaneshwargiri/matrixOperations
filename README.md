# matrixOperations

To run=

node cli.js inputFileName > outputFile

Test cases=

How it works=

Rotation Algorithm:


Performance handeling=

Used readStream to process each row as below

fs.createReadStream(__dirname+inputFile).pipe(csvParser).on('data', (element) => {
	//rotate each table
	stream.write(getRotatedTable(element.json,Number(element.id)))
})

Cases- 

1. Square matrix- checking if square root of length of list is whole postive number
2. Rectangular matrix- Calculating various possibilites of matrix can be formed from given length 'l' as below
   
