# matrixOperations

To run=

node cli.js inputFileName > outputFile

Test cases=

1. Square matrix 

Input=
<code>
id,json
1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
</code>
 Workflow=
 i. Make matrix from list- here it is square matrix case hence result matrix is
   <code>

   				[[1, 2, 3],
input matrix=	[ 4, 5, 6], 
   				[7, 8, 9]]

rotate clockwise by 1 step

   				[[4, 1, 2],
roated matrix=	[ 7, 5, 3], 
   				[8, 9, 6]]

output list= [4,1,2,7,5,3,8,9,6]

 </code>

  Expected Output=
<code>
  1,"[4,1,2,7,5,3,8,9,6]",true
</code>
 

2. Rectangular matrix=


3. Invalid matrix=
  Input=
  8,"[1, 1, 1, 1, 1]"

  Workflow=
  1. check for possible matrix formation- couldnt form matrix of of length 5 which result in 1 column 5 row
  2. for sinle column matrix cant perform edge rotation as edge has lenght=1

  Output=
  8,"[]", false

How it works=

Rotation Algorithm:

Time Complexity=
The time complexity of the above alogorithm is O(N * M), where N and M are the dimensions of the input matrix. It is because we are looping through the matrix once.

Space Complexity=
The Space Complexity of the above approach is O(N + M), where N and M are the dimensions of the input matrix. It is because we are creating a array to store the elements of the rings and the maximum possible size of a ring < 2 * (N + M).

Performance handeling=

Used readStream to process each row as below

fs.createReadStream(__dirname+inputFile).pipe(csvParser).on('data', (element) => {
	//rotate each table
	stream.write(getRotatedTable(element.json,Number(element.id)))
})

Data Cases- 

1. Square matrix- checking if square root of length of list is whole postive number
2. Rectangular matrix- Calculating various possibilites of matrix can be formed from given length 'l' as below
   
Error Cases-
1. No file provided- handled at begining of program by checking number of process arguments
2. No file present- 'ENOENT: no such file or directory' error throw
3. Matrix not possible-
