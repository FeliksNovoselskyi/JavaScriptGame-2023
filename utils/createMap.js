import Sprite from "../modules/sprite.js"
import Hero from "../modules/hero.js"

function createMap(listMap) {
    const listElem = new Array()
    
    let x = 0
    let y = 0

    let hero

    for (let row of listMap) {
        for (let cell of row) {
            if (cell == "1") {
                let block = new Sprite(
                    x, y,
                    41, 41,
                    "../images/block.png",
                    undefined,
                    "img"
                )
                listElem.push(block)

            } else if (cell == "h") {
                hero = new Hero(
                    x, y,
                    41, 41,
                    "../images/player/1.png",
                    undefined,
                    "img"
                )              
            };
            x += 41

        }
        x = 0
        y += 41
    }

    return [listElem, hero]
}

export default createMap