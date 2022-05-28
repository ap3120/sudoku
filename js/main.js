//Create the sudoku grid
createBigSquares();
createSmallSquares();


function createBigSquares(){
    const gameBoard = document.getElementById("board");
    for (let index=0; index<9; index ++){
        let bigSquare = document.createElement("div");
        bigSquare.classList.add("big_square");
        bigSquare.setAttribute("id", index+1);
        gameBoard.appendChild(bigSquare);
    }
}
function createSmallSquares(){
    for (let index=0; index<9; index ++){
        const bigSquare = document.getElementById(index + 1);
        for (let i=0;i<9; i ++){
            let smallSquare = document.createElement("div");
            smallSquare.classList.add("small_square");
            const line = 3*Math.floor(index/3)+Math.floor(i/3)+1;
            const col = (index%3)*3+i%3+1;
            const smallSquareId = String(line)+","+String(col);
            smallSquare.setAttribute("id",smallSquareId);
            bigSquare.appendChild(smallSquare);
        }
    }
}

const smallSquarus = document.getElementsByClassName("small_square");
//console.log(smallSquarus);

//smallSquarus.onclick=()=>{
    //smallSquarus.style.backgroundColor='red';
    //smallSquarus.classList.add('highlight');
//}


smallSquarus.addEventListener("click",function(){
    smallSquarus.classList.add('highlight');
})

function handleButton(number){
    console.log(number);
}

function generateKeypad(){
    let buttonHTML='123456789'.split('').map(letter=>
    `
    <button
    class="btn btn-primary m-2"
    id='`+letter+`'
    onclick="handleButton('`+letter+`')">
    `+letter+`
    </button>
    `).join("");
    document.getElementById("keyboard").innerHTML = buttonHTML;
}
//Create the sudoku
let list = Array.from({length:9},()=>Array.from({length:9},()=>[1,2,3,4,5,6,7,8,9]));
let allLists = [];
let indexList = [];
let lengthList = [];
let key = true;
let stopLoop = true;

function exitLoop(){
    stopLoop = false;
    for (let i=0;i<list.length;i++){
        for (let j=0;j<list.length;j++){
            if (list[i][j].length>=0){
                stopLoop = true;
            }
        }
    }
    return stopLoop;
}

function updateList(indexLine,indexColumn){
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            if (3*Math.floor(i/3)+Math.floor(j/3)===3*Math.floor(indexLine/3)+Math.floor(indexColumn/3)){
                let k = 0;
                let n = list[i][j].length;
                while (list[i][j][k]!=list[indexLine][indexColumn] && k<n){
                    k=k+1;
                }
                if (k<n){
                    list[i][j].splice(k,1);
                }
            }    
            else if (i===indexLine || j=== indexColumn){
                let k = 0;
                let n = list[i][j].length;
                while (list[i][j][k]!=list[indexLine][indexColumn] && k<n){
                    k=k+1;
                }
                if (k<n){
                    list[i][j].splice(k,1);
                }
            }
        }
    }
}

function handleNewIndex(list){
    let newIndex = [0,0];
    let maxLength = 9;
    for (let i=0;i<list.length;i++){
        for (let j=0;j<list.length;j++){
            if (list[i][j].length<maxLength && list[i][j].length >0){
                maxLength = list[i][j].length;
                newIndex = [i,j];
            }
        }
    }
    return newIndex;
}

function isSudokuValid(list){
    for (let i=0;i<list.length;i++){
        for (let j=0;j<list.length;j++){
            if (list[i][j].length === 0){
                return false;
            }
        }
    }
    return true;
}

function handleWrongSudoku(){
    while (lengthList[lengthList.length-1]<=1){
        allLists.pop();
        indexList.pop();
        lengthList.pop();
    }
    let wrongList = allLists.pop();
    list = allLists[allLists.length-1];
    indexLine = indexList[indexList.length-1][0];
    indexColumn = indexList[indexList.length-1][1];
    let wrongNumber = wrongList[indexLine][indexColumn];
    for (let i=0;i<list[indexLine][indexColumn].length;i++){
        if (list[indexLine][indexColumn][i]!=wrongNumber){
            list[indexLine][indexColumn] = list[indexLine][indexColumn][i];
        }
    }
    updateList(indexLine,indexColumn);
    if (isSudokuValid(list)==false){
        list = Array.from({length:9},()=>Array.from({length:9},()=>[1,2,3,4,5,6,7,8,9]));
        allLists = [];
        indexList = [];
        lengthList = [];
    }
    allLists.push(JSON.parse(JSON.stringify(list)));
    indexLine = handleNewIndex(list)[0];
    indexColumn = handleNewIndex(list)[1];
}

function showSudoku(){
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            let sq = document.getElementById(String(i+1)+","+String(j+1));
            if (Math.random()<1){
                sq.textContent=String(list[i][j]);
            }
        }
    }
}

function generateSudoku(){
    let indexLine = Math.floor(Math.random()*9);
    let indexColumn = Math.floor(Math.random()*9);
    let filledSquareNum = 0;
    while (stopLoop == true){
        indexList.push([indexLine,indexColumn]);
        lengthList.push(list[indexLine][indexColumn].length);
        list[indexLine][indexColumn] = list[indexLine][indexColumn][Math.floor(Math.random()*list[indexLine][indexColumn].length)];
        updateList(indexLine,indexColumn);
        allLists.push(JSON.parse(JSON.stringify(list)));
        key = isSudokuValid(list);
        if (key === false){
            handleWrongSudoku();
            key = true;
        }
        else {
            indexLine = handleNewIndex(list)[0];
            indexColumn = handleNewIndex(list)[1];
        }
        stopLoop = exitLoop();
    }
    console.log(indexList.length);
}

generateKeypad();
generateSudoku();
showSudoku();
