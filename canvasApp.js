window.addEventListener("load", eventWindowLoad, false);

function eventWindowLoad() {
    canvasApp();
}

function canvasApp() {
    const theCanvas = document.getElementById("board");

    // error checking
    if(!theCanvas || !theCanvas.getContext) {
        console.log("Canvas or the context could not be received!");
        return;
    }

    // stores the logic of the board
    const board_array = Array(11).fill().map(() => Array(11).fill('empty'));
    // is the piece selected?
    let highlight = false;
    // tuple to carry the location of the selected piece
    const highlight_spot = Array(2).fill(-1);

    const context = theCanvas.getContext("2d");
    
    drawStartBoard();

    function drawStartBoard () {
        for(let row = 0; row < 11; row++){
			for(let col = 0; col < 11; col++){
				context.strokeRect(row*50, col*50, 50, 50);
			}
        }

        draw_circle_on_canvas(0, 0, 15);

		board_array[0][0] = 'p';

		theCanvas.addEventListener('click', handleClick);

    }
    
    function draw_circle_on_canvas(index1, index2, radius){
	    context.beginPath();
	    context.arc(50*index1 + 25,50*index2 + 25,radius, 0, Math.PI * 2, true);
	    context.fillStyle = "black";
	    context.fill();
	    context.stroke();
    }

    function handleClick(event){
        // this gets the relative position
        const mouseX = event.clientX - theCanvas.offsetLeft;
        const mouseY = event.clientY - theCanvas.offsetTop;

        console.log(mouseX + " " + mouseY + "\n");

        // here we should check if click is on
        // a peice

        if(mouseX <= 550 
            && mouseX >= 0 
            && mouseY <= 550 
            && mouseY >= 0) 
            {
                const index1 = Math.floor(mouseX / 50);
                const index2 = Math.floor(mouseY / 50);

                if(board_array[index1][index2] === 'p'){
                    // have some highlighting effect here
                    

                    highlight = true;
                    highlight_spot[0] = index1;
                    highlight_spot[1] = index2;

                    return;
                }

                if(highlight === true){
                    // remove the circle
                    context.clearRect(highlight_spot[0]*50, 50*highlight_spot[1], 50, 50);
                    context.strokeRect(highlight_spot[0]*50, highlight_spot[1]*50, 50, 50);
                    board_array[highlight_spot[0]][highlight_spot[1]] = "empty";		 

                    draw_circle_on_canvas(
                        index1,
                        index2,
                        15);

                    highlight = false;
                    board_array[index1][index2] = 'p';
                }	

            } else {
                console.log("out of bounds");
            }
        
    }  
}


