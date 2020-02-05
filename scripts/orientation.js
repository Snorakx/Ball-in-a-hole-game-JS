class Orientation {
    constructor() {

    }

    onDeviceOrientationChange(event) {
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
}