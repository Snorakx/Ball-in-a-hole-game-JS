class Draw {
    constructor() {


    }
    drawBall() {
        if (ball.x < ball.radius) ball.x = ball.radius;
        else if (ball.x > canvas.width - ball.radius)
            ball.x = canvas.width - ball.radius;
        if (ball.y < ball.radius) ball.y = ball.radius;
        else if (ball.y > canvas.height - ball.radius)
            ball.y = canvas.height - ball.radius;

        context.drawImage(
            ballImage,
            ball.x - ball.radius,
            ball.y - ball.radius,
            ball.size * 2,
            ball.size * 2
        );
    }

    drawHole() {
        context.drawImage(
            holeImage,
            hole.x - hole.radius,
            hole.y - hole.radius,
            hole.size * 1.5,
            hole.size * 1.5
        );
    }

    drawBadHole() {
        context.drawImage(
            badholeImage,
            badhole.x - badhole.radius,
            badhole.y - badhole.radius,
            badhole.size * 2,
            badhole.size * 2
        );
    }
}