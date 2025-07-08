/* board.js
* here lives the global array,
* and several other functions that
* constructs the board
*/

const board_array = Array(11).fill().map(() => Array(11).fill('empty'));

// is the piece selected?
let highlight = false;
const highlight_spot = Array(2).fill(-1);

// dimenions is in pixels
function draw_circle_on_canvas(context, index1, index2, radius){
	context.beginPath();
	context.arc(50*index1 + 25,50*index2 + 25,radius, 0, Math.PI * 2, true);
	context.fillStyle = "black";
	context.fill();
	context.stroke();
}

function handleClick(event){
	const canvas = document.getElementById("board");
	const ctx = canvas.getContext("2d"); 
	// this gets the relative position
	const mouseX = event.clientX - canvas.offsetLeft;
	const mouseY = event.clientY - canvas.offsetTop;

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
				ctx.clearRect(highlight_spot[0]*50, 50*highlight_spot[1], 50, 50);
				ctx.strokeRect(highlight_spot[0]*50, highlight_spot[1]*50, 50, 50);
				board_array[highlight_spot[0]][highlight_spot[1]] = "empty";		 

				draw_circle_on_canvas(
					ctx,
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

function draw_start() {
	const canvas = document.getElementById("board");

	if(canvas.getContext){	
		const ctx = canvas.getContext("2d");
		for(let row = 0; row < 11; row++){
			for(let col = 0; col < 11; col++){
				ctx.strokeRect(row*50, col*50, 50, 50);
			}
		}
				
		draw_circle_on_canvas(ctx, 0, 0, 15);

		board_array[0][0] = 'p';

		canvas.addEventListener('click', handleClick);
	}
}


