class Rect {
    constructor(x, y, width, height, element){
        this.X = x
        this.Y = y 
        this.WIDTH = width
        this.HEIGHT = height
        this.ELEMENT = element

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

    
    collisionRight(listElem,rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10) {
                if(rect.right > rectElem.left && rect.right < rectElem.right){
                    return "right"
                }
            }
        }
    }
    collisionLeft(listElem, rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10) {
                if(rect.left < rectElem.right && rect.left > rectElem.left){
                    return "left"
                }
            }
        }
    }
    collisionTop(listElem, rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.right > rectElem.left + 10 && rect.left < rectElem.right - 10) { 
                if(rect.bottom > rectElem.top && rect.bottom < rectElem.bottom){
                    return "top"
                } 
            }
        }
    }
    collisionBottom(listElem, rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.right > rectElem.left + 10 && rect.left < rectElem.right - 10) { 
                if(rect.top < rectElem.bottom && rect.top > rectElem.top){
                    return "bottom"
                }
            }
        }
    }  
}

export default Rect