/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// game variables
var scores, roundScore, activePlayer, gamePlaying;

// initial state of game
init();

// add event listerner to button roll dice
document.querySelector('.btn-roll').addEventListener('click', function () {
  // state variable to deside game to continue OR not
  if (gamePlaying) {
    // random number generator dice
    var dice = Math.floor(Math.random() * 6) + 1; // random number between 1 to 6

    // display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png'; // display img as per dice value

    // update the round score IF the rolled number was NOT 1
    if (dice !== 1) {
      // add score to current score
      roundScore += dice;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;
    } else {
      // next player turn
      nextPlayer();
    }
  }
});

// add event listerner to button hold
document.querySelector('.btn-hold').addEventListener('click', function () {
  // state variable to deside game to continue OR not
  if (gamePlaying) {
    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    // update UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    // check IF player WON the game
    if (scores[activePlayer] >= 100) {
      document.querySelector('#name-' + activePlayer).textContent =
        'winner !!!';
      document.querySelector('.dice').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.remove('active');
      gamePlaying = false; // end game here when we have winner
    } else {
      // next player turn
      nextPlayer();
    }
  }
});

// add event listerner to button new
document.querySelector('.btn-new').addEventListener('click', init);

// next player turn logic
function nextPlayer() {
  // next player turn
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // reset scores to 0 again
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // add dynamic css classes
  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');
  // toggle => if class present then remove it, if class not present then add it
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // hide dice here
  document.querySelector('.dice').style.display = 'none';
}

// initial state of game
function init() {
  // initialize all variables to initial values i.e 0
  scores = [0, 0]; // score for both players
  roundScore = 0; // currentlly playing player score
  activePlayer = 0; // 0 -> first player, 1 -> second player
  gamePlaying = true;

  // DOM manipulation
  // querySelector -> just like css selector
  // textContent -> plain text only
  // document.querySelector('#current-' + activePlayer).textContent = dice;
  // innerHTML -> write html tags
  // document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

  // DOM selection,change style through JS
  document.querySelector('.dice').style.display = 'none';

  // DOM selection with ID, Initialize with 0
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // reset player names to default
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  // reset css classes
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');

  // make first player as active
  document.querySelector('.player-0-panel').classList.add('active');
}
