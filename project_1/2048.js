var board;
var score;
var rows = 4;
var columns = 4;

window.onload = function() {
   setGame();
}

function setGame(){
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
}

for(let r = 0; r < rows; r++) {
    for(let c = 0; c < columns; c++){
        let tile = document.createElement("div");
        tile.id = r.toString() + "-" + c.toString();
        let num = board[r][c];
        updateTile(tile, num);
        document.getElementById("board").append(tile);

    }
//creates two random spots to place 2 and a 4 at the beginning of the game
    setTwo();
    setTwo();
}