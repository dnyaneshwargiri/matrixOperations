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

function formMatrix(list){
	return []
}
function formList(matrix,n,m){
	let tempList=[]
	for(let i=0;i<n;i++){
        for(let j=0;j<m;j++){
            tempList.push(matrix[i][j])
        }
    }
}
function rotateMatrixEdges(list){
	let matrix=formMatrix(list)
	let k=1 //rotate by 1
	//n = rows
	//m = columns
	let n= matrix.length
	let m= matrix[0].length
    let top=0, bottom=n-1,left=0,right=m-1;

    // Rotate while the ring exists.
    while(top<=bottom){
        // To hold the ring elements.
        let elems=[];
        // Do the spiral traversal and store the ring elements.
        for(let i=left;i<=right;i++){
            elems.push(matrix[top][i]);
        }
        
        for(let i=top+1;i<=bottom;i++){
            elems.push(matrix[i][right]);
        }
        
        for(let i=right-1;i>=left;i--){
            elems.push(matrix[bottom][i]);
        }
        
        for(let i=bottom-1;i>top;i--){
            elems.push(matrix[i][left]);
        }
        // Check if the ring size is less than or equal to k
        // If true, break as the rings after will also be smaller than k.
        if(elems.length<=k){
            break;
        }
        // Rotation starts.
        // ind represents the index of the position that should be at the start of the ring.
        let sz=elems.size();
        let ind=sz-k;
        // Store the rotated ring.
        for(let i=left;i<=right;i++){
            matrix[top][i]=elems[ind];
            ind++; ind%=sz;
        }
        for(let i=top+1;i<=bottom;i++){
            matrix[i][right]=elems[ind];
            ind++; ind%=sz;
        }
        for(let i=right-1;i>=left;i--){
            matrix[bottom][i]=elems[ind];
            ind++; ind%=sz;
        }
        for(let i=bottom-1;i>top;i--){
            matrix[i][left]=elems[ind];
            ind++; ind%=sz;
        }
        // Update the rotation parameters.
        top++; bottom--;
        left++; right--;
    }
	return formList(matrix,n,m)
}
function getRotatedTable(list){
	return verifyMatrix(list) ? rotateMatrixEdges(list) : [[],false]
}

function writeCsv(){

}

const writeStream = fs.createWriteStream(__dirname+outputFile);
const csvParser = parse.parse({columns: true}, function (err, records) {
	//rotate each table
	records.forEach(element => {
		getRotatedTable(element.json)
	});
});
//let writeCsv=fastcsv.write([ ["id","json" ],['3','"[6,7]"' ]],{headers:true}).pipe(writeStream)

fs.createReadStream(__dirname+inputFile).pipe(csvParser);
