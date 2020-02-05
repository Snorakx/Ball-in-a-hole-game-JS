document.addEventListener("DOMContentLoaded", start);
let TIMER_SPEED = 10; //jak czas w grze zapierdala
let HOLE_DIFFICULTY = 1.3; //jak trudna będzie dziura
let PREFIX_LENGTH = 8; //długość niku w rankingu

let canvas; //canvasik
let context; //kontekst

let ball; //bakłażan
let hole; //picz
let badhole; //bad pepper
let game; //giera
let gameloop; //pętla czy trafiłeś w dobrą dziurę
let ballImage; //fotka bakłażana
let holeImage; //fotka piczy
let badholeImage; // fotka papryki

function start() {
    let spawn = new Spawn();
    let controls = new Controls()
    let orientation = new Orientation()
    let startscreen = new startScreen()

    document.querySelector('#play').addEventListener('click', () => controls.playGame())
    document.querySelector('#pause').addEventListener('click', () => controls.pauseGame())
    document.querySelector('#stop').addEventListener('click', () => controls.stopGame())
    document.querySelector('#go').addEventListener('click', () => startscreen.GoToTheMoon())


    canvas = document.getElementById("canvas"); //canvasik
    context = canvas.getContext("2d"); //kontekst
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 0.7;
    document.getElementById("timer").style.fontSize =
        window.innerHeight * 0.08 + "px";

    spawn.initGame(); //czyści plansze
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
            "Congratulations!\nYou landed on the moon in time " + msToTime(time) + "!!"
        );

    } else if (gamerules.ballInBadHole()) {

        controls.stopGame();
        alert("Oops! You've fallen within the black hole's reach! Mission failed!");

    }
    game.timepassed += game.speed;
    gamerules.refreshTimer();
}


function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    secs = secs < 10 ? "0" + secs : secs;
    mins = mins < 10 ? "0" + mins : mins;
    return mins + ":" + secs + ":" + ms;
}