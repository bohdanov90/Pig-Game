"use strict";

let totalScores = [0, 0];
let currentScore = 0;
let activePlayer = 1; // we have players 1 and 2

// hiding dice images before we start the game
document.querySelector(".image-dice-player-1").style.visibility = "hidden";
document.querySelector(".image-dice-player-2").style.visibility = "hidden";

// resetting scores to zero
document.getElementById("player-1-total-score").textContent = "0";
document.getElementById("player-1-current-score").textContent = "0";
document.getElementById("player-2-total-score").textContent = "0"; 
document.getElementById("player-2-current-score").textContent = "0";

function play() {
  
}
if (activePlayer === 1) {
  document.getElementById("player-1-roll-dice-button").disabled = false;
  document.getElementById("player-1-hold-points-button").disabled = false;
  document.getElementById("player-2-roll-dice-button").disabled = true;
  document.getElementById("player-2-hold-points-button").disabled = true;
} else {
  document.getElementById("player-1-roll-dice-button").disabled = true;
  document.getElementById("player-1-hold-points-button").disabled = true;
  document.getElementById("player-2-roll-dice-button").disabled = false;
  document.getElementById("player-2-hold-points-button").disabled = false;
}

  // generating random number from (min-0.5) to (max+0.5) using formula ( min + Math.random() * (max - min) )
  let diceRandomNumber = Math.round( (1 - 0.5) + Math.random() * ( (6 + 0.5) - (1 - 0.5) ) ); 
  // displaying the result
  document.querySelector(".image-dice-player-" + activePlayer).style.visibility = "visible";
  document.querySelector(".image-dice-player-" + activePlayer).src = "images/dice-" + diceRandomNumber + ".png";
  // updating current score if number on dice != 1
  if (diceRandomNumber !== 1) {
    currentScore += diceRandomNumber;
    document.getElementById( "player-" + activePlayer + "-current-score" ).textContent = currentScore;
  // if dice shows 1
  } else {
    currentScore = 0;
    document.getElementById( "player-1-current-score" ).textContent = "0";
    document.getElementById( "player-2-current-score" ).textContent = "0";
    // changing active player
    activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
    // toggling a non-active class between players
    document.querySelector(".player-1-section").classList.toggle("player-section_is-not-active"); 
    document.querySelector(".player-2-section").classList.toggle("player-section_is-not-active"); 
    // hiding dice image for active player before he starts his round
    document.querySelector(".image-dice-player-" + activePlayer).style.visibility = "hidden";
    // making our function appear again and again
    // document.querySelector(".buttons-section__roll-dice-player-" + activePlayer).addEventListener("click", play);

}



do {
  
  
  document.querySelector(".buttons-section__roll-dice-player-" + activePlayer).addEventListener("click", play);
} while (totalScores < 100);











function hohoho() {

}



document.querySelector(".buttons-section__hold-points-player-" + activePlayer).addEventListener("click", play);


// как сделать не активными кнопки неактивного игрока???