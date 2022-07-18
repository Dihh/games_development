class GameMap {
    constructor(x, y, width, height, color, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.context = context
    }

    draw() {
        this.context.beginPath()
        this.context.fillStyle = this.color
        this.context.rect(this.x, this.y, this.width, this.height)
        this.context.stroke()
    }
}