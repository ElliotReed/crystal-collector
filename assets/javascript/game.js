// Create a state class
var State = {
  wins: 0,
  losses: 0,
  randomNumber: 0,
  currentTotal: 0,
  crystal1: 0,
  crystal2: 0,
  crystal3: 0,
  crystal4: 0,
  newGame: true
};

resetPuzzle();

function updateCurrentTotal(crystal) {
  State.currentTotal += State[crystal];
}

function displayRandomNumber() {
  document
    .getElementById('targetNumber')
    .textContent = State.randomNumber;
}

function displayCurrentTotal() {
  document
    .getElementById('currentTotal')
    .textContent = State.currentTotal;
}

function displayWinLose() {
  document
    .getElementById('wins')
    .textContent = State.wins;
  document
    .getElementById('losses')
    .textContent = State.losses;
}

function setCurrentTotal(strCrystal) {
  updateCurrentTotal(strCrystal);
  displayCurrentTotal();
}

function checkGameStatus() {
  if (!State.newGame) {
    if (State.currentTotal === State.randomNumber) {
      // If total equals target, you win
      State.wins++;
      displayMessage(true);
      State.newGame = true;
    } else if (State.currentTotal > State.randomNumber) { // If total over target, you lose
      State.losses++;
      displayMessage(false);
      State.newGame = true;
    }
  }
  displayWinLose();
  if (State.newGame) {
    resetPuzzle();
  }
}

// Reset
function resetPuzzle() {
  State.newGame = false;
  // Get random number between 19 - 120
  State.randomNumber = randomIntFromInterval(19, 120);
  // display random number
  displayRandomNumber();
  // get crystal values 1 - 12
  State.crystal1 = randomIntFromInterval(1, 12);
  State.crystal2 = randomIntFromInterval(1, 12);
  State.crystal3 = randomIntFromInterval(1, 12);
  State.crystal4 = randomIntFromInterval(1, 12);
  State.currentTotal = 0;
  displayCurrentTotal();
}

function displayMessage(trueFalse) {
  // Set appropriate plurals
  var winTimes = 'times';
  var lossTimes = 'times';
  if (State.wins === 1) {
    winTimes = 'time'
  }
  if (State.losses === 1) {
    lossTimes = 'time'
  }
  // Manipulate elements
  openModal(winLoseModal);

  var emoji = document.getElementById('emoji');
  var message = document.getElementById("message");
  var messageObject = getMessage(trueFalse);
  emoji.innerHTML = messageObject.emoji;
  message.textContent = messageObject.message;

  var winLossMessage = document.getElementById("winLossMessage");
  winLossMessage.textContent = "You have won " + State.wins + " " + winTimes + " and lost " + State.losses + " " + lossTimes + ".";


}

function getMessage(trueFalse) {
  var winMessages = [
    {message: "Bravo!", emoji: "🤩"},
    {message: "You win!", emoji: "😃"},
    {message: "You're really getting the hang of this!", emoji: "😉"},
    {message: "Good job!", emoji: "😊"}
     ];

  var lossMessages = [
    {message: "Aww..., you lost, try again.", emoji: "😞"},
    {message: "Better luck next time.", emoji: "😢"},
    {message: "Are you kidding me?", emoji: "🙄"},
    {message: "Sorry Charlie...", emoji: "😢"}
     ];

  var i = randomIntFromInterval(0, 3);

  if (trueFalse) {
    return winMessages[i];
  } else {
    return lossMessages[i];
  }
}

// Click event for crystals
var crystal1 = document.getElementById('btn-1');
var crystal2 = document.getElementById('btn-2');
var crystal3 = document.getElementById('btn-3');
var crystal4 = document.getElementById('btn-4');
// Add event listeners
crystal1.addEventListener('click', function () {
  crystalClick(crystal1, 'crystal1');
});
crystal2.addEventListener('click', function () {
  crystalClick(crystal2, 'crystal2');
});
crystal3.addEventListener('click', function () {
  crystalClick(crystal3, 'crystal3');
});
crystal4.addEventListener('click', function () {
  crystalClick(crystal4, 'crystal4');
});

function crystalClick(crystal, strCrystal) {
  gemClickEffect(crystal);
  playClickSound();
  setCurrentTotal(strCrystal);
  checkGameStatus();
}
//  gemClickEffect animation
function gemClickEffect(crystal) {
  crystal
    .classList
    .add('gemClickEffect');
  setTimeout(function () {
    crystal
      .classList
      .remove('gemClickEffect');
  }, 200);
}

function playClickSound() {
  var clickSound = new Audio('./assets/audio/click.mp3');
  clickSound.loop = false;
  clickSound.volume = .25;
  clickSound.play();
}
// Generate random numbers
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Modal
// ===========================================================================
var instructionsModal = document.getElementById('instructionsModal');
var winLoseModal = document.getElementById('winLoseModal');

var instructionCloseButton = document.getElementById('instructionCloseButton');
instructionCloseButton.addEventListener('click', function () {
  closeModal(instructionsModal);
})

var winLoseCloseButton = document.getElementById('winLoseCloseButton');
winLoseCloseButton.addEventListener('click', function () {
  closeModal(winLoseModal);
})

var openInstructions = document.getElementById('openInstructions');
openInstructions.addEventListener('click', function () {
  openModal(instructionsModal);
});

window.addEventListener('click', clickOutsideModal);

function openModal(modal) {
  modal.style.display = "flex";
}

function closeModal(modal) {
  modal.style.display = "none";
}

function clickOutsideModal(e) {
  if (e.target == instructionsModal) {
    instructionsModal.style.display = "none";
  } else if (e.target == winLoseModal) {
    winLoseModal.style.display = "none";
  }
}
document.onkeyup = function (e) {
  e = e || window.event;
  if (e.keyCode == 27) {
    document
      .querySelector('.modal')
      .style
      .display = "none";
  }
};
