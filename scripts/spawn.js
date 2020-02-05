class Spawn {
    constructor() {
            this.gamerules = new GameRules()

        }
        // no to czyści plansze i rysuje balle i halle na nowo
        //zeruje czas
        //ale ta game no nwm
        //ma state bo można pausować i zatrzymywać
        // a to pierwsze to klasyczny czas w grze
    clearGame() {


        game = {
            speed: 1000 / TIMER_SPEED,
            timepassed: 0,
            state: 0
        };
        this.initBall();
        this.initHole();
        this.initBadHole();
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.gamerules.refreshTimer();
    }
    initGame() {
        this.clearGame()
    }
    ballSize() {
        return canvas.width > canvas.height ? canvas.height / 10 : canvas.width / 10;
    }
    initBall() {
        ball = {
            size: this.ballSize(),
            radius: this.ballSize() / 2,
            x: this.ballSize() / 2 + Math.random() * (canvas.width - this.ballSize() / 2),
            y: this.ballSize() / 2 + Math.random() * (canvas.height - this.ballSize() / 2)
        };

        ballImage = new Image();
        ballImage.src = "img/ball.png";
    }
    initHole() {
        hole = {
            size: this.ballSize() * 1.3,
            radius: (this.ballSize() * 1.3) / 2,
            x: this.ballSize() + Math.random() * (canvas.width - this.ballSize() / 2),
            y: this.ballSize() + Math.random() * (canvas.height - this.ballSize() / 2),
            difficulty: HOLE_DIFFICULTY
        };

        holeImage = new Image();
        holeImage.src = "img/hole.png";
    }

    initBadHole() {
        badhole = {
            size: this.ballSize(),
            radius: this.ballSize(),
            x: this.ballSize() + Math.random() * (canvas.width - this.ballSize() / 2),
            y: this.ballSize() + Math.random() * (canvas.height - this.ballSize() / 2)
        };

        badholeImage = new Image();
        badholeImage.src = "img/badhole.png";
    }

}