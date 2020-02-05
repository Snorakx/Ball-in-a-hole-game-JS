class GameRules {
    constructor() {


    }

    ballInHole() {
        let hminx = hole.x - hole.radius * hole.difficulty;
        let hminy = hole.y - hole.radius * hole.difficulty;
        let hmaxx = hole.x + hole.radius * hole.difficulty;
        let hmaxy = hole.y + hole.radius * hole.difficulty;

        let bminx = ball.x - ball.radius;
        let bminy = ball.y - ball.radius;
        let bmaxx = ball.x + ball.radius;
        let bmaxy = ball.y + ball.radius;

        return bminx >= hminx && bminy >= hminy && bmaxx <= hmaxx && bmaxy <= hmaxy;
    }

    ballInBadHole() {
        let bhminx = badhole.x - badhole.radius;
        let bhminy = badhole.y - badhole.radius;
        let bhmaxx = badhole.x + badhole.radius;
        let bhmaxy = badhole.y + badhole.radius;

        let bminx = ball.x - ball.radius;
        let bminy = ball.y - ball.radius;
        let bmaxx = ball.x + ball.radius;
        let bmaxy = ball.y + ball.radius;

        return (
            bminx >= bhminx && bminy >= bhminy && bmaxx <= bhmaxx && bmaxy <= bhmaxy
        );
    }

    refreshTimer() {
        document.getElementById("timer").innerHTML = msToTime(game.timepassed);
    }

}