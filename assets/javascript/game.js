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
  newGame: true,

  updateCurrentTotal: function (crystal) {
    this.currentTotal += State[crystal];
  },

  displayRandomNumber: function () {
    document.getElementById('targetNumber').textContent = this.randomNumber;
  },

  displayCurrentTotal: function () {
    document.getElementById('currentTotal').textContent = this.currentTotal;
  },

  displayWinLose: function () {
    document.getElementById('wins').textContent = this.wins;
    document.getElementById('losses').textContent = this.losses;
  },

  setCurrentTotal: function (strCrystal) {
    this.updateCurrentTotal(strCrystal);
    this.displayCurrentTotal();
  },

  checkGameStatus: function () {
    if (!this.newGame) {
      if (this.currentTotal === this.randomNumber) {
        // If total equals target, you win
        this.wins++;
        displayMessage(true);
        this.newGame = true;
      } else if (this.currentTotal > this.randomNumber) { // If total over target, you lose
        this.losses++;
        displayMessage(false);
        this.newGame = true;
      }
    }
    this.displayWinLose();
  },

  // Reset
  resetPuzzle: function () {
    this.newGame = false;
    // Get random number between 19 - 120
    this.randomNumber = randomIntFromInterval(19, 120);
    // display random number
    this.displayRandomNumber();
    // get crystal values 1 - 12
    this.crystal1 = randomIntFromInterval(1, 12);
    this.crystal2 = randomIntFromInterval(1, 12);
    this.crystal3 = randomIntFromInterval(1, 12);
    this.crystal4 = randomIntFromInterval(1, 12);
    this.currentTotal = 0;
    this.displayCurrentTotal();
  }
};

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
  State.setCurrentTotal(strCrystal);
  State.checkGameStatus();
}
//  gemClickEffect animation
function gemClickEffect(crystal) {
  crystal.classList.add('gemClickEffect');
  setTimeout(function () {
    crystal.classList.remove('gemClickEffect');
  }, 200);
}

// Generate random numbers
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}


State.resetPuzzle();


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
  resetPuzzle();
}

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