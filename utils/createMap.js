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

            } else if (cell == "2") {
                let wholeBlock = new Sprite(
                    x, y,
                    41, 41,
                    "../images/whole_block.png",
                    undefined,
                    "img"
                )
                listElem.push(wholeBlock)

            } else if (cell == "h") {
                hero = new Hero(
                    x, y,
                    41, 41,
                    "../images/player/1.png",
                    undefined,
                    "img"
                )              
            } else if (cell == "d") {
                let door = new Sprite(
                    x, y,
                    41, 82,
                    "../images/door1.png",
                    undefined,
                    "img"
                )
                listElem.push(door)
            } else if (cell == "n") {
                let nps1 = new Sprite(
                    x, y,
                    41, 41,
                    "../images/nps1/nps1_1.png",
                    undefined,
                    "img"  
                );
                listElem.push(nps1)
            } else if (cell == "m") {
                let nps2 = new Sprite(
                    x, y,
                    41, 41,
                    "../images/nps2/nps2_1.png",
                    undefined,
                    "img"  
                );
                listElem.push(nps2)
            } else if (cell == "c") {
                let captive = new Sprite(
                    x, y,
                    41, 41,
                    "../images/captive.png",
                    undefined,
                    "img"  
                );
                listElem.push(captive) // коптерка
            } else if (cell == "3") {
                let coin = new Sprite(
                    x, y,
                    41, 41,
                    "../images/coin.png",
                    undefined,
                    "img"  
                );
                listElem.push(coin) // коптерка
            } else if (cell == "f") {
                let fire = new Sprite(
                    x, y,
                    41, 41,
                    "../images/fire/fire1.png",
                    undefined,
                    "img"  
                );
                listElem.push(fire) // коптерка
            } 
            
            
            x += 41

        }
        x = 0
        y += 41
    }

    return [listElem, hero]
}

export default createMap