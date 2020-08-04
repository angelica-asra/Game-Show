/******************************************
Angelica
Project 4 - Phrase Game Show App 
Game.js
******************************************/

// Declares the game class. 
 class Game {
  constructor() {
  	this.missed = 0; // number of guesses the player has missed, starts at zero
    this.phrases = [new Phrase("Piece of Cake"), new Phrase("Break a Leg"), new Phrase("Knock on Wood"), new Phrase("Under the Weather"), new Phrase("Spill the Beans")]; //
    this.activePhrase = null;
  }

	/*
	 * A random phrase is chosen from the five possible phrases and returned. 
	 * 
 	 */
  getRandomPhrase() { 
	const randint = Math.floor(Math.random() * (Math.floor(4) - Math.ceil(0) + 1))
	let newPhrase = this.phrases[randint]; 
	//this.activePhrase = newPhrase; 
	return newPhrase; 
	}; 

   /*
 	* The screen overlay is hidden, a new phrase is selected and set to active for the Game object.  
 	* Then the phrase is added to the display. 
 	*/
  startGame() { 
  	const theoverlay = document.getElementById("overlay"); 
  	theoverlay.style.display = "none";
  	const newphrase = this.getRandomPhrase(); 
  	this.activePhrase = newphrase; 
  	newphrase.addPhraseToDisplay(); 
  }

   /*
 	* Searches the classes of all placeholders to see if there are remaining hidden letters. 
 	* If not, true is returned to indicate that the player has won. 
 	*/
  checkForWin() {
  	let count = 0; //count how many letters are hidden 
  	let letterslist = document.getElementById("phrase").children[0].children;
  	for (let i = 0; i < letterslist.length; i++) {
  		if (letterslist[i].className.includes("hide letter")) {
  			count += 1; 
  		}
  	}
  	if (count == 0) { 
  		return true; 
  	} else { 
  		return false; 
  	}
  }

  /*
   * Handles lost lives and ends the game when appropriate. 
   * 
   */
  removeLife() { 
    // If the player already has 4 lives lost, this is their final life so gameOver() is immediately called. 
    if (this.missed == 4) { 
  	  this.gameOver("lost"); 
  	  return;
  	} else { 
  	// Otherwise, the correct heart is changed to 'lost' and the number of misses is incremented. 
  		let lives = document.getElementById("scoreboard").children[0].children;
  		this.missed += 1;
  		const removeIndex = this.missed - 1; 
  		const heart = lives[removeIndex].children[0]; 
  		heart.src = "images/lostHeart.png";
  		return;
  	}
  }

	/*
     * Resets the whole game in preparation for a new instance and displays a winning/losing message. 
     * 
     */
  gameOver(outcome) { 
  	// Remove all the phrase placeholders for the old phrase. 
  	let list = document.getElementById("phrase").children[0];
  	while (list.firstChild) {
    	list.removeChild(list.firstChild);
	}

	// Set all the keyboard buttons to enabled with the normal CSS class, row by row. 
	let keyboardrow1 = document.getElementById("qwerty").children[0].children;
	for (let i = 0; i < keyboardrow1.length; i++) {
		let button = keyboardrow1[i]; 
		button.disabled = false; 
		button.className = "key";
	}

	let keyboardrow2 = document.getElementById("qwerty").children[1].children;
	for (let i = 0; i < keyboardrow2.length; i++) {
		let button = keyboardrow2[i]; 
		button.disabled = false; 
		button.className = "key";
	}

	let keyboardrow3 = document.getElementById("qwerty").children[2].children;
	for (let i = 0; i < keyboardrow3.length; i++) {
		let button = keyboardrow3[i]; 
		button.disabled = false; 
		button.className = "key";
	}

	// Make all hearts active again. 
	const lives = document.getElementById("scoreboard").children[0].children;
	for (var i = 0; i < lives.length; i++) {
		lives[i].children[0].src="images/liveHeart.png"; 
	}

	// Bring back the overlay along with a gameover message. 
	const theoverlay = document.getElementById("overlay"); 
  	theoverlay.style.display = "block";
  	const message = document.getElementById("game-over-message"); 

	if (outcome == "lost") {
		theoverlay.className = "lose"
  		message.innerHTML = "Unfortunately, you have used up all of your available lives."
  	} else { 
		theoverlay.className = "win"
  		message.innerHTML = "Congratulations, you win!"; 
  	}
  }

   /*
 	* Organizes the main logic of keyboard button interaction for the game. 
 	* 
 	*/
  handleInteraction(button) { 
  	button.disabled = true; // Immediately disable the clicked button. 
  	let capturedletter = button.innerHTML; 
  	// Check whether the button's letter is within the active phrase. Change the CSS class of the button depending on the result of this check. 
  	let matchcheck = this.activePhrase.checkLetter(capturedletter); 
  	if (matchcheck == true) {
  		button.className = "chosen"; 
  		this.activePhrase.showMatchedLetter(capturedletter);
  		let winning = this.checkForWin(); 
  		if (winning) {
  			// Call gameOver if the player has revealed all the letters of the phrase. 
  			this.gameOver();
  		}
  	} else {
  		button.className = "wrong"; 
  		// Remove a new life whenever the guess is wrong. 
  		this.removeLife(); 
  	}

 }


}

