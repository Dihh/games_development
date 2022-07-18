class Troph {
    constructor(x, y, color, maxWidth, context) {
        this.x = x;
        this.y = y;
        this.color = color
        this.context = context
        this.maxWidth = maxWidth
    }

    draw() {
        this.context.beginPath()
        this.context.fillStyle = this.color
        this.context.fillText('\u{1F5DD}', this.x, this.y, this.maxWidth)
    }
}