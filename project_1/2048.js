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

//iterate through the rows and columns and create a coordinate location and a div for each valueuser stor
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


//creates two random spots to place 2 and a 4 at the beginning of the game
   function setTwo() {
    if (!hasEmptyTile()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
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
//puts another 2 down with every key being pressed
   document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        setTwo();
    }
    else if (e.code == "ArrowRight") {
        setTwo();
    }
    else if (e.code == "ArrowUp") {
        setTwo();
    }
    else if (e.code == "ArrowDown") {
        setTwo();
    }
        
   })

