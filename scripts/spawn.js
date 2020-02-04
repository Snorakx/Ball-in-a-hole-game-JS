class Spawn {
    constructor() {

        }
        // no to czyści plansze i rysuje balle i halle na nowo
        //zeruje czas
        //ale ta game no nwm
        //ma state bo można pausować i zatrzymywać
        // a to pierwsze to klasyczny czas w grze
    clearGame() {
        let spawn = new Spawn()

        game = {
            speed: 1000 / TIMER_SPEED,
            timepassed: 0,
            state: 0
        };
        spawn.initBall();
        spawn.initHole();
        spawn.initBadHole();
        context.clearRect(0, 0, canvas.width, canvas.height);
        refreshTimer();
    }
    initGame() {
        this.clearGame()
    }
    initBall() {
        ball = {
            size: ballSize(),
            radius: ballSize() / 2,
            x: ballSize() / 2 + Math.random() * (canvas.width - ballSize() / 2),
            y: ballSize() / 2 + Math.random() * (canvas.height - ballSize() / 2)
        };

        ballImage = new Image();
        ballImage.src = "img/ball.png";
    }
    initHole() {
        hole = {
            size: ballSize() * 1.3,
            radius: (ballSize() * 1.3) / 2,
            x: ballSize() + Math.random() * (canvas.width - ballSize()),
            y: ballSize() + Math.random() * (canvas.height - ballSize()),
            difficulty: HOLE_DIFFICULTY
        };

        holeImage = new Image();
        holeImage.src = "img/hole.png";
    }

    initBadHole() {
        badhole = {
            size: ballSize(),
            radius: ballSize(),
            x: ballSize() + Math.random() * (canvas.width - ballSize()),
            y: ballSize() + Math.random() * (canvas.height - ballSize())
        };

        badholeImage = new Image();
        badholeImage.src = "img/badhole.png";
    }

}