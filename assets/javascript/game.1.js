// Initialize global variables
var wins = 0;
var losses = 0;
var newGame = true;
var randomNumber = 0;
var currentTotal = 0; // total
var crystal1 = 0;
var crystal2 = 0;
var crystal3 = 0;
var crystal4 = 0;

// Start game
function playGame() {
  wins = 0;
  losses = 0;
  resetPuzzle();

  // Click event for crystals
  $("#btn-1").on("click", function () {
    gemClickEffect(1);
    currentTotal = currentTotal + crystal1; // Add crystal value to crystal total
    displayCurrentTotal(currentTotal);
    checkGameStatus(currentTotal, randomNumber);
  });

  $("#btn-2").on("click", function () {
    gemClickEffect(2);
    currentTotal = currentTotal + crystal2; // Add crystal value to crystal total
    displayCurrentTotal(currentTotal);
    checkGameStatus(currentTotal, randomNumber);
  });

  $("#btn-3").on("click", function () {
    gemClickEffect(3);
    currentTotal = currentTotal + crystal3; // Add crystal value to crystal total
    displayCurrentTotal(currentTotal);
    checkGameStatus(currentTotal, randomNumber);
  });

  $("#btn-4").on("click", function () {
    gemClickEffect(4);
    currentTotal = currentTotal + crystal4; // Add crystal value to crystal total
    displayCurrentTotal(currentTotal);
    checkGameStatus(currentTotal, randomNumber);
  });
}

//  gemClickEffect animation
function gemClickEffect(buttonNumber) {
  var btn = "#btn-" + buttonNumber;
  $(btn).addClass("gemClickEffect");
  setTimeout(function() {
    $(btn).removeClass("gemClickEffect");
  }, 200);
}
// Reset
function resetPuzzle() {

  // displayMessage("");

  newGame = false;
  // Get random number between 19 - 120
  randomNumber = randomIntFromInterval(19, 120);

  // display randon number
  displayRandomNumber(randomNumber);

  // get crystal values 1 - 12
  crystal1 = randomIntFromInterval(1, 12);
  crystal2 = randomIntFromInterval(1, 12);
  crystal3 = randomIntFromInterval(1, 12);
  crystal4 = randomIntFromInterval(1, 12);
  currentTotal = 0;
  displayCurrentTotal(currentTotal);
}

// Generate random numbers
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// Display random number
function displayRandomNumber(randomNumber) {
  $(".targetNumber").text(randomNumber);
}

//Display total
function displayCurrentTotal(currentTotal) {
  $(".currentTotal").text(currentTotal);
}

function displayWinLose() {
  $("#wins").text(wins);
  $("#losses").text(losses);

}

function displayMessage(trueFalse) {
  // Set appropriate plurals
  var winTimes = 'times';
  var lossTimes = 'times';
  if (wins === 1) {
    winTimes = 'time'
  }
  if (losses === 1) {
    lossTimes = 'time'
  }

  // Manipulate elements
  const messagesModal = document.getElementById("messages");
  messagesModal.style.display = "flex";

  const dismissBtn = document.getElementById("dismiss");
  dismissBtn.addEventListener('click', function () {
    messagesModal.style.display = "none";
  })

  const message = document.getElementById("message");
  message.textContent = getMessage(trueFalse);

  const winLossMessage = document.getElementById("winLossMessage");
  winLossMessage.textContent = "You have won " + wins + " " + winTimes +
    " and lost " + losses + " " + lossTimes + ".";

  document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode == 27) {
      messagesModal.style.display = "none";
    }
  };

  window.addEventListener('click', clickOutsideModal);

  function clickOutsideModal(e) {
    if (e.target == messagesModal) {
      messagesModal.style.display = "none";
    }
  }
}

function getMessage(trueFalse) {
  var winMessages = [
    "Bravo!",
    "You win!",
    "You're really getting the hang of this!",
    "Good job!"
  ];

  var lossMessages = [
    "Aww..., you lost, try again.",
    "Better luck next time.",
    "Are you kidding me?",
    "Sorry Charlie..."
  ];

  var i = randomIntFromInterval(0, 3);

  if (trueFalse) {
    return winMessages[i];
  } else {
    return lossMessages[i];
  }
}

function checkGameStatus(currentTotal, randomNumber) {
  if (!newGame) {
    if (currentTotal === randomNumber) { // If total equals target, you win
      wins++;
      displayMessage(true);
      newGame = true;
    } else if (currentTotal > randomNumber) { // If total over target, you lose
      losses++;
      displayMessage(false);
      newGame = true;
    } else { // If total under target, keep playing
      newGame = false;
    }
  }

  displayWinLose();

  if (newGame) {
    resetPuzzle();
  }
}

playGame();

// Instructions Modal
(function () {

  const modal = document.getElementById('instructionModal');

  const openInstructions = document.getElementById('openInstructions');

  const closeBtn = document.getElementById('closeModal');

  document.onkeyup = function (e) {
    e = e || window.event;
    if (e.keyCode == 27) {
      modal.style.display = "none";
    }
  };

  openInstructions.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  window.addEventListener('click', clickOutsideModal);

  function openModal() {
    modal.style.display = "flex";
  }

  function closeModal() {
    modal.style.display = "none";
  }

  function clickOutsideModal(e) {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  }
})();

