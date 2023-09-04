class Sprite {
    constructor(x, y, width, height , imgPath = undefined, color = undefined, tagName = "div") {
        this.X = x
        this.Y = y 
        this.WIDTH = width
        this.HEIGHT = height
        this.IMG_PATH = imgPath
        this.COLOR = color
        this.ELEMENT = document.createElement(tagName)

        this.ELEMENT.style.width = `${this.WIDTH}px`
        this.ELEMENT.style.height = `${this.HEIGHT}px`
        this.ELEMENT.style.left = `${this.X}px`
        this.ELEMENT.style.top = `${this.Y}px`
        
        if (this.IMG_PATH != undefined) {
            this.ELEMENT.src = this.IMG_PATH
        }

        document.body.append(this.ELEMENT) 

        this.ELEMENT.style.position = 'absolute'
    }
}

export default Sprite