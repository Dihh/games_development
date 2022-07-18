class Player {
    constructor(x, y, color, maxWidth, context) {
        this.x = x;
        this.y = y;
        this.color = color
        this.context = context
        this.maxWidth = maxWidth
        document.addEventListener('keypress', (e) => {
            this.move(e.key)
        })
    }

    draw() {
        this.context.beginPath()
        this.context.fillStyle = this.color
        this.context.fillText('\u{1F466}', this.x, this.y, this.maxWidth)
    }

    move(key) {
        switch (key) {
            case 'a':
                if (this.x - 10 >= map.x && wallsElements.walls[(this.y - 20) / 10][(this.x - 20) / 10] != 'x') {

                    this.x -= 10;
                }
                break
            case 'w':
                if (this.y - 10 - this.maxWidth >= map.y && wallsElements.walls[(this.y - 30) / 10][(this.x - 10) / 10] != 'x') {

                    this.y -= 10;
                }
                break
            case 's':
                if (this.y + 10 - this.maxWidth <= map.height && wallsElements.walls[(this.y - 10) / 10][(this.x - 10) / 10] != 'x') {

                    this.y += 10;
                }
                break
            case 'd':
                if (this.x + 10 <= map.width + 1 && wallsElements.walls[(this.y - 20) / 10][(this.x) / 10] != 'x') {

                    this.x += 10;
                }
                break
        }
        if (life > 0) {
            this.draw()
        }
        if (this.x == troph.x && this.y == troph.y) {
            nivel++
            main()
        }
    }
}