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

const addClassAndContentToSquare = (element, classToAdd, number, k, l) => {
  element.classList.add(classToAdd);
  element.textContent = number > 0 ? String(number) : "";
  sudokuAsArray[k * 9 + l] = number;
}

window.addEventListener("keydown", function() {
    element = document.getElementById(selectedSmallSquareId);
    let str = selectedSmallSquareId.split(",");
    let k = parseInt(str[0]);
    let l = parseInt(str[1]);
    if (modifiableListIndex.includes(element.getAttribute('id'))) {
        if (event.which == 49 || event.which == 97) addClassAndContentToSquare(element, 'filling_square', 1, k, l)
        if (event.which == 50 || event.which == 98) addClassAndContentToSquare(element, 'filling_square', 2, k, l)
        if (event.which == 51 || event.which == 99) addClassAndContentToSquare(element, 'filling_square', 3, k, l)
        if (event.which == 52 || event.which == 100) addClassAndContentToSquare(element, 'filling_square', 4, k, l)
        if (event.which == 53 || event.which == 101) addClassAndContentToSquare(element, 'filling_square', 5, k, l)
        if (event.which == 54 || event.which == 102) addClassAndContentToSquare(element, 'filling_square', 6, k, l)
        if (event.which == 55 || event.which == 103) addClassAndContentToSquare(element, 'filling_square', 7, k, l)
        if (event.which == 56 || event.which == 104) addClassAndContentToSquare(element, 'filling_square', 8, k, l)
        if (event.which == 57 || event.which == 105) addClassAndContentToSquare(element, 'filling_square', 9, k, l)
        if (event.which == 46) addClassAndContentToSquare(element, 'filling_square', 0, k, l)
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
            sudokuAsArray[k * 9 + l] = parseInt(number);
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
    document.getElementById("new_game").insertAdjacentHTML('beforebegin', buttonHTML);
}
//Create the sudoku
let sudokuAsArray = [];
let modifiableListIndex = [];

class LinkedList {
  constructor(node) {
    this.head = node;
    this.tail = node;
  }
  getDepth() {
    let depth = 0;
    let current = this.head;
    while(current !== null) {
      depth += 1;
      current = current.getNextNode();
    }
    return depth;
  }
  add(node) {
    if (this.head === null) this.head = node;
    this.tail = node;
  }
}

class Node {
  constructor (value, parent, possibilities, index) {
    this.value = value;
    this.parent = parent;
    this.possibilities = possibilities;
    this.index = index;
    this.child = null;
  }
  getNextNode() {
    return this.child;
  }
  setNextNode(child) {
    this.child = child;
  }
  removePossibility(value) {
    const index = this.possibilities.findIndex(elem => elem === value);
    if (index > -1) this.possibilities = this.possibilities.splice(index, 1);
  }
}

const getIndicesFromIndex = (index) => {
  return {row: Math.floor(index/9), col: index%9};
}

const generate = () => {
  let sudoku = new LinkedList(new Node(Math.floor(Math.random() * 9) + 1, null, [1, 2, 3, 4, 5, 6, 7, 8, 9], 0));
  while(sudoku.getDepth() < 81) {
    let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const tail = sudoku.tail;
    if (tail !== null) {
      const newIndex = tail.index + 1;
      const newIndices = getIndicesFromIndex(newIndex);
      let currentNode = tail;
      while (currentNode !== null) {
        const index = currentNode.index;
        const indices = getIndicesFromIndex(index);
        if ((indices.row === newIndices.row || indices.col === newIndices.col || 3 * Math.floor(indices.row/3) + Math.floor(indices.col/3) === 3 * Math.floor(newIndices.row/3) + Math.floor(newIndices.col/3))) {
          const index = possibilities.findIndex(elem => elem === currentNode.value);
          if (index > -1) possibilities.splice(index, 1);
        }
        currentNode = currentNode.parent;
      }
    }

    if (possibilities.length === 0) {
      let current = tail;
      while (current.possibilities.length === 1) {
        if (current === null) {console.log("whaat?");break};
        current = current.parent;
      }
      const index = current.possibilities.findIndex(elem => elem === current.value);
      current.possibilities.splice(index, 1);
      current.value = current.possibilities[Math.floor(Math.random() * current.possibilities.length)];
      current.setNextNode(null);
      sudoku.tail = current;
    } else {
      const node = new Node(possibilities[Math.floor(Math.random() * possibilities.length)], tail, possibilities, tail ? tail.index + 1 : 0);
      tail.setNextNode(node);
      sudoku.add(node);
    }
    
  }
  
  sudokuAsArray = [];
  let current = sudoku.head;
  while(current !== null) {
    sudokuAsArray[current.index] = current.value;
    current = current.getNextNode();
  }
}

class SudokuNode {
  constructor(value, possibilities) {
    this.value = value;
    this.possibilities = possibilities;
  }

  getValue() {
    return this.value; 
  }

  setValue(newValue) {
    this.value = newValue;
  }

  getPossibilities() {
    return this.possibilities;
  }

  removePossibility(value) {
    const index = this.possibilities.findIndex(elem => elem === value);
    if (index > -1) this.possibilities.splice(index, 1);

  }

  emptyPossibilities() {
    this.possibilities = [];
  }
}

const handleArrayFromSudoku = (array) => {
  let sudoku = [];
  for (let i=0; i<array.length; i++) {
    if (array[i] === 0) {
      const indices = getIndicesFromIndex(i);
      let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (let k=0; k<array.length; k++) {
        const tmpIndices = getIndicesFromIndex(k);
        if (i != k && (indices.row === tmpIndices.row || indices.col === tmpIndices.col || 3 * Math.floor(indices.row / 3) + Math.floor(indices.col / 3) === 3 * Math.floor(tmpIndices.row / 3) + Math.floor(tmpIndices.col / 3))) {
          possibilities = possibilities.filter(elem => elem !== array[k]);
        }
      }
      sudoku.push(new SudokuNode(0, possibilities));
    } else {
      sudoku.push(new SudokuNode(array[i], []));
    }
  }
  return sudoku;
}

const getIndexWithMinPossibilities = (sudoku) => {
  let index = 0;
  for (let i=1; i<sudoku.length; i++) {
    if ((sudoku[i].getValue() === 0 && sudoku[index].getValue() !== 0) || (sudoku[i].getPossibilities().length < sudoku[index].getPossibilities().length && sudoku[i].getValue() === 0)) index = i;
  }
  return index;
}

const updateSudoku = (i, sudoku) => {
  const indices = getIndicesFromIndex(i);
  for (let j=0; j<sudoku.length; j++) {
    const tmpIndices = getIndicesFromIndex(j);
    if (i !== j && (indices.row === tmpIndices.row || indices.col === tmpIndices.col || 3 * Math.floor(indices.row / 3) + Math.floor(indices.col / 3) === 3 * Math.floor(tmpIndices.row / 3) + Math.floor(tmpIndices.col / 3))) {
      if (sudoku[j].getPossibilities().length > 1) {
        sudoku[j].removePossibility(sudoku[i].getValue());
      }
    }
  }
}

const sumArray = arr => {
  let sum = 0;
  for (let i=0; i<arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

const customClone = sudoku => {
  let arr = [];
  for (let i=0; i<sudoku.length; i++) {
    arr.push(sudoku[i].getValue());
  }
  return handleArrayFromSudoku(arr);
}

const printSudoku = (sudoku) => {
  for (let i=0; i<9; i++) {
    console.log("|" + sudoku[i * 9].getValue() + "|" + sudoku[i * 9 + 1].getValue() + "|" + sudoku[i * 9 + 2].getValue() + "|" + sudoku[i * 9 + 3].getValue() + "|" + sudoku[i * 9 + 4].getValue() + "|" + sudoku[i * 9 + 5].getValue() + "|" + sudoku[i * 9 + 6].getValue() + "|" + sudoku[i * 9 + 7].getValue() + "|" + sudoku[i * 9 + 8].getValue() + "|");
  }
  console.log("");
}

const solveSudoku = (sudoku) => {
  let i = 0;

  while (i < sudoku.length) {
    if (sudoku[i].getValue() === 0 && sudoku[i].getPossibilities().length === 0) return 0;
    if (sudoku[i].getPossibilities().length === 1 && sudoku[i].getValue() === 0) {
      const valueToAdd = sudoku[i].getPossibilities()[0];
      sudoku[i].setValue(valueToAdd);
      sudoku[i].emptyPossibilities();
      updateSudoku(i, sudoku);
      i = 0;
    } else {
      i += 1;
    }
  }

  let isValid = true;
  for (let j=0; j<sudoku.length; j++) {
    if (sudoku[j].getValue() === 0) isValid = false;
  }

  if (isValid) {
    //printSudoku(sudoku);
    return 1;
  } else {
    const index = getIndexWithMinPossibilities(sudoku);
    const n = sudoku[index].getPossibilities().length
    let newSudokus = [];
    for (let j=0; j<n; j++) {
      let newSudoku = customClone(sudoku);
      const valueToAdd = newSudoku[index].getPossibilities()[j];
      newSudoku[index].setValue(valueToAdd);
      newSudoku[index].emptyPossibilities();
      updateSudoku(index, newSudoku);
      newSudokus.push(newSudoku); 
    }
    return sumArray(newSudokus.map(elem => solveSudoku(elem)));
  }

}

const getNumberOfSolutions = (arr) => {
  const sudoku = handleArrayFromSudoku(arr);
  return solveSudoku(sudoku);
}

const getDifficulty = () => {
  if (document.getElementById("easy").checked) return 0.6;
  if (document.getElementById("hard").checked) return 1;
  return 0.8;
}

function showSudoku(){
    let shuffledIndexes = Array.from({length: sudokuAsArray.length}, (_, i) => i);
    for (let i=0; i<shuffledIndexes.length; i++) {
        const j = Math.floor(Math.random() * sudokuAsArray.length);
        const tmp = shuffledIndexes[i];
        shuffledIndexes[i] = shuffledIndexes[j];
        shuffledIndexes[j] = tmp;
    }
    
    for (let i=0; i<shuffledIndexes.length; i++) {
        const index = shuffledIndexes[i];
        const indices = getIndicesFromIndex(index);
        let sq = document.getElementById(String(indices.row)+","+String(indices.col));
        if (Math.random() < getDifficulty()) {
            const tmpSudoku = sudokuAsArray.slice(0, index).concat(0).concat(sudokuAsArray.slice(index + 1, sudokuAsArray.length));
            if (getNumberOfSolutions(tmpSudoku) === 1) {
                sudokuAsArray[index] = 0;
                modifiableListIndex.push(sq.getAttribute('id'));
            } else {
                sq.textContent = String(sudokuAsArray[index]);
            }
        } else {
            sq.textContent = String(sudokuAsArray[index]);
        }    
    }
}

generateKeypad();
generate();
showSudoku();

document.getElementById('erase').addEventListener('click', function(){
    let str = selectedSmallSquareId.split(",");
    let i = parseInt(str[0]);
    let j = parseInt(str[1]);
    let element = document.getElementById(selectedSmallSquareId);
    if (modifiableListIndex.includes(element.getAttribute('id'))){
        element.textContent="";
        sudokuAsArray[i * 9 + j] = 0;
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
    const element = document.getElementsByTagName("i")[0];
    if (timerVariable == undefined){
        element.classList.remove("fa-solid", "fa-play");
        element.classList.add("fa-solid", "fa-pause");
        timerVariable = setInterval(countUpTimer,1000);
    }
    else if (timerVariable != undefined){
        element.classList.remove("fa-solid", "fa-pause");
        element.classList.add("fa-solid", "fa-play");
        clearInterval(timerVariable);
        timerVariable = undefined;
    }
}

document.getElementById("stop_count_up_timer").onclick = function(){stopCounter()};

function isSudokuCompleted(){
    let sudokuCompleted = true;
    for (let i=0;i<sudokuAsArray.length;i++){
        const indices = getIndicesFromIndex(i);
        if (sudokuAsArray[i] === 0){
            sudokuCompleted = false;
        }//square value is set to 0 when erase key is pressed
        for (let k=0;k<sudokuAsArray.length;k++){
            const indicesToCompare = getIndicesFromIndex(k);
            if (i !== k && (indices.row === indicesToCompare.row || indices.col === indicesToCompare.col || 3*Math.floor(indices.row/3)+Math.floor(indices.col/3)===3*Math.floor(indicesToCompare.row/3)+Math.floor(indicesToCompare.col/3))){
                if (sudokuAsArray[i] === sudokuAsArray[k]){
                    sudokuCompleted = false;
                }
            }
        }
    }
    if (sudokuCompleted){
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
    modifiableListIndex = [];
    generate();
    showSudoku();
})
