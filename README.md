# matrixOperations

**To run**

<code>node cli.js inputFileName.csv > outputFile.csv</code>

OR

<code>node cli.js inputFileName.csv</code>

**Test cases-**
Run test cases using
<code>npm run test</code>

1. Square matrix 

		Input=
		
		id,json
		1,"[1, 2, 3, 4, 5, 6, 7, 8, 9]"
		

		 Workflow=

		 i] Make matrix from list.

		  

			input matrix=	

						[[1, 2, 3],

						[ 4, 5, 6], 

						[7, 8, 9]]

		
		ii] Rotate clockwise by 1 step.

		

			rotated matrix=	

						[[4, 1, 2],
						[ 7, 5, 3], 
						[8, 9, 6]]
		



		iii] Matrix to list conversion= [4,1,2,7,5,3,8,9,6]



		  Expected Output=

		

		  1,"[4,1,2,7,5,3,8,9,6]",true

		
 

2. Rectangular matrix=

3. Invalid matrix=
		  Input=
		  8,"[1, 1, 1, 1, 1]"

		  Workflow=
		  1. Check for possible matrix formation- couldn’t form matrix of length 5 for which result is 1 column  & 5 rows
		  2. For single column matrix can’t perform edge rotation as edge has length=1

		  Output=
		  8,"[]", false


**Rotation Algorithm**
1. Start

2. let top=0, bottom=rows-1

3. Traverse the matrix in spiral order that is
   left 	=>		right         
   ||				 ||
   left 	<=		bottom

   and store it in list namely A.

4. Set k=1 as we have to rotate by 1 step

5. Do

   if length(A) <=k break

   let index= length(A)-k   
   
   Start assigning values to matrix from list A in below order
   i. left => right, for Each element do {update index++; index=index% length(A)}
   ii. right => bottom, for Each element do {update index++; index=index% length(A)}
   iii. bottom => top, for Each element do {update index++; index=index% length(A)}

   update below parameter as 
   top++
   bottom--
   left++
   right--

6. while top <= bottom repeat step 3 to 5 else break.
    


**Performance handling-**

Used readStream to process each row as below.

<code>
fs.createReadStream(__dirname+inputFile).pipe(csvParser).on('data', (element) => {
	//rotate each table
	stream.write(rotateTable(element.json,Number(element.id)))
})
</code>




**Time Complexity=**

The time complexity of the above algorithm is <code>O(N * M)</code>, where N and M are the dimensions of the input matrix. It is because we are looping through the matrix once.

**Space Complexity=**

The Space Complexity of the above approach is <code>O(N + M)</code>, where N and M are the dimensions of the input matrix. It is because we are creating a array to store the elements of the rings and the <code>maximum possible size of a ring < 2 * (N + M)</code>.

	
**Data Cases-**

1. Square matrix- checking if square root of length of list is whole positive number
2. Rectangular matrix- Calculating various possibilities of matrix can be formed from given length 'l' 
   
**Error Cases-**

1. No file provided- handled at beginning of program by checking number of process arguments
2. No file present- 'ENOENT: no such file or directory' error throw
3. Matrix not possible- output= id,[], false
