const process = require('process');
const fs = require('fs'); 
const parse = require('csv-parse');
const { format } = require('@fast-csv/format');
const stream = format({ delimiter: ',' });

if(process.argv.length<3) throw new Error('No input file provided')

stream.pipe(process.stdout);
let inputFile="/"+process.argv[2]

function getPossibleMatrixDimensions(){
//to-do
}

function verifyMatrix(matrixList){
	let n=m=0
	let isValid=false;
	let length=matrixList.length;
	//square matrix 
	isValid=length > 0 && Math.sqrt(length) % 1 === 0;
	isValid? n=m=Math.sqrt(length): n=m=0;
	//rectangular matrix= not required as per documnetation
	return [isValid,n,m]
} 

function formMatrix(list,n,m){
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

function rotateMatrixEdges(list,n,m){
	//n = rows
	//m = columns
	let matrix=formMatrix(list,n,m)
	let k=1
    let top=0, bottom=n-1,left=0,right=m-1;
    // Rotate while the ring exists.
    while(top<=bottom){
        let elements=[];
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
        if(elements.length<=k){
            break;
        }
        // Rotation starts.
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
        top++; bottom--;
        left++; right--;
    }
	return formList(matrix,n,m)
}

function getRotatedTable(list,id){
	list=JSON.parse(list)
	let isValid=verifyMatrix(list)[0]
	let n=verifyMatrix(list)[1]
	let m=verifyMatrix(list)[2] 
	return isValid ? [id,'['+rotateMatrixEdges(list,n,m)+']',true] : [id,"[]",false]
}

const csvParser = parse.parse({columns: true})
stream.write(['id','json','is_valid'])
fs.createReadStream(__dirname+inputFile).pipe(csvParser).on('data', (element) => {
	stream.write(getRotatedTable(element.json,Number(element.id)))
}).on("end",function(){	
	stream.end();
}).on('error', err => {
	throw new Error(err)
});

module.exports={
	verifyMatrix,
	formMatrix,
	formList,
	rotateMatrixEdges,
	getRotatedTable
}

