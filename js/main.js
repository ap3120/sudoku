//Create the sudoku grid
createBigSquares();
createSmallSquares();

function createBigSquares(){
    const gameBoard = document.getElementById("board");
    for (let index=0; index<9; index ++){
        let bigSquare = document.createElement("div");
        bigSquare.classList.add("big_square");
        bigSquare.setAttribute("id", index);
        gameBoard.appendChild(bigSquare);
    }
}

function createSmallSquares(){
    for (let index=0; index<9; index ++){
        const bigSquare = document.getElementById(index);
        for (let i=0;i<9; i ++){
            let smallSquare = document.createElement("div");
            smallSquare.classList.add("small_square");
            const line = 3*Math.floor(index/3)+Math.floor(i/3);
            const col = (index%3)*3+i%3;
            const smallSquareId = String(line)+","+String(col);
            smallSquare.setAttribute("id",smallSquareId);
            bigSquare.appendChild(smallSquare);
        }
    }
}

let selectedSmallSquareId = String(4)+','+String(4);

const highlight = (i,j) => {
    for (let k=0;k<9;k++){
        for (let l=0;l<9;l++){
            const element = document.getElementById(String(k)+","+String(l));
            if (i==k && j==l){
                element.classList.remove('highlight2');
                element.classList.add('highlight');
            }
            else if (3*Math.floor(i/3)+Math.floor(j/3)==3*Math.floor(k/3)+Math.floor(l/3)){
                element.classList.remove('highlight');
                element.classList.add('highlight2');
            }
            else if (i==k || j==l){
                element.classList.remove('highlight');
                element.classList.add('highlight2');
            }
            else {
                element.classList.remove('highlight');
                element.classList.remove('highlight2');
            }
        }
    }
}

for (let i=0;i<9;i++){
    for (let j=0;j<9;j++){
        const smallSquare = document.getElementById(String(i)+","+String(j));
        smallSquare.addEventListener("click",function(){
            selectedSmallSquareId = smallSquare.getAttribute('id');
            highlight(i,j);
        })
    }
}

window.addEventListener("keydown", function(){
    let str = selectedSmallSquareId.split(",");
    let i = parseInt(str[0]);
    let j = parseInt(str[1]);
    if (event.which == 37){
        j = j - 1;
        if (j>=0){
            selectedSmallSquareId = String(i)+','+String(j);
            highlight(i,j);
        }
    }
    else if (event.which == 38){
        i = i - 1;
        if (i>=0){
            selectedSmallSquareId = String(i)+','+String(j);
            highlight(i,j);
        }
    }
    else if (event.which == 39){
        j = j + 1;
        if (j<9){
            selectedSmallSquareId = String(i)+','+String(j);
            highlight(i,j);
        }
    }
    else if (event.which == 40){
        i = i + 1;
        if (i<9){
            selectedSmallSquareId = String(i)+','+String(j);
            highlight(i,j);
        }
    }
})
window.addEventListener("keydown", function() {
    element = document.getElementById(selectedSmallSquareId);
    let str = selectedSmallSquareId.split(",");
    let k = parseInt(str[0]);
    let l = parseInt(str[1]);
    if (event.which == 49 || event.which == 97){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(1);
            sudoList[k][l] = 1;
        }
    }
    if (event.which == 50 || event.which == 98){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(2);
            sudoList[k][l] = 2;
        }
    }
    if (event.which == 51 || event.which == 99){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(3);
            sudoList[k][l] = 3;
        }
    }
    if (event.which == 52 || event.which == 100){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(4);
            sudoList[k][l] = 4;
        }
    }
    if (event.which == 53 || event.which == 101){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(5);
            sudoList[k][l] = 5;
        }
    }
    if (event.which == 54 || event.which == 102){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(6);
            sudoList[k][l] = 6;
        }
    }
    if (event.which == 55 || event.which == 103){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(7);
            sudoList[k][l] = 7;
        }
    }
    if (event.which == 56 || event.which == 104){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(8);
            sudoList[k][l] = 8;
        }
    }
    if (event.which == 57 || event.which == 105){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = String(9);
            sudoList[k][l] = 9;
        }
    }
    if (event.which == 46){
        if (modifiableListIndex.includes(element.getAttribute('id'))) {
            element.classList.add('filling_square');
            element.textContent = "";
            sudoList[k][l] = 0;
        }
    }
    isSudokuCompleted();
})
//Create the keypad and display numbers in empty squares
function handleButton(number){
    element = document.getElementById(selectedSmallSquareId);
    for (let i=0;i<modifiableListIndex.length;i++){
        if (element.getAttribute('id') == modifiableListIndex[i]){
            element.classList.add('filling_square');
            element.textContent = number;
            let str = selectedSmallSquareId.split(",");
            let k = parseInt(str[0]);
            let l = parseInt(str[1]);
            sudoList[k][l] = parseInt(number);
            isSudokuCompleted();
        }
    }
}

function generateKeypad(){
    let buttonHTML='123456789'.split('').map(letter=>
    `
    <button
    class="keyboard_button"
    id='`+letter+`'
    onclick="handleButton('`+letter+`')">
    `+letter+`
    </button>
    `).join("");
    document.getElementById("keyboard").innerHTML = buttonHTML;
}
//Create the sudoku
let list = Array.from({length:9},()=>Array.from({length:9},()=>[1,2,3,4,5,6,7,8,9]));
let sudoList = Array.from({length:9},()=>[0,0,0,0,0,0,0,0,0]);
let allLists = [];
let indexList = [];
let lengthList = [];
let modifiableListIndex = [];
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
            if (list[i][j].length >= 1){ //filter method can only be applied on array
                if (3*Math.floor(i/3)+Math.floor(j/3)===3*Math.floor(indexLine/3)+Math.floor(indexColumn/3)){
                    list[i][j] = list[i][j].filter(elem => elem !== list[indexLine][indexColumn]);
                }    
                else if (i===indexLine || j=== indexColumn){
                    list[i][j] = list[i][j].filter(elem => elem !== list[indexLine][indexColumn]);
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
    let isValidBool = true;
    
    list.forEach(row => row.forEach(elem => {
        if (elem.length === 0){
            isValidBool = false;
        }
    }))
    return isValidBool;
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
    if (!isSudokuValid(list)){
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
            let sq = document.getElementById(String(i)+","+String(j));
            if (Math.random()<0.45){
                sq.textContent=String(list[i][j]);
                sudoList[i][j]=list[i][j];
            }
            else{
                modifiableListIndex.push(sq.getAttribute('id'));
            }
        }
    }
}

function generateSudoku(){
    let indexLine = Math.floor(Math.random()*9);
    let indexColumn = Math.floor(Math.random()*9);
    while (stopLoop == true){
        indexList.push([indexLine,indexColumn]);
        lengthList.push(list[indexLine][indexColumn].length);
        list[indexLine][indexColumn] = list[indexLine][indexColumn][Math.floor(Math.random()*list[indexLine][indexColumn].length)];
        updateList(indexLine,indexColumn);
        allLists.push(JSON.parse(JSON.stringify(list)));
        if (! isSudokuValid(list)){
            handleWrongSudoku();
        }
        else {
            indexLine = handleNewIndex(list)[0];
            indexColumn = handleNewIndex(list)[1];
        }
        stopLoop = exitLoop();
    }
}

generateKeypad();
generateSudoku();
showSudoku();

document.getElementById('erase').addEventListener('click', function(){
    let str = selectedSmallSquareId.split(",");
    let i = parseInt(str[0]);
    let j = parseInt(str[1]);
    let element = document.getElementById(selectedSmallSquareId);
    if (modifiableListIndex.includes(element.getAttribute('id'))){
        element.textContent="";
        sudoList[i][j] = 0;
    }
})

//Counter
let timerVariable = setInterval(countUpTimer, 1000);
let totalSeconds = 0;

function countUpTimer() {
    ++totalSeconds;
    let hour = Math.floor(totalSeconds / 3600);
    let minute = Math.floor((totalSeconds - hour * 3600) / 60);
    let seconds = totalSeconds - (hour * 3600 + minute * 60);
    if(hour < 10){
        hour = "0"+hour;
    }
    if(minute < 10){
        minute = "0"+minute;
    }
    if(seconds < 10){
        seconds = "0"+seconds;
    }
    document.getElementById("count_up_timer").innerHTML = hour + ":" + minute + ":" + seconds;
}

function stopCounter(){
    if (timerVariable == undefined){
        timerVariable = setInterval(countUpTimer,1000);
    }
    else if (timerVariable != undefined){
        clearInterval(timerVariable);
        timerVariable = undefined;
    }
}

document.getElementById("stop_count_up_timer").onclick = function(){stopCounter()};

function isSudokuCompleted(){
    let sudokuCompleted = true;
    for (let i=0;i<9;i++){
        for (let j=0;j<9;j++){
            if (sudoList[i][j] == 0){
                sudokuCompleted = false;
            }//square value is set to 0 when erase key is pressed
            for (let k=0;k<9;k++){
                for (let l=0;l<9;l++){
                    if (!(i==k && j==l) && (i==k || j==l || 3*Math.floor(i/3)+Math.floor(j/3)===3*Math.floor(k/3)+Math.floor(l/3))){
                        if (sudoList[i][j] == sudoList[k][l]){
                            sudokuCompleted = false;
                        }
                    }
                }
            }
        }
    }
    if (sudokuCompleted == true){
        stopCounter();
        alert("Congratulation! You've completed the sudoku.");
    }
}

//Reset the sudoku
document.getElementById('new_game').addEventListener('click',function(){
    const squaresToClean = document.getElementsByClassName('small_square');
    for (let i=0;i<squaresToClean.length;i++){
        squaresToClean[i].classList.remove('filling_square');
        squaresToClean[i].textContent = "";
    }
    totalSeconds = 0;
    if (timerVariable == undefined){
        stopCounter();
    }
    selectedSmallSquareId = String(4)+','+String(4);
    list = Array.from({length:9},()=>Array.from({length:9},()=>[1,2,3,4,5,6,7,8,9]));
    sudoList = Array.from({length:9},()=>[0,0,0,0,0,0,0,0,0]);
    allLists = [];
    indexList = [];
    lengthList = [];
    modifiableListIndex = [];
    stopLoop = true;
    generateSudoku();
    showSudoku();
})
