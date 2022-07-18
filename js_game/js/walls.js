class walls {
    constructor(wallsLines, wallsColumns, maxWidth, context) {
        this.wallsColumns = wallsColumns
        this.wallsLines = wallsLines
        this.context = context
        this.maxWidth = maxWidth
        this.walls = []

        for (let i = 0; i < this.wallsLines; i++) {
            this.walls[i] = []
            for (let j = 0; j < this.wallsColumns; j++) {
                this.walls[i][j] = ""
            }
        }

        for (let i = 0; i < this.wallsLines; i++) {
            this.walls[i] = []
            for (let j = 0; j < this.wallsColumns; j++) {
                let adjacencias = 0
                if (i - 1 < 0) {
                    adjacencias++;
                }
                if (j - 1 < 0) {
                    adjacencias++;
                }
                if (i + 1 >= this.wallsLines) {
                    adjacencias++;
                }
                if (j + 1 >= this.wallsColumns) {
                    adjacencias++;
                }
                if (i - 1 >= 0 && i + 1 < this.wallsLines && j - 1 >= 0 && j + 1 < this.wallsColumns) {
                    if (this.walls[i - 1][j] == "x") {
                        adjacencias++;
                    }
                    if (this.walls[i + 1][j] == "x") {
                        adjacencias++;
                    }
                    if (this.walls[i][j - 1] == "x") {
                        adjacencias++;
                    }
                    if (this.walls[i][j + 1] == "x") {
                        adjacencias++;
                    }
                    if (this.walls[i - 1][j + 1] == "x" && (i == 1 || j == this.wallsColumns - 2)) {
                        adjacencias++;
                    }
                    this.walls[i][j] = Math.random() < .5 && adjacencias < 1 ? "x" : ""
                    continue
                }
                this.walls[i][j] = Math.random() < .5 && adjacencias < 2 ? "x" : ""
                if (i == 0 && (j < 3 || j > this.wallsColumns - 4)) {
                    this.walls[i][j] = ""
                }
                if (j == 0 && (i < 3 || i > this.wallsLines - 4)) {
                    this.walls[i][j] = ""
                }
                if (i == this.wallsLines - 1 && (j < 3 || j > this.wallsColumns - 4)) {
                    this.walls[i][j] = ""
                }
                if (j == this.wallsColumns - 1 && (i < 3 || i > this.wallsColumns - 4)) {
                    this.walls[i][j] = ""
                }
            }
        }
        // this.walls[10][10] = "P"

    }

    draw() {
        this.context.fillStyle = "#333"
        this.walls.map((el, elIndex) => {
            el.map((e, eIndex) => {
                this.context.beginPath()
                let distanceX = (eIndex + 1) * 10 - player.x
                let distanceY = (elIndex + 1) * 10 + 10 - player.y
                if (e == 'x' && distanceX < 50 && distanceX > -50 && distanceY < 50 && distanceY > -50) {
                    this.context.fillStyle = "#333333AA"
                    this.context.fillRect((eIndex + 1) * 10, ((elIndex + 1) * 10), 10, 10)
                    // this.context.fillText('X', (eIndex + 1) * 10, ((elIndex + 1) * 10 + 10), this.maxWidth)
                }
                if (distanceX > 40 || distanceX < -40 || distanceY > 40 || distanceY < -40) {
                    this.context.fillStyle = "#33333370"
                    this.context.fillRect((eIndex + 1) * 10, ((elIndex + 1) * 10), 10, 10)
                    //this.context.fillText('0', (eIndex + 1) * 10, ((elIndex + 1) * 10 + 10), this.maxWidth)
                }
            })
        })

    }
} 