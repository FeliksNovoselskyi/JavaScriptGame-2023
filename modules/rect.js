class Rect {
    constructor(x, y, width, height, element){
        this.X = x
        this.Y = y 
        this.WIDTH = width
        this.HEIGHT = height
        this.ELEMENT = element
        this.OPEN_DOOR_FLAG = false
        this.NPS1_DEATH_FLAG = false
        this.NPS2_DEATH_FLAG = false
        // 1 = 0
        
        this.RECT = this.getRect(this.ELEMENT)
    };  

    getRect(element){
        const box = element.getBoundingClientRect()
        //Повертаємо данні що до єлемента
        return {
            left: box.left,
            right: box.right,
            bottom: box.bottom,
            top: box.top
        }
    }

    
    collisionRight(listElem, rect, key){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10) {
                if(rect.right > rectElem.left && rect.right < rectElem.right){
                    if (elem.IMG_PATH.includes("nps1") && key == "KeyE") {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet1").style.display = "none"
                        this.NPS1_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("nps2") && key == "KeyE") {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet2").style.display = "none"
                        this.NPS2_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("captive")) {
                        elem.ELEMENT.remove() 
                        this.OPEN_DOOR_FLAG = true
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove()
                        // 1++
                        const score = document.getElementById("counter")
                        score.textContent = parseInt(score.textContent) + 1
                    } else if (elem.IMG_PATH.includes("fire")) {
                        
                    } else {
                        return "right"
                    }
                        
                }
            }
        }
    }
    collisionLeft(listElem, rect, key){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10) {
                if(rect.left < rectElem.right && rect.left > rectElem.left){
                    if (elem.IMG_PATH.includes("nps1") && key == "KeyE") {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet1").style.display = "none"
                        this.NPS1_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("nps2") && key == "KeyE") {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet2").style.display = "none"
                        this.NPS2_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("door1") && this.OPEN_DOOR_FLAG && this.NPS1_DEATH_FLAG && this.NPS2_DEATH_FLAG) {
                        elem.ELEMENT.remove()
                        this.OPEN_DOOR_FLAG = false
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove()   
                        // 1++
                        const score = document.getElementById("counter")
                        score.textContent = parseInt(score.textContent) + 1
                    } else if (elem.IMG_PATH.includes("fire")) {
                        
                    } else {
                        return "left"
                    }
                }
            }
        }
    }
    collisionTop(listElem, rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.right > rectElem.left + 10 && rect.left < rectElem.right - 10) { 
                if(rect.bottom > rectElem.top && rect.bottom < rectElem.bottom){
                    if (elem.IMG_PATH.includes("nps1")) {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet1").style.display = "none"
                        this.NPS1_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("nps2")) {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet2").style.display = "none"
                        this.NPS2_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove()
                        // 1++
                        const score = document.getElementById("counter")
                        score.textContent = parseInt(score.textContent) + 1
                    } else if (elem.IMG_PATH.includes("fire")) {
                        
                    } else {
                        return "top"
                    }  
                } 
            }
        }
    }
    collisionBottom(listElem, rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.right > rectElem.left + 10 && rect.left < rectElem.right - 10) { 
                if(rect.top < rectElem.bottom && rect.top > rectElem.top){
                    if (elem.IMG_PATH.includes("nps1")) {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet1").style.display = "none"
                        this.NPS1_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("nps2")) {
                        elem.ELEMENT.remove()
                        document.getElementById("bullet2").style.display = "none"
                        this.NPS2_DEATH_FLAG = true
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove()
                        // 1++
                        const score = document.getElementById("counter")
                        score.textContent = parseInt(score.textContent) + 1
                    } else if (elem.IMG_PATH.includes("fire")) {
                        
                    } else {
                        return "bottom"
                    }
                }
            }
        }
    }  
}


export default Rect