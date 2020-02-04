class Controls {
    constructor(draw) {
        draw = new Draw()
    }
    playGame() {
        if (game.state !== 1) {
            game.state = 1;
            gameloop = setInterval(loop, game.speed);
            gamebadloop = setInterval(badloop, game.speed);
            this.changeGameState();
            draw.drawHole();
            draw.drawBadHole();
            draw.drawBall();
        }
    }

    pauseGame() {
        if (game.state === 1) {
            game.state = 2;
            clearInterval(gameloop);
            this.changeGameState();
        }
    }

    stopGame() {
        if (game.state !== 0) {
            game.state = 0;
            clearInterval(gameloop);
            clearGame();
            this.changeGameState();
        }
    }

    changeGameState() {
        var start = document.getElementById("play");
        var pause = document.getElementById("pause");
        var stop = document.getElementById("stop");
        switch (game.state) {
            case 1:
                {
                    start.style.opacity = "0.2";
                    pause.style.opacity = "1.0";
                    stop.style.opacity = "1.0";
                    break;
                }
            case 2:
                {
                    start.style.opacity = "1.0";
                    pause.style.opacity = "0.2";
                    stop.style.opacity = "1.0";
                    break;
                }
            default:
                {
                    start.style.opacity = "1.0";
                    pause.style.opacity = "0.2";
                    stop.style.opacity = "0.2";
                    break;
                }
        }
    }

}