/******************************************
Angelica
Project 4 - Phrase Game Show App 
Phrase.js
******************************************/

// Defining the phase class. 
 class Phrase { 
 	 constructor(phrase) { 
 	 	this.phrase = phrase.toLowerCase(); 
 	 }

   /*
 	* Gets the empty list DOM element, adds placeholders and spaces as necessary to display the actual text of the phrase. 
 	* 
 	*/
 	 addPhraseToDisplay() {	 	
		let phraselist = document.getElementById("phrase").children[0];
		let i=0; 
 	 	for (i = 0; i < this.phrase.length; i++) {
  			let element = document.createElement("li");  
  			let text = document.createTextNode(this.phrase[i]);
  			phraselist.appendChild(element); 
  			element.appendChild(text);
  			if (this.phrase[i] == " ") { 
  				element.className = "hide space";
  			} else {
  				element.className = "hide letter "+ this.phrase[i];
  			} 
		}
			
 	 }

   /*
 	*  Iterates through the characters in the phrase, checking each with the desired letter. 
 	*  If at least one instance of the letter is found, it returns true and false otherwise. 
 	*/
 	 checkLetter(letter) {
 	 	let i=0;  
 	 	let found = false; 
 	 	for (i = 0; i < this.phrase.length; i++) {
  			if (this.phrase[i] == letter) { 
  				found = true; 
  			}
		}
		if (found == true) { 
			return true; 
		} else { 
			return false; 
		}
 	 }

	/*
	 * Finds all placeholders where the desired letter is still hidden and copies their references into a separate array.  
	 * Then their class is changed so that all matches become visible on the screen. 
 	 */
 	 showMatchedLetter(letter) { 
 	 	const allmatches = document.getElementsByClassName("hide letter " + letter);
 	 	let index = allmatches.length; 
 	 	let i=0; 
 	 	let elements = []; 
 	 	for (i = 0; i < allmatches.length; i++) {
 	 		elements.push(allmatches[i]); 
		}
		for (i = 0; i < index; i++) {
  			elements[i].className = "show letter " + letter; 
		}
 	 }



 }