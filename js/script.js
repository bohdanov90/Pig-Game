"use strict";

let totalScorePlayer1, totalScorePlayer2, currentScorePlayer1, currentScorePlayer2, activePlayer, finalScore, newFinalScore;

// setting players' names
let player1Name = "Player 1";
let player2Name = "Player 2";

// function for starting a new game
function newGame() {
  totalScorePlayer1 = 0;
  totalScorePlayer2 = 0;
  currentScorePlayer1 = 0;
  currentScorePlayer2 = 0;
  activePlayer = 1; // we have players 1 and 2
  // hiding dice images before we start the game
  document.querySelector(".images-player-1").classList.add("images_is-hidden");
  document.querySelector(".images-player-1").classList.remove("images_is-visible");
  document.querySelector(".images-player-2").classList.add("images_is-hidden");
  document.querySelector(".images-player-2").classList.remove("images_is-visible");
  // resetting scores to zero
  document.getElementById("player-1-total-score").textContent = "0";
  document.getElementById("player-1-current-score").textContent = "0";
  document.getElementById("player-2-total-score").textContent = "0"; 
  document.getElementById("player-2-current-score").textContent = "0";
  // remove classlist winner
  document.querySelector(".player-1-section").classList.remove("player-section_is-winner");
  document.querySelector(".player-2-section").classList.remove("player-section_is-winner");
  document.querySelector(".player-1-section").classList.remove("player-section_is-active");
  document.querySelector(".player-2-section").classList.remove("player-section_is-active");
  document.querySelector(".player-1-section").classList.remove("player-section_is-not-active");
  document.querySelector(".player-2-section").classList.remove("player-section_is-not-active");
  document.querySelector(".player-1-section").classList.add("player-section_is-active");
  document.querySelector(".player-2-section").classList.add("player-section_is-not-active");
  // reseting players' names
  document.querySelector(".player-1-section__player-1-name").textContent = player1Name;
  document.querySelector(".player-2-section__player-2-name").textContent = player2Name;
  buttonsDisable();
}

// function for disabling buttons for non activePlayer and enabling for activePlayer
function buttonsDisable() {
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
} 

// function for changing active player
function changePlayer() {
  // setting current score for both players to zero
  currentScorePlayer1 = 0;
  currentScorePlayer2 = 0;
  document.getElementById("player-1-current-score").textContent = "0";
  document.getElementById("player-2-current-score").textContent = "0";
  // changing active player
  activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
  // toggling an active and non-active class between players
  document.querySelector(".player-1-section").classList.toggle("player-section_is-active"); 
  document.querySelector(".player-2-section").classList.toggle("player-section_is-active"); 
  document.querySelector(".player-1-section").classList.toggle("player-section_is-not-active"); 
  document.querySelector(".player-2-section").classList.toggle("player-section_is-not-active"); 
  // hiding dice image for active player before he starts his round
  document.querySelector(".images-player-" + activePlayer).classList.add("images_is-hidden");
  document.querySelector(".images-player-" + activePlayer).classList.remove("images_is-visible");
}

// function for pressing Roll Dice button
function pressingRollDiceButton() {
  // generating random number from (min-0.5) to (max+0.5) using formula ( min + Math.random() * (max - min) )
  let diceRandomNumber1 = Math.round( (1 - 0.5) + Math.random() * ( (6 + 0.5) - (1 - 0.5) ) ); 
  let diceRandomNumber2 = Math.round( (1 - 0.5) + Math.random() * ( (6 + 0.5) - (1 - 0.5) ) ); 
  // displaying the result
  document.querySelector(".images-player-" + activePlayer).classList.add("images_is-visible");
  document.querySelector(".images-player-" + activePlayer).classList.remove("images_is-hidden");
  document.querySelector(".images-player-" + activePlayer + "__dice-1").src = "images/dice-" + diceRandomNumber1 + ".png";
  document.querySelector(".images-player-" + activePlayer + "__dice-2").src = "images/dice-" + diceRandomNumber2 + ".png";
  // updating current score if number on dice != 1 && != 12
  if (diceRandomNumber1 !== 1 && diceRandomNumber2 !== 1 && diceRandomNumber1 + diceRandomNumber2 !== 12) {
    if (activePlayer === 1) {
      currentScorePlayer1 = currentScorePlayer1 + diceRandomNumber1 + diceRandomNumber2;
      document.getElementById("player-" + activePlayer + "-current-score").textContent = currentScorePlayer1;
    } else {
      currentScorePlayer2 = currentScorePlayer2 + diceRandomNumber1 + diceRandomNumber2;
      document.getElementById("player-" + activePlayer + "-current-score").textContent = currentScorePlayer2;
    }
    document.querySelector(".buttons-section__hold-points-player-" + activePlayer).addEventListener("click", pressingHoldPointsButton);
  // otherwise (if dice shows 1 or 12)
  } else {
    changePlayer();
    // making pressingRollDiceButton function appear again and again
    document.querySelector(".buttons-section__roll-dice-player-" + activePlayer).addEventListener("click", pressingRollDiceButton);
  }
  buttonsDisable();
}

// function for pressing Hold Points button
function pressingHoldPointsButton() {
  // updating total score for active player
  if (activePlayer === 1) {
    totalScorePlayer1 += currentScorePlayer1;
    document.getElementById( "player-" + activePlayer + "-total-score" ).textContent = totalScorePlayer1;
  } else {
    totalScorePlayer2 += currentScorePlayer2;
    document.getElementById( "player-" + activePlayer + "-total-score" ).textContent = totalScorePlayer2;
  }
  // checking Final Score value
  newFinalScore = document.querySelector(".footer__set-final-score").value;
  if (newFinalScore) {
    finalScore = newFinalScore;
  } else {
    finalScore = 100;
  }
  // checking if activePlayer won the game
  if ( totalScorePlayer1 >= finalScore || totalScorePlayer2 >= finalScore ) {
    // celebrating the winner
    document.querySelector(".player-" + activePlayer + "-section__player-" + activePlayer + "-name").textContent = "WINNER!";
    document.querySelector(".player-" + activePlayer + "-section").classList.add("player-section_is-winner");
    // disable all buttons
    document.getElementById("player-1-roll-dice-button").disabled = true;
    document.getElementById("player-1-hold-points-button").disabled = true;
    document.getElementById("player-2-roll-dice-button").disabled = true;
    document.getElementById("player-2-hold-points-button").disabled = true;
  } else {
    changePlayer();
  // making pressingRollDiceButton function appear again and again
  document.querySelector(".buttons-section__roll-dice-player-" + activePlayer).addEventListener("click", pressingRollDiceButton);
  buttonsDisable();
  }
 }

// function for showing and hiding game rules
function gameRules() {
  document.querySelector(".how-to-play-modal-box-container").classList.add("how-to-play-modal-box-container_is-visible");
  document.querySelector(".how-to-play-modal-box-container").classList.remove("how-to-play-modal-box-container_is-hidden");
}
document.querySelector(".how-to-play-modal-box-content__close-button").onmouseover = function() {
  document.querySelector(".fas fa-times").classList.add("#close-button");
}
document.querySelector(".how-to-play-modal-box-content__close-button").onclick = function() {
  document.querySelector(".how-to-play-modal-box-container").classList.add("how-to-play-modal-box-container_is-hidden");
  document.querySelector(".how-to-play-modal-box-container").classList.remove("how-to-play-modal-box-container_is-visible");
}

// code for execution
newGame();
document.querySelector(".buttons-section__roll-dice-player-" + activePlayer).addEventListener("click", pressingRollDiceButton);
document.querySelector(".footer-buttons__start-new-game").addEventListener("click", newGame);
document.querySelector(".footer-buttons__how-to-play").addEventListener("click", gameRules);