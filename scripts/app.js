document.addEventListener("DOMContentLoaded", start);
let TIMER_SPEED = 10;
let HOLE_DIFFICULTY = 1.3;
let canvas;
let context;
let ball;
let hole;
let badhole;
let game;
let gameloop;
let ballImage;
let holeImage;
let badholeImage;


function start() {
    let spawn = new Spawn();
    let controls = new Controls()
    let orientation = new Orientation()
    let startscreen = new startScreen()

    document.querySelector('#play').addEventListener('click', () => controls.playGame())
    document.querySelector('#pause').addEventListener('click', () => controls.pauseGame())
    document.querySelector('#stop').addEventListener('click', () => controls.stopGame())
    document.querySelector('#go').addEventListener('click', () => startscreen.GoToTheMoon())


    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;
    document.getElementById("timer").style.fontSize =
        window.innerHeight * 0.08 + "px";

    spawn.initGame();
    spawn.initHole();
    spawn.initBadHole();
    spawn.initBall();
    controls.changeGameState();

    window.addEventListener("deviceorientation", () => orientation.onDeviceOrientationChange(event), false);

}

function loop() {
    let controls = new Controls()
    let gamerules = new GameRules()


    if (gamerules.ballInHole()) {
        var time = game.timepassed;
        controls.stopGame();
        alert(
            "Congratulations!\nYou landed on the moon in time " + gamerules.msToTime(time) + "!!"
        );

    } else if (gamerules.ballInBadHole()) {

        controls.stopGame();
        alert("Oops! You've fallen within the black hole's reach! Mission failed!");

    }
    game.timepassed += game.speed;
    gamerules.refreshTimer();
}
