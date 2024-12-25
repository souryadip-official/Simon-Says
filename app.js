let gameSeq = [];
let userSeq = [];

let highestScore = 0;

let buttons = ["red", "green", "yellow", "blue"];


let gameStart = false;
let level = 0;


let mainHead = document.querySelector("h1");
let body = document.querySelector("body");
let subHead = document.querySelector(".display");

document.addEventListener("keypress", function() {
    if(gameStart == false) {
        gameStart = true;
        mainHead.classList.remove("heading-pink");
        mainHead.classList.add("heading-green");
        levelUp();
    }
});

function flashButton(btn) {
    btn.classList.add("dimBtn");
    setTimeout(function() {
        btn.classList.remove("dimBtn");
    }, 200);
}


function btnPress() {
    if(gameStart == false) {
        subHead.innerText = "The game hasn't started yet!\nPress any key to start the game!";
        return;
    } // To tackle the situation where the game has not been started but the user is trying to press a button
    flashButton(this);
    let pressedBtn = this;
    let userColor = pressedBtn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length - 1);
}

function levelUp() {
    userSeq = []; //resets the user sequence #-> id . -> class
    level++;
    subHead.innerText = `Level ${level}`;

    /* Generating a random button */
    let randNum = Math.floor(Math.random() * 4);
    let color = buttons[randNum];
    /* accessing the class of that element */
    let eleToFlash = document.querySelector(`.${color}`);
    gameSeq.push(color);

    flashButton(eleToFlash);
}

let allBtn = document.querySelectorAll(".btn");
for(let i=0; i<allBtn.length; i++) {
    allBtn[i].addEventListener("click", btnPress);
}

function checkAns(idx) { // idx -> user sequence index
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            greenify(); 
            setTimeout(whitify, 50);
            setTimeout(levelUp, 1000); // user has pressed all the sequences in the correct order as of a level is concerned
        }
    }
    else {
        if(highestScore < level - 1)
            highestScore = level-1;
        subHead.innerHTML = `Game over! Your Score is ${level-1}.<br>Your Highest Score = ${highestScore}.<br>Press any key to start again!`; /* \n -> Next Line */
        redify();
        setTimeout(whitify, 150);
        resetGame();
    }
}

function resetGame() {
    mainHead.classList.add("heading-pink");
    gameStart = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function greenify() {
    body.style.backgroundColor = "#90EE90";
}

function redify() {
    body.style.backgroundColor = "#E34234";
}

function whitify() {
    body.style.backgroundColor = "white";
}