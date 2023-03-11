//clarify the board
//clarify different values of 2048 ie [2,4,8,16,32,64,128,256,512,1024,2048]

var window;
var board;
var score = 0;
var rows = 4;
var columns = 4;

//when loading the browser up
window.onload = function() {
    setGame();
}


function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

//iterate through the rows and columns and create a coordinate location and a div for each value
for(let r = 0; r < rows; r++) {
    for(let c = 0; c < columns; c++){
        let tile = document.createElement("div");
        //create a div with an id "0-0"
        tile.id = r.toString() + "-" + c.toString();
        let num = board[r][c];
        //because were moving the tiles around we call a function to update the style
        updateTile(tile, num);
        document.getElementById("board").append(tile);
        }
    }
    setTwo();
    setTwo();
}

//function to update the tiles as they slide around
    function updateTile(tile,num) {
        tile.innerText = "";
        tile.classList.value = "";
        //resets the text and class values
        tile.classList.add("tile");
        
        if (num > 0) {
            tile.innerText = num.toString();
            if(num <= 4096) {
                tile.classList.add("x" + num.toString());
                //update colors if less than or equal to 4096
            } else {
                tile.classList.add("x8192");
                //update to 8192 color
            }
        }   
    }


    //puts another 2 down with every key being pressed
       document.addEventListener("keyup", (e) => {
        if (e.code == "ArrowLeft") {
            slideLeft();
            setTwo()
        }
        else if (e.code == "ArrowRight") {
            slideRight();
            setTwo()
        }
        else if (e.code == "ArrowUp") {
            slideUp();
            setTwo()
        }
        else if (e.code == "ArrowDown") {
            slideDown();
            setTwo()
        }
        document.getElementById("score").innerText = score;
        })


    function hasEmptyTile(){
        let count = 0;
        for (let r = 0; r < rows; r++){
                for(let c = 0; c < columns; c++){
                    if(board[r][c] == 0) { // at least one zero on the board
                        return true
                    }
                }
        }
        return false;
    }


//creates two random spots to place two 2's at the beginning of the game
   function setTwo() {
    if (!hasEmptyTile()) {
        return gameOverScreen(score);
    }
    let found = false;
    while (!found) {
        //find random and empty row and column to place a 2 in
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        if (board[r][c] == 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            //sets to 2
            tile.classList.add("x2");
            //sets color class to x2
            found =  true;
        }
    } 
    }
   
//create new array of all nums != 0
   function filterZero(row){
        return row.filter(num => num != 0);
   }

   function slide(row){
    row = filterZero(row); //get rid of zeroes

    //slide
        for(let i = 0; i < row.length -1; i++){
            //check every 2
            if (row[i] == row[i+1]) {
                row[i] *= 2;
                row[i+1] = 0;
                score += row[i];
            } //add common intergers in
        }
        row = filterZero(row);
        //add zeroes back
        while (row.length < columns){
            row.push(0);
        }
        return row;
   }

function slideLeft() {
    for (let r = 0; r < rows; r++){
        let row = board[r];
        row = slide(row);
        board[r] = row;
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideRight(){
    for (let r = 0; rows; r++){
        let row = board[r];
        row.reverse();
        row = slide(row)
        board[r] = row.reverse();
        for (let c = 0; c < columns; c++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row = slide(row);

        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}

function slideDown() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
        row.reverse();
        row = slide(row);
        row.reverse();
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile,num);
        }
    }
}
//restart button calling back to the window onload
document.querySelector('.restart-btn').addEventListener('click',function(){
    window.location.reload();
    return false;
});


//gameover screen 
function gameOverScreen() {
    //create a div and a class list
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("gameover-container");

    //add the html
    gameOverContainer.innerHTML = ` 
    <h1>Game Over</h1>
    <p>Your score was: ${score}</p>
    `;
    //add css through js
    gameOverContainer.style.position = "absolute";
    gameOverContainer.style.top = "50%";
    gameOverContainer.style.left = "50%";
    gameOverContainer.style.transform = "translate(-50%, -50%)";
    gameOverContainer.style.textAlign = "center";

    //add to body
    document.body.appendChild(gameOverContainer);
}

