document.addEventListener("DOMContentLoaded", start);
let TIMER_SPEED = 10; //jak czas w grze zapierdala
let HOLE_DIFFICULTY = 1.3; //jak trudna będzie dziura
let MAX_HIGHSCORES = 20; //max wynik
let PREFIX_LENGTH = 8; //długość niku w rankingu

let canvas; //canvasik
let context; //kontekst

let ball; //bakłażan
let hole; //picz
let badhole; //bad pepper
let game; //giera
let gameloop; //pętla czy trafiłeś w dobrą dziurę
let gamebadloop; // chuj wie czy to potrzebne
let ballImage; //fotka bakłażana
let holeImage; //fotka piczy
let badholeImage; // fotka papryki

function start() {
    let spawn = new Spawn();
    let controls = new Controls()

    document.querySelector('#play').addEventListener('click', () => controls.playGame())

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

    window.addEventListener(
        "deviceorientation",
        onDeviceOrientationChange,
        false
    );
}

function onDeviceOrientationChange(event) {
    let draw = new Draw()
    if (game.state === 1) {
        var shiftX = event.gamma;
        var shiftY = event.beta;
        switch (window.orientation) {
            case 180:
                shiftX *= -1;
                shiftY *= -1;
                break;
            case 90:
                var tmp = shiftX;
                shiftX = shiftY;
                shiftY = -tmp;
                break;
            case -90:
                var tmp = shiftX;
                shiftX = -shiftY;
                shiftY = tmp;
                break;
        }

        ball.x += shiftX;
        ball.y += shiftY;

        context.clearRect(0, 0, canvas.width, canvas.height);
        draw.drawHole();
        draw.drawBadHole();
        draw.drawBall();
    }
}

function ballSize() {
    return canvas.width > canvas.height ? canvas.height / 10 : canvas.width / 10;
}

function loop() {
    if (ballInHole()) {
        var time = game.timepassed;
        stopGame();
        var name = prompt(
            "Congratulations!\nYou have finished the game in " +
            msToTime(time) +
            "!\n\nPlease type in your name:"
        );
        if (name.length > 0) {
            var chars =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var prefix = "";
            for (var i = 0; i < PREFIX_LENGTH; i++)
                prefix += chars.charAt(Math.floor(Math.random() * chars.length));

            setCookie(prefix + name, "" + time, 365 * 100);
        }
    }

    game.timepassed += game.speed;
    refreshTimer();
}

function badloop() {
    if (ballInBadHole()) {
        stopGame();
        alert("GAMEOVER!");
        refreshTimer();
    }
}

function ballInHole() {
    var hminx = hole.x - hole.radius * hole.difficulty;
    var hminy = hole.y - hole.radius * hole.difficulty;
    var hmaxx = hole.x + hole.radius * hole.difficulty;
    var hmaxy = hole.y + hole.radius * hole.difficulty;

    var bminx = ball.x - ball.radius;
    var bminy = ball.y - ball.radius;
    var bmaxx = ball.x + ball.radius;
    var bmaxy = ball.y + ball.radius;

    return bminx >= hminx && bminy >= hminy && bmaxx <= hmaxx && bmaxy <= hmaxy;
}

function ballInBadHole() {
    var bhminx = badhole.x - badhole.radius;
    var bhminy = badhole.y - badhole.radius;
    var bhmaxx = badhole.x + badhole.radius;
    var bhmaxy = badhole.y + badhole.radius;

    var bminx = ball.x - ball.radius;
    var bminy = ball.y - ball.radius;
    var bmaxx = ball.x + ball.radius;
    var bmaxy = ball.y + ball.radius;

    return (
        bminx >= bhminx && bminy >= bhminy && bmaxx <= bhmaxx && bmaxy <= bhmaxy
    );
}

function refreshTimer() {
    document.getElementById("timer").innerHTML = msToTime(game.timepassed);
}

function getBounds() {
    return {
        minx: ball.x - ball.radius,
        miny: ball.y - ball.radius,
        maxx: ball.x + ball.radius,
        maxy: ball.y + ball.radius
    };
}

function hitTest(x, y) {
    var bounds = getBounds();
    return (
        x >= bounds.minx && x <= bounds.maxx && y >= bounds.miny && y <= bounds.maxy
    );
}



function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    secs = secs < 10 ? "0" + secs : secs;
    mins = mins < 10 ? "0" + mins : mins;
    ms = pad(Math.floor(ms), 3);
    return mins + ":" + secs + ":" + ms;
}

function pad(n, width) {
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join("0") + n;
}

function padAfter(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : n + new Array(width - n.length + 1).join(z);
}

function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value =
        escape(value) + (exdays == null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

function getHighscores() {
    var cookies = {};
    if (document.cookie && document.cookie != "") {
        var split = document.cookie.split(";");
        for (var i = 0; i < split.length; i++) {
            var name_value = split[i].split("=");
            name_value[0] = name_value[0].replace(/^ /, "");
            cookies[decodeURIComponent(name_value[0])] = decodeURIComponent(
                name_value[1]
            );
        }
    }
    return cookies;
}

function highscores() {
    var highscores = getHighscores();

    var highscoresMap = new Object();
    var rank = 1;
    for (var index in highscores) {
        if (highscores[index] > 0) {
            highscoresMap[index] = highscores[index];
        }

        if (rank === MAX_HIGHSCORES) break;
        rank++;
    }

    var highscoreMapKeys = Object.keys(highscoresMap);
    highscoreMapKeys.sort(function(a, b) {
        return parseInt(highscoresMap[a]) < parseInt(highscoresMap[b]) ? -1 : 1;
    });

    var output = "";
    var line = "";
    rank = 1;
    highscoreMapKeys.forEach(function(key) {
        var name = key;
        name = name.substring(PREFIX_LENGTH);

        line = rank + ". " + name + " (" + msToTime(highscoresMap[key]) + ")";
        line = padAfter(line, 32, " ");
        output += line + "\n";
        rank++;
    });
    if (output.length > 0) {
        output = "Highscores:\n--------------------------------\n" + output;
        alert(output);
    } else {
        alert("There are no highscores yet!");
    }
}