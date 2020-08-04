/******************************************
Angelica
Project 4 - Phrase Game Show App 
App.js
******************************************/

let game;
let keyboard = document.getElementById("qwerty"); 
const clickbutton = document.getElementById("btn__reset"); 
clickbutton.addEventListener("click", startingGame); // Add click event listener to the main button that starts a new game. 

/*
 * Callback function that begins the game when the start button is clicked. 
 * 
 */
function startingGame() { 
	game = new Game(); 
	game.startGame(); 
	 
   /*
	* Callback function triggered whenever a key is clicked, passing the information about the key to the game's handleInteraction() method.  
 	* 
 	*/
	function letterclicked() {
  		if(event.target && event.target.className == "key") {
			game.handleInteraction(event.target);
		}
    }
	keyboard.addEventListener("click", letterclicked);
}