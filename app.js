var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var monsterInterval;
var bonusInterval;
var direction = 4;
var lifes = 5;
var monsterAmount; //should be a var
let food_remain; //should be a var
var wallsAmount;
let smallFoodColor = 'red';
let mediumFoodColor = 'blue';
let largeFoodColor = 'black';
var gameTime;
var username;
var lblScore = document.getElementById("lblScore");
var lblTime = document.getElementById("lblTime");
var lblLifes = document.getElementById("lblLifes");
var backgroundMusic;
var up = 38;
var down = 40;
var left = 37;
var right = 39;
var GAME_TIME;

var monsterImg = new Image();
monsterImg.src = 'resources/monster.png'
var lifeImg = new Image();
lifeImg.src = 'resources/life-without-background.png'
var timeImg = new Image();
timeImg.src = 'resources/time-without-background.png'
var bonusImg = new Image();
bonusImg.src = 'resources/bonus-removebg-preview.png'

$(document).ready(function () {
	context = canvas.getContext("2d");
	 $('.content').hide();
	 $('#welcomeDiv').show();
	/*
	$('#loginButton').click(function () {
		console.log('login pressed');
		Start();
	});
	*/
})


function Start() {
	$("#username").text("Hello " + username + "!");
	wallsAmount = 100 - food_remain - 1 - 3; //3 for the extra food and 1 for the pacman itself
	backgroundMusic = new Audio("resources/sounds/Pac-man_theme_remix.mp3");
	backgroundMusic.play();
	board = new Board(context, food_remain, monsterAmount, wallsAmount, smallFoodColor, mediumFoodColor, largeFoodColor);
	score = 0;
	start_time = new Date();


	keysDown = {};
	document.onkeydown = function (e) {
		keysDown[e.keyCode] = true;
		console.log(e.keyCode);
	};
		
	addEventListener(
		"keyup",
		function (e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
	monsterInterval = setInterval(updateMonstersPosition, 650);
	bonusInterval = setInterval(updateBonusPosition, 650);
}

function updateMonstersPosition() {
	const addScore = board.updateMonstersPosition();
	if (addScore === -10) {
		this.pacmanWasEaten();
	}
	score += addScore;
}

function updateBonusPosition() {
	const addScore = board.updateBonusPosition();
	score += addScore;
}

function pacmanWasEaten() {
	curTime = parseInt(lblTime.value);
	lifes--;
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	Draw();
	backgroundMusic.pause();
	const deathMusic = new Audio("resources/sounds/pacman_death.wav");
	setTimeout(function () {
		deathMusic.play();
	}, 10);
	setTimeout(function () { backgroundMusic.play(); }, 1700);
	if (lifes === 0) {
		const lostMusic = new Audio("resources/sounds/Booing-sound-effect.mp3");
		setTimeout(function () { lostMusic.play(); }, 10);
		setTimeout(function () { backgroundMusic.pause(); }, 1700);
		setTimeout(endGameWindow("Loser! your score is " + score), 100);
	} else {
		setTimeout(function () {
			board.putPacman();
			board.initMonsters();
			interval = setInterval(UpdatePosition, 150);
			monsterInterval = setInterval(updateMonstersPosition, 650);
		}, 1700);
		this.gameTime = curTime;
		start_time = new Date();
	}

}

function setUpKey() {
	let upWindow = document.querySelector('#upWindow');
	upWindow.showModal();
	document.onkeydown = function (e) {
		up = e.keyCode;
		let string = String.fromCharCode(e.keyCode);
		if(e.keyCode == 38){
			string = "ArrowUp"
		}
		else if(e.keyCode == 40){
			string = "ArrowDown"
		}
		else if(e.keyCode == 39){
			string = "ArrowRight"
		}
		else if(e.keyCode == 37){
			string = "ArrowLeft"
		}
		document.getElementById('up').innerHTML = string;
	}
	document.querySelector("#upOk").onclick = function () {
		upWindow.close();
	}
}

function setDownKey() {
	let downWindow = document.querySelector('#downWindow');
	downWindow.showModal();
	document.onkeydown = function (e) {
		down = e.keyCode;
		let string = String.fromCharCode(e.keyCode);
		if(e.keyCode == 38){
			string = "ArrowUp"
		}
		else if(e.keyCode == 40){
			string = "ArrowDown"
		}
		else if(e.keyCode == 39){
			string = "ArrowRight"
		}
		else if(e.keyCode == 37){
			string = "ArrowLeft"
		}
		document.getElementById('down').innerHTML = string;
	}
	document.querySelector("#downOk").onclick = function () {
		downWindow.close();
	}
}

function setRightKey() {
	console.log("hereee");
	let rightWindow = document.querySelector('#rightWindow');
	rightWindow.showModal();
	document.onkeydown = function (e) {
		right = e.keyCode;
		let string = String.fromCharCode(e.keyCode);
		if(e.keyCode == 38){
			string = "ArrowUp"
		}
		else if(e.keyCode == 40){
			string = "ArrowDown"
		}
		else if(e.keyCode == 39){
			string = "ArrowRight"
		}
		else if(e.keyCode == 37){
			string = "ArrowLeft"
		}
		document.getElementById('right').innerHTML = string;
	}
	document.querySelector("#rightOk").onclick = function () {
		rightWindow.close();
	}
}

function setLeftKey() {
	let leftWindow = document.querySelector('#leftWindow');
	leftWindow.showModal();
	document.onkeydown = function (e) {
		left = e.keyCode;
		let string = String.fromCharCode(e.keyCode);
		if(e.keyCode == 38){
			string = "ArrowUp"
		}
		else if(e.keyCode == 40){
			string = "ArrowDown"
		}
		else if(e.keyCode == 39){
			string = "ArrowRight"
		}
		else if(e.keyCode == 37){
			string = "ArrowLeft"
		}
		document.getElementById('left').innerHTML = string;
	}
	document.querySelector("#leftOk").onclick = function () {
		leftWindow.close();
	}
}




function GetKeyPressed() {
	console.log("up" + up);
	console.log("down" + down);
	console.log("left" + left);
	console.log("right" + right);

	// up
	if (keysDown[up]) {
		return 1;
	}

	// down
	if (keysDown[down]) {
		return 2;
	}

	// left
	if (keysDown[left]) {
		return 3;
	}

	// right
	if (keysDown[right]) {
		return 4;
	}
}

function clearBoard() {
	context.clearRect(0, 0, canvas.width, canvas.height);
}

function Draw() {
	clearBoard();
	lblScore.value = score;
	lblTime.value = gameTime - time_elapsed;
	lblLifes.value = lifes;
	board.draw();
}

function UpdatePosition() {
	var x = GetKeyPressed();
	let addScore = 0;
	let addBonus = '';
	if (x) {
		let res = board.updatePacmanPosition(x);
		console.log(res);
		addScore = res.score;
		addBonus = res.bonus;
	}
	this.score += addScore;
	if (addScore === -10) {
		return this.pacmanWasEaten();
	}
	if (addBonus === 'time') {
		gameTime += 20;
	}
	if (addBonus === 'life') {
		lifes += 1;
	}
	var currentTime = new Date();
	time_elapsed = Math.floor((currentTime - start_time) / 1000);
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	Draw();
	this.checkIfGameEnd();
}

function endGameWindow(inputMessage) {
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	window.clearInterval(bonusInterval);
	lifes = 5;
	backgroundMusic.pause();
	bootbox.confirm({
		title: inputMessage,
		message: "Would you like to start a new game?",
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> No thanks'
			},
			confirm: {
				label: '<i class="fa fa-check"></i> Yes!!!'
			}
		},
		callback: function (result) {
			console.log('This was logged in the callback: ' + result + '.');
			$("#gameDiv").hide();
			if (result) {
				$("#gameSettingsDiv").show(1000);
			}
			else {
				$("#welcomeDiv").show(1000);
			}
		}
	});
}

function checkIfGameEnd() {
	const WinMusic = new Audio("resources/sounds/Ta_Da.mp3");

	if (board.foodRemain === 0) {
		setTimeout(endGameWindow("You are Winner!!! your score is " + score + "."), 200);
		WinMusic.play();
	}

	if (lblTime.value <= '0') {
		console.log(gameTime);
		if (score <= 100) {
			setTimeout(endGameWindow("Time's up! You are better than " + score + " points!"), 200);
			const lostMusic = new Audio("resources/sounds/Booing-sound-effect.mp3");
			setTimeout(function () { lostMusic.play(); }, 10);
		} else {
			setTimeout(endGame("Time's up! You are Winner!!! your score is " + score), 200);
			WinMusic.play();
		}
	}
}

function leaveGame(menuButton) {
	let curTime = parseInt(lblTime.value);
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	backgroundMusic.pause();
	bootbox.confirm({
		title: "Would you like to leave the game?",
		message: "Think again :)",
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> No'
			},
			confirm: {
				label: '<i class="fa fa-check"></i> Yes'
			}
		},
		callback: function (result) {
			if (result) {
				$("#gameDiv").hide();
				if (menuButton == "welcome") {
					$("#welcome").show(1000);
				}
				else if (menuButton == "register") {
					$("#register").slideDown(1000);
				}
				else if (menuButton == "login") {
					$("#login").slideDown(1000);
				}
			}
			else {
				gameTime = curTime;
				start_time = new Date();
				backgroundMusic.play();
				board.putPacman();
				board.initMonsters();
				interval = setInterval(UpdatePosition, 150);
				monsterInterval = setInterval(updateMonstersPosition, 650);
				}
		}
	});
}

/****************** jQuery ******************/
//DB for users
let DataBase = [];
DataBase.push({ user: 'p', password: 'p' });
/*
$(function () {
	$('.content').hide();
	$('#welcomeDiv').show(1000);
});
*/


/*Welcome Screen*/
$('#registerWelcome').on('click', function () {
	$('#welcomeDiv').hide(500);
	$(".loginForm").val('');
	$('#registerDiv').show(500);
});
$('#loginWelcome').on('click', function () {
	$('#welcomeDiv').hide(500);
	$(".loginForm").val('');
	$('#loginDiv').show(500);
});

/*Menu*/
$('#homeMenu').on('click', function () {
	if ($("#gameDiv").is(':visible')) {
		leaveGame("welcome");
	} else {
		$('.content').hide();
		$('#welcomeDiv').show(1000);
	}

});
$('#loginMenu').on('click', function () {
	if ($("#gameDiv").is(':visible')) {
		leaveGame("login");
	} else {
		$('.content').hide();
		$(".loginForm").val('');
		$('#loginDiv').show(500);
	}

});
$('#registerMenu').on('click', function () {
	if ($("#gameDiv").is(':visible')) {
		leaveGame("register");
	} else {
		$('.content').hide();
		$(".loginForm").val('');
		$('#register').show(500);
	}

});


/*Register Form*/

/*Login Screen*/
$('#loginButton').on('click', function (event) {
	event.preventDefault();
	event.stopPropagation();
	var loginAttributes = document.getElementsByClassName("loginForm");
	var inputUsername = loginAttributes[0].value;
	var inputPassword = loginAttributes[1].value;
	let checkUser = DataBase.find(o => o.user === inputUsername);
	if (checkUser && checkUser.password == inputPassword) {
		username = inputUsername;
		$('#loginDiv').hide();
		$('#gameSettingsDiv').show();
	}
	else {
		alert("Incorrect username or password, try again :)");

	}

});

/*Start Game*/
$('#startGameButton').on('click', function (event) {
	event.preventDefault();
	event.stopPropagation();
	var formInputs = $('.gameInputs');
	food_remain = formInputs[0].value; //validate
	smallFoodColor = formInputs[1].value;
	mediumFoodColor = formInputs[2].value;
	largeFoodColor = formInputs[3].value;
	gameTime = parseInt(formInputs[4].value);
	GAME_TIME = gameTime;
	monsterAmount = parseInt($('#selectAmountOfMonsters').val());
	$('#gameSettingsDiv').hide();
	$('#gameDiv').show();
	Start();
});

/*Start the game again*/
$('#newGame').on('click', function (event) {
	let curTime = parseInt(lblTime.value);
	window.clearInterval(interval);
	window.clearInterval(monsterInterval);
	backgroundMusic.pause();
	bootbox.confirm({
		title: "Would you like to start a new game?",
		message: "Think again and click your answer",
		buttons: {
			cancel: {
				label: '<i class="fa fa-times"></i> No'
			},
			confirm: {
				label: '<i class="fa fa-check"></i> Yes'
			}
		},
		callback: function (result) {
			if (result) {
				lifes=5;
				gameTime=GAME_TIME;
				Start();
				// gameTime = parseInt(formInputs[4].value);

				// start_time = new Date();
				// lifes = 5;
				// score = 0;
				// backgroundMusic.play();
				// board = new Board(context, food_remain, monsterAmount, wallsAmount, smallFoodColor, mediumFoodColor, largeFoodColor);
				// Draw();
			}
			else {
				gameTime = curTime;
				start_time = new Date();
				backgroundMusic.play();
				board.putPacman();
				board.initMonsters();
				interval = setInterval(UpdatePosition, 150);
				monsterInterval = setInterval(updateMonstersPosition, 650);
			}
		}
	});
});


$('#aboutMenu').on('click', function (event) {
	bootbox.alert({
		message: "This PacMan game was developed by Naor Ben Evgi & Roy Judes, B.Sc Third Year Software and Information System Engineering Student in Ben Gurion University of the Negev" +
			"<br/><br/>" + "<strong>The most difficult part was to make the monster chase after the Pacman icon.</strong>",
		backdrop: true
	});
});


