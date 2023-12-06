const messages = {
	win: [
		{ message: 'Bravo!', emoji: '🤩' },
		{ message: 'You win!', emoji: '😃' },
		{ message: "You're really getting the hang of this!", emoji: '😉' },
		{ message: 'Good job!', emoji: '😊' },
	],
	lose: [
		{ message: 'Aww..., you lost, try again.', emoji: '😞' },
		{ message: 'Better luck next time.', emoji: '😢' },
		{ message: 'Are you kidding me?', emoji: '🙄' },
		{ message: 'Sorry Charlie...', emoji: '😢' },
	],
};

const app = {
	wins: 0,
	losses: 0,

	displayWinLose: function () {
		document.getElementById('wins').textContent = this.wins.toString();
		document.getElementById('losses').textContent = this.losses.toString();
	},
	setCopyright: function () {
		const date = new Date();
		const year = date.getFullYear();
		const textContent = `Copyright \u00A9 ${year} by Elliot Reed`;
		const copyright = document.querySelector('.copyright');

		copyright.textContent = textContent;
	},
	initialize: function () {
		this.setCopyright();
		this.displayWinLose();
		// TODO save wins and losses in local storage
		game.initialize();
	},
};

const game = {
	// TODO animate game start
	initialize: function () {
		console.log('in game');
		game.newGame = false;
		game.currentTotal = 0;
		game.randomNumber = this.randomIntFromInterval(19, 120);
		game.crystal1 = this.randomIntFromInterval(1, 12);
		game.crystal2 = this.randomIntFromInterval(1, 12);
		game.crystal3 = this.randomIntFromInterval(1, 12);
		game.crystal4 = this.randomIntFromInterval(1, 12);
		game.currentTotal = 0;
		this.displayRandomNumber();
		this.displayCurrentTotal();
	},
	getMessage: function (trueFalse) {
		const i = this.randomIntFromInterval(0, 3);

		if (trueFalse) {
			return messages.win[i];
		} else {
			return messages.lose[i];
		}
	},
	playClickSound: function () {
		const clickSound = new Audio('./assets/audio/click.mp3');
		clickSound.loop = false;
		clickSound.volume = 0.25;
		clickSound.play();
	},
	displayRandomNumber: function () {
		document.getElementById(
			'targetNumber'
		).textContent = game.randomNumber.toString();
	},
	displayCurrentTotal: function () {
		document.getElementById(
			'currentTotal'
		).textContent = this.currentTotal.toString();
	},
	updateCurrentTotal: function (crystal) {
		game.currentTotal += game[crystal];
	},
	setCurrentTotal: function (strCrystal) {
		this.updateCurrentTotal(strCrystal);
		this.displayCurrentTotal();
	},
	// Generate random numbers
	randomIntFromInterval: function (min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
};

function checkGameStatus() {
	if (!game.newGame) {
		if (game.currentTotal === game.randomNumber) {
			// If total equals target, you win
			app.wins++;
			displayMessage(true);
			game.newGame = true;
		} else if (game.currentTotal > game.randomNumber) {
			// If total over target, you lose
			app.losses++;
			displayMessage(false);
			game.newGame = true;
		}
	}

	app.displayWinLose();
	if (game.newGame) {
		game.initialize();
	}
}

function displayMessage(trueFalse) {
	// Set gameropriate plurals
	let winTimes = 'times';
	let lossTimes = 'times';
	if (app.wins === 1) {
		winTimes = 'time';
	}
	if (app.losses === 1) {
		lossTimes = 'time';
	}
	// Manipulate elements
	openModal(winLoseModal);

	const emoji = document.getElementById('emoji');
	const message = document.getElementById('message');
	const messageObject = game.getMessage(trueFalse);
	emoji.innerHTML = messageObject.emoji;
	message.textContent = messageObject.message;

	const winLossMessage = document.getElementById('winLossMessage');
	winLossMessage.textContent =
		'You have won ' +
		app.wins +
		' ' +
		winTimes +
		' and lost ' +
		app.losses +
		' ' +
		lossTimes +
		'.';
}

// Click event for crystals
const crystal1 = document.getElementById('btn-1');
const crystal2 = document.getElementById('btn-2');
const crystal3 = document.getElementById('btn-3');
const crystal4 = document.getElementById('btn-4');
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
	game.playClickSound();
	game.setCurrentTotal(strCrystal);
	checkGameStatus();
}
//  gemClickEffect animation
function gemClickEffect(crystal) {
	crystal.classList.add('gemClickEffect');
	setTimeout(function () {
		crystal.classList.remove('gemClickEffect');
	}, 200);
}

// Modal
// ===========================================================================
const instructionsModal = document.getElementById('instructionsModal');
const winLoseModal = document.getElementById('winLoseModal');

const instructionCloseButton = document.getElementById('instructionCloseButton');
instructionCloseButton.addEventListener('click', function () {
	closeModal(instructionsModal);
});

const winLoseCloseButton = document.getElementById('winLoseCloseButton');
winLoseCloseButton.addEventListener('click', function () {
	closeModal(winLoseModal);
});

const openInstructions = document.getElementById('openInstructions');
openInstructions.addEventListener('click', function () {
	openModal(instructionsModal);
});

window.addEventListener('click', clickOutsideModal);

function openModal(modal) {
	modal.style.display = 'flex';
}

function closeModal(modal) {
	modal.style.display = 'none';
}

function clickOutsideModal(e) {
	if (e.target == instructionsModal) {
		instructionsModal.style.display = 'none';
	} else if (e.target == winLoseModal) {
		winLoseModal.style.display = 'none';
	}
}
document.onkeyup = function (e) {
	e = e || window.event;
	if (e.keyCode == 27) {
		document.querySelector('.modal').style.display = 'none';
	}
};

app.initialize();
