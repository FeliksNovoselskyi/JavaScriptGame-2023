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
                    "../images/rock_block.png",
                    undefined,
                    "img"
                )
                listElem.push(block)

            } else if (cell == "2") {
                let block1 = new Sprite(
                    x, y,
                    41, 41,
                    "../images/block.png",
                    undefined,
                    "img"
                )
                listElem.push(block1)

            } else if (cell == "4") {
                let block2 = new Sprite(
                    x, y,
                    41, 41,
                    "../images/block2.png",
                    undefined,
                    "img"
                )
                listElem.push(block2)

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
                    36, 36,
                    "../images/coin.png",
                    undefined,
                    "img"
                );
                listElem.push(coin) // коптерка
            } else if (cell == "f") {
                let fire = new Sprite(
                    x, y,
                    41, 41,
                    "../images/fire_box.png",
                    undefined,
                    "img"
                );
                listElem.push(fire) // коптерка
            } else if (cell == "t") {
                let seller = new Sprite(
                    x, y,
                    41,41,
                    "../images/seller.png",
                    undefined,
                    "img"
                );
                listElem.push(seller); // коптерка
            } else if (cell == "5") {
                let door2 = new Sprite(
                    x, y,
                    41,82,
                    "../images/door2.png",
                    undefined,
                    "img"
                );
                listElem.push(door2); // коптерка
            } else if (cell == "6") {
                let buttonlvl3 = new Sprite(
                    x, y,
                    41,41,
                    "../images/buttonlvl3.png",
                    undefined,
                    "img"
                );
                listElem.push(buttonlvl3); // коптерка
            } else if (cell == "b") {
                let boss = new Sprite(
                    x, y,
                    123,123,
                    "../images/boss_box.png",
                    undefined,
                    "img"
                );
                listElem.push(boss); // коптерка
            } else if (cell == "7") {
                let secretdoor = new Sprite(
                    x, y,
                    41,82,
                    "../images/secret_door.png",
                    undefined,
                    "img"
                );
                listElem.push(secretdoor); // коптерка
            } else if (cell == "e") {
                let e = new Sprite(
                    x, y,
                    41,41,
                    "../images/E_clue.png",
                    undefined,
                    "img"
                );
                listElem.push(e); // коптерка
            } else if (cell == "8") {
                let corner = new Sprite(
                    x, y,
                    41,41,
                    "../images/corner_block.png",
                    undefined,
                    "img"
                );
                listElem.push(corner); // коптерка
            } else if (cell == "9") {
                let startDoor = new Sprite(
                    x, y,
                    41,82,
                    "../images/entrance.png",
                    undefined,
                    "img"
                );
                listElem.push(startDoor); // коптерка
            } else if (cell == "x") {
                let eRight = new Sprite(
                    x, y,
                    41,41,
                    "../images/E_clue_right.png",
                    undefined,
                    "img"
                );
                listElem.push(eRight); // коптерка
            } else if (cell == "s") {
                let spikes = new Sprite(
                    x, y,
                    41,41,
                    "../images/spikes.png",
                    undefined,
                    "img"
                );
                listElem.push(spikes); // коптерка
            } else if (cell == "q") {
                let halfBlock = new Sprite(
                    x, y,
                    41,41,
                    "../images/half_block.png",
                    undefined,
                    "img"
                );
                listElem.push(halfBlock); // коптерка
            } else if (cell == "~") {
                let wholeBlock = new Sprite(
                    x, y,
                    41,41,
                    "../images/whole_block.png",
                    undefined,
                    "img"
                );
                listElem.push(wholeBlock); // коптерка
            } 
        
        
        

            x += 41

        }
        x = 0
        y += 41
    }

    return [listElem, hero]
}

export default createMap