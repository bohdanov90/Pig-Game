"use strict";


let Player1Name, Player2Name, totalScorePlayer1, totalScorePlayer2, currentScorePlayer1, currentScorePlayer2, activePlayer, finalScore, newFinalScore;


// setting players' names
Player1Name = "Player 1";
Player2Name = "Player 2";


// function for starting a new game
function newGame() {
  totalScorePlayer1 = 0;
  totalScorePlayer2 = 0;
  currentScorePlayer1 = 0;
  currentScorePlayer2 = 0;
  activePlayer = 1; // we have players 1 and 2
  // hiding dice images before we start the game
  document.querySelector(".image-dice-player-1").style.visibility = "hidden";
  document.querySelector(".image-dice-player-2").style.visibility = "hidden";
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
  document.querySelector(".player-1-section__player-1-name").textContent = Player1Name;
  document.querySelector(".player-2-section__player-2-name").textContent = Player2Name;
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
  document.getElementById( "player-1-current-score" ).textContent = "0";
  document.getElementById( "player-2-current-score" ).textContent = "0";
  // changing active player
  activePlayer === 1 ? activePlayer = 2 : activePlayer = 1;
  // toggling an active and non-active class between players
  document.querySelector(".player-1-section").classList.toggle("player-section_is-active"); 
  document.querySelector(".player-2-section").classList.toggle("player-section_is-active"); 
  document.querySelector(".player-1-section").classList.toggle("player-section_is-not-active"); 
  document.querySelector(".player-2-section").classList.toggle("player-section_is-not-active"); 
  // hiding dice image for active player before he starts his round
  document.querySelector(".image-dice-player-" + activePlayer).style.visibility = "hidden";
}


// function for pressing Roll Dice button
function pressingRollDiceButton() {
  // generating random number from (min-0.5) to (max+0.5) using formula ( min + Math.random() * (max - min) )
  let diceRandomNumber = Math.round( (1 - 0.5) + Math.random() * ( (6 + 0.5) - (1 - 0.5) ) ); 
  // displaying the result
  document.querySelector(".image-dice-player-" + activePlayer).style.visibility = "visible";
  document.querySelector(".image-dice-player-" + activePlayer).src = "images/dice-" + diceRandomNumber + ".png";
  // updating current score if number on dice != 1
  if (diceRandomNumber !== 1) {
    if (activePlayer === 1) {
      currentScorePlayer1 += diceRandomNumber;
      document.getElementById( "player-" + activePlayer + "-current-score" ).textContent = currentScorePlayer1;
    } else {
      currentScorePlayer2 += diceRandomNumber;
      document.getElementById( "player-" + activePlayer + "-current-score" ).textContent = currentScorePlayer2;
    }
    document.querySelector(".buttons-section__hold-points-player-" + activePlayer).addEventListener("click", pressingHoldPointsButton);
  // otherwise (if dice shows 1)
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
  newFinalScore = document.querySelector(".aside__set-final-score").value;
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


// code for execution
newGame();
document.querySelector(".buttons-section__roll-dice-player-" + activePlayer).addEventListener("click", pressingRollDiceButton);
document.querySelector(".aside__start-new-game").addEventListener("click", newGame);









// add some rules to my game. 
// 1. if you get two 6's in a row -- your total scores equals to 0 and you lose your turn 
// (always save previous dice roll in separate variable)

// 3. add another dice to the game. Player loses when he gets at least one "1"
// https://www.w3schools.com/howto/howto_css_modals.asp - добавить правила на страницу

// change HTML according to BEM
// change CSS according to SCSS.

// dont use style.visibility = "hidden" in JS instead add\remove and toggle CSS classes

// как добавить возникновение и исчезновение иконки кубиков для активного игрока?
// нужно испольовать append???     (player-1-section__player-1-name).append("<i class="fas fa-dice"></i>");


// добавить bullet к имени активного игрока??      
/* .player-section_is-active::after {
        content: "\2022";
      }*/





  
/* RULES

1. This game is 2 players game. Player 1 is always starts the game.
2. The goal is to reach Final Score (100 points by default but you can change it any time during your game) sooner than your opponent.
3. Every time you roll dices ("Roll Dice" button) the sum on your dices is added to your current score unless:
  - you roll 1 at least on one of the dices;
  - you rolled the highest double (6+6 only);
4. After each roll you have a chance to add your current score to your total score by pressing "Hold Points" button. If you do so you save your scores but lose turn.
   If you decided not to "Hold" your points you roll dices again and have chance to multiple your current points. This will continue happening unless you decide 
   to "Hold Points" or one of events happens (paragraph 4).
5. Game finishes when one of the players' Total Score equals or higher than Final Score.
6. That's it. Have fun!

*/

