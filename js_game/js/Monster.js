class Monster {
    constructor(color, maxWidth, context) {
        this.color = color
        this.context = context
        this.maxWidth = maxWidth
        let canPlace = false
        let x
        let y
        do {
            x = ((Math.floor(Math.random() * 30)) * 10) + 10
            y = ((Math.floor(Math.random() * 30)) * 10) + 20
            let xIndex = ((x) / 10) - 1
            let yIndex = ((y) / 10) - 2
            if (wallsElements.walls[yIndex][xIndex] != 'x' && (x > 20 && y > 20)) {
                canPlace = true
            }
        } while (!canPlace)
        this.x = x
        this.y = y
        setInterval(() => {
            this.move(Math.floor(Math.random() * 4))
        }, 500)
    }

    draw(index) {
        if (this.x == player.x && this.y == player.y) {
            monsters.splice(index, 1)
            life -= 20
            document.querySelector("#life").innerHTML = life
        }
        this.context.beginPath()
        this.context.fillStyle = this.color
        let distanceX = this.x - player.x
        let distanceY = this.y - player.y
        if (distanceX < 100 && distanceX > -100 && distanceY < 100 && distanceY > -100) {
            this.context.fillText('\u{1F47B}', this.x, this.y, this.maxWidth)
        }
    }

    move(key) {
        switch (key) {
            case 0:
                if (this.x - 10 >= map.x && wallsElements.walls[(this.y - 20) / 10][(this.x - 20) / 10] != 'x') {
                    this.x -= 10;
                }
                break
            case 1:
                if (this.y - 10 - this.maxWidth >= map.y && wallsElements.walls[(this.y - 30) / 10][(this.x - 10) / 10] != 'x') {
                    this.y -= 10;
                }
                break
            case 2:
                if (this.y + 10 - this.maxWidth <= map.height && wallsElements.walls[(this.y - 10) / 10][(this.x - 10) / 10] != 'x') {
                    this.y += 10;
                }
                break
            case 3:
                if (this.x + 10 <= map.width + 1 && wallsElements.walls[(this.y - 20) / 10][(this.x) / 10] != 'x') {
                    this.x += 10;
                }
                break
        }

    }
}