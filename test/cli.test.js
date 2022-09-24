const assert=require('chai').assert
const expect=require('chai').expect
const app=require('../cli')

it('Should verify if list can form correct matrix for N*N',function(){
    let squareMatrix=[1, 2, 3, 4, 5, 6, 7, 8, 9]
    let result=app.verifyMatrix(squareMatrix)
    let expectedResult=[ true, 3, 3 ]
    expect(result).deep.to.equal(expectedResult)

    let nonSquareMatrix=[1, 1, 1, 1, 1]
    result=app.verifyMatrix(nonSquareMatrix)
    expectedResult=[ false, 0, 0 ]
    expect(result).deep.to.equal(expectedResult)
});   

it('Should form a matrix for given list',function(){
    let squareList=[1, 2, 3, 4, 5, 6, 7, 8, 9]
    let n=m=Math.sqrt(squareList.length)
    let result=app.formMatrix(squareList,n,m)
    let expectedResult=[ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
    expect(result).deep.to.equal(expectedResult);
});   

it('Should form a list for given matrix',function(){
    let input=[ [ 4, 1, 2 ], [ 7, 5, 3 ], [ 8, 9, 6 ] ]
    let result=app.formList(input,input.length,input[0].length)
    let expectedResult=[4, 1, 2, 7, 5, 3, 8, 9, 6]
    expect(result).deep.to.equal(expectedResult);

     input=[ [40, 20],[90, 10]]
     result=app.formList(input,input.length,input[0].length)
     expectedResult=[40,20,90,10]
     expect(result).deep.to.equal(expectedResult);
}); 


it('Should form a matrix from given list and then rotate a matrix edges correctly',function(){
    let input=[1, 2, 3, 4, 5, 6, 7, 8, 9]
    let n=m=Math.sqrt(input.length)
    let result=app.rotateMatrixEdges(input,n,m)
    let expectedResult=[ 4, 1, 2, 7, 5, 3, 8, 9, 6 ]
    expect(result).deep.to.equal(expectedResult);

    input=[40, 20, 90, 10]
    n=m=Math.sqrt(input.length)
    result=app.rotateMatrixEdges(input,n,m)
    expectedResult=[90,40,10,20]
    expect(result).deep.to.equal(expectedResult);
}); 

it('Should get rotated table for a table list',function(){
    let input={id:14,json:"[1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16]"}
    let result=app.getRotatedTable(input.json,Number(input.id))
    let expectedResult=[14,"[5,1,2,3,9,10,6,4,13,11,7,8,14,15,16,12]", true]
    expect(result).deep.to.equal(expectedResult);

    input={id:3,json:"[-5]"}
    result=app.getRotatedTable(input.json,Number(input.id))
    expectedResult=[3,"[-5]", true]
    expect(result).deep.to.equal(expectedResult);

    input={id:9,json:"[2, -0]"}
    result=app.getRotatedTable(input.json,Number(input.id))
    expectedResult=[9,"[]", false]
    expect(result).deep.to.equal(expectedResult);

    input={id:1,json:"[1, 2, 3, 4, 5, 6, 7, 8, 9]"}
    result=app.getRotatedTable(input.json,Number(input.id))
    expectedResult=[1,"[4,1,2,7,5,3,8,9,6]",true]
    expect(result).deep.to.equal(expectedResult);

    input={id:2,json:"[40, 20, 90, 10]"}
    result=app.getRotatedTable(input.json,Number(input.id))
    expectedResult=[2,"[90,40,10,20]",true]
    expect(result).deep.to.equal(expectedResult);

    input={id:5,json:"[2, -5, -5]"}
    result=app.getRotatedTable(input.json,Number(input.id))
    expectedResult=[5,"[]",false]
    expect(result).deep.to.equal(expectedResult);

    input={id:8,json:"[1, 1, 1, 1, 1]"}
    result=app.getRotatedTable(input.json,Number(input.id))
    expectedResult=[8,"[]",false]
    expect(result).deep.to.equal(expectedResult);
});