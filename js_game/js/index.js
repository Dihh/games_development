// import { Player } from './player'
// import { GameMap } from './map'

const canvas = document.querySelector('canvas')
canvas.width = innerWidth
canvas.height = innerHeight
let life = 20
context = canvas.getContext('2d')

let player
let map
let wallsElements
let gameOver = false
let monsters = []
let troph
let nivel = 1

player = new Player(10, 20, 'blue', 10, context)
map = new GameMap(10, 10, 300, 300, '#333', context)

function restart() {
    life = 100;
    nivel = 1
    main()
}

function main() {
    document.querySelector("#restart").style.display = "none"
    monsters = []
    player.x = 10;
    player.y = 20;
    wallsElements = new walls(map.height / 10, map.width / 10, 10, context)
    troph = new Troph(map.width, map.height + 10, "orange", 10, context)
    for (i = 0; i <= nivel; i++) {
        const monster = new Monster('red', 10, context)
        monsters.push(monster)
    }
    wallsElements.draw()
    player.draw()
    map.draw()
    troph.draw()
    document.querySelector("#life").innerHTML = life
    document.querySelector("#nivel").innerHTML = nivel
    animate()
}

function animate() {
    animateElement = requestAnimationFrame(animate)
    if (life <= 0) {
        document.querySelector("#restart").style.display = "block"
        cancelAnimationFrame(animateElement)
    }
    context.clearRect(0, 0, canvas.width, canvas.height)
    if (!gameOver) player.draw()
    map.draw()
    monsters.map((el, index) => {
        el.draw(index)
    })
    wallsElements.draw()
    context.beginPath()
    troph.draw()
}
main()