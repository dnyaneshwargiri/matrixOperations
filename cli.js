const process = require('process');
const fs = require('fs'); 
const parse = require('csv-parse');
const fastcsv = require('fast-csv');

let inputFile="/"+process.argv[2]
let outputFile="/"+process.argv[3]

function verifyMatrix(matrixList){
	let length=matrixList.length;
 	return length > 0 && Math.sqrt(length) % 1 === 0;
} 

function formMatrix(list){
	let n=m=Math.sqrt(list.length);
	let matrix=[]
	for(let i=0;i<n;i++){
	  matrix[i]=list.slice(i*m,i*m+m)
	}	
	return matrix
}

function formList(matrix,n,m){
	let tempList=[]
	for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            tempList.push(matrix[i][j])
        }
    }
	return tempList
}

function rotateMatrixEdges(list){
	let matrix=formMatrix(list)
	let k=1 //rotate by 1 clockwise
	//n = rows
	//m = columns
	let n= matrix.length
	let m= matrix[0].length
    let top=0, bottom=n-1,left=0,right=m-1;
    // Rotate while the ring exists.
    while(top<=bottom){
        // To hold the ring elements.
        let elements=[];
        // Do the spiral traversal and store the ring elements.
        for(let i=left;i<=right;i++){
            elements.push(matrix[top][i]);
        }
        for(let i=top+1;i<=bottom;i++){
            elements.push(matrix[i][right]);
        }
        for(let i=right-1;i>=left;i--){
            elements.push(matrix[bottom][i]);
        }
        for(let i=bottom-1;i>top;i--){
            elements.push(matrix[i][left]);
        }
        // Check if the ring size is less than or equal to k
        // If true, break as the rings after will also be smaller than k.
        if(elements.length<=k){
            break;
        }
        // Rotation starts.
        // index represents the index of the position that should be at the start of the ring.
        let size=elements.length;
        let index=size-k;
        // Store the rotated ring.
        for(let i=left;i<=right;i++){
            matrix[top][i]=elements[index];
            index++; index%=size;
        }
        for(let i=top+1;i<=bottom;i++){
            matrix[i][right]=elements[index];
            index++; index%=size;
        }
        for(let i=right-1;i>=left;i--){
            matrix[bottom][i]=elements[index];
            index++; index%=size;
        }
        for(let i=bottom-1;i>top;i--){
            matrix[i][left]=elements[index];
            index++; index%=size;
        }
        // Update the rotation parameters.
        top++; bottom--;
        left++; right--;
    }

	return formList(matrix,n,m)
}

function getRotatedTable(list,id){
	list=JSON.parse(list)
	return verifyMatrix(list) ? [id,'['+rotateMatrixEdges(list)+']',true] : [id,"[]",false]
}

data=[]
const csvParser = parse.parse({columns: true}, function (err, records) {
	//rotate each table
	records.forEach(element => {		
		data.push(getRotatedTable(element.json,Number(element.id)))
	});
}).on("end",function(){
	data.unshift(["id","json",'is_valid'])
	const writeStream = fs.createWriteStream(__dirname+outputFile);
	let writeCsv=fastcsv.write(data,{headers:true}).pipe(writeStream)
});

fs.createReadStream(__dirname+inputFile).pipe(csvParser);



