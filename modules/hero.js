import Sprite from "/modules/sprite.js";
import Rect from '/modules/rect.js';

class Hero extends Sprite {
    // Створюємо метод конструктор классу
    constructor(x, y, width, height, imgPath = undefined, color = undefined, tagName = "div") {
        // Визиває батьківський конструктор (Нащадкуємо параметри з класу Sprite)
        super(x, y, width, height, imgPath, color, tagName)
        // Задаємо ширину та висоту до елемента через стилі
        this.ELEMENT.style.width = `${this.WIDTH}px`;
        this.ELEMENT.style.height = `${this.HEIGHT}px`;
        this.ELEMENT.style.left = `${this.X}px`;
        this.ELEMENT.style.top = `${this.Y}px`;

        this.RECT = new Rect(x,y,width,height,this.ELEMENT);
        // Створюємо умову якщо зображнння задано то додаемо його до елемента
        if (this.IMG_PATH != undefined){
            this.ELEMENT.src = this.IMG_PATH
        }
        // Додаємо елемент до body
        document.body.append(this.ELEMENT)
        // Задаемо елементу абсолютний стиль позиції
        this.ELEMENT.style.position = 'absolute'
        // Створюємо властивість IMG_NUM і робимо ми його для анімації
        // (а точніше це є кадром зображення, стандартним буде 4, тому що перший index кадру бігу є 4)
        this.IMG_NUM = 4 
        this.FIRE_IMG_NUM = 1 
        this.GRAVITY_SPEED = 2
        this.MOVE_RIGHT = false
        this.MOVE_LEFT = false
        this.HP_COUNTER = 10
        this.BULLET_HP_FLAG = false

    }
    gravity(listElem){
        let collisionTop = this.RECT.collisionTop(listElem, this.RECT.getRect(this.ELEMENT))
        // let collisionTop = 'top'
        if (collisionTop != 'top' || this.GRAVITY_SPEED < 0){
            if (this.GRAVITY_SPEED < 0 ){
                let collisionBottom = this.RECT.collisionBottom(listElem, this.RECT.getRect(this.ELEMENT))
                if (collisionBottom == 'bottom'){
                    this.GRAVITY_SPEED  = 2
                }
            }
            this.Y += this.GRAVITY_SPEED
            this.ELEMENT.style.top = `${this.Y}px`;
        }
    }
    

    // Створення функціі що відповідає за анімацію
    animation(){
        // Якщо анаміція дійшла до свого останнього кадру
        // перйти до першого кадру
        if (this.IMG_NUM >= 8){
            // якщо умова правдива - задаємо картинку за умовчанням тобто під номером 4
            this.IMG_NUM = 4
        }
        // Додаємо по 1-ці до IMG_NUM, для того, щоб змінювались кадри спрайту.
        this.IMG_NUM++;
      
        // створюємо шлях до зображення
        this.IMG_PATH = `/images/player/${this.IMG_NUM}.png`
        //  Передаємо до елементу зображення яке має бути
        //        у героя у даний момент анімації 
        this.ELEMENT.src = this.IMG_PATH

    }
    moveLoop (listElem) {
        let collisionTop = this.RECT.collisionTop(listElem, this.RECT.getRect(this.ELEMENT))
        let collisionRight = this.RECT.collisionRight(listElem, this.RECT.getRect(this.ELEMENT))
        let collisionLeft = this.RECT.collisionLeft(listElem,this.RECT.getRect(this.ELEMENT))
        
        if (this.MOVE_RIGHT && collisionRight != "right") {
            this.ELEMENT.classList.remove("left")
            // додаємо клас HTML-елемента щоб він відповідав напрямку руху героя вправо  
            this.ELEMENT.classList.add("right")
            // задаемо X + 3 щоб персонаж рухався в право
            this.X += 2;
            // Задаемо нові кординати X
            this.ELEMENT.style.left = `${this.X}px`;
            // Виклик метод animation і таким чином ми побачимо анімацію бігу 
            // (у нашому випадку буде анімація біг вправо)
            this.animation()
        }    
            
        if (this.MOVE_LEFT && collisionLeft != "left") {
            this.ELEMENT.classList.remove("right")
            //  додаємо до списку класів клас left
            this.ELEMENT.classList.add("left")
            //  Віднімаємо від Х 3 пікселя для руху вліво.
            this.X -= 2;
            //  задаємо координати по X
            this.ELEMENT.style.left = `${this.X}px`;
            //  Визиваємо метод анімації
            this.animation()
        }
    }

    // створюємо метод який відповідае за рух
    move(key, listElem) {
        let collisionTop = this.RECT.collisionTop(listElem, this.RECT.getRect(this.ELEMENT))
        let collisionRight = this.RECT.collisionRight(listElem, this.RECT.getRect(this.ELEMENT), key)
        let collisionLeft = this.RECT.collisionLeft(listElem, this.RECT.getRect(this.ELEMENT), key)
        let collisionBottom = this.RECT.collisionBottom(listElem, this.RECT.getRect(this.ELEMENT))
        // Перевіряємо на яку кнопку користувач натиснув для того, щоб герой розумів куди бігти
       if (key == "KeyD" && collisionRight != 'right') {
        // Видаляємо клас HTML-елемента для руху героя вправо
            this.MOVE_RIGHT = true
       }; 
// Перевіряємо на яку копку нажав користувач таким чином Спрайт розуміє куди бігти 
       if (key == "KeyA" && collisionLeft != "left" ) {
            this.MOVE_LEFT = true
        //  видаляємо з списку класів клас right при виконанні умови
       };
       if (key == 'KeyW' && collisionTop){
            this.jump(listElem)
       }

       if (collisionBottom == "death") {
            this.HP_BAR = document.querySelector("#hpbarimg")
            this.HP_COUNTER -= 1
            if (this.HP_COUNTER == 9) {
                this.HP_BAR.src = "./images/hp/9.png"
            }
            
            if (this.HP_COUNTER == 8) {
                this.HP_BAR.src = "./images/hp/8.png"
            }

            if (this.HP_COUNTER == 7) {
                this.HP_BAR.src = "./images/hp/7.png"
            }

            if (this.HP_COUNTER == 6) {
                this.HP_BAR.src = "./images/hp/6.png"
            }

            if (this.HP_COUNTER == 5) {
                this.HP_BAR.src = "./images/hp/5.png"
            }

            if (this.HP_COUNTER == 4) {
                this.HP_BAR.src = "./images/hp/4.png"
            }

            if (this.HP_COUNTER == 3) {
                this.HP_BAR.src = "./images/hp/3.png"
            }

            if (this.HP_COUNTER == 2) {
                this.HP_BAR.src = "./images/hp/2.png"
            }

            if (this.HP_COUNTER == 1) {
                this.HP_BAR.src = "./images/hp/1.png"
            }

            if (this.HP_COUNTER == 0) {
                this.HP_BAR.src = "./images/hp/0.png"
                this.ELEMENT.remove()
                document.getElementById("p1game").textContent = "Game over!"
            }
        }


    //    if (.style.left >= this.ELEMENT.left) {
            // this.ELEMENT.remove()
    //    }
    }
    // gravityJump() {
    //     this.GRAVITY_SPEED += 0.05
    // }
    jump(listElem){
        this.GRAVITY_SPEED = -2
        setTimeout(() => this.GRAVITY_SPEED = 2, 425)
    }
    
    fireAnimation() {
        if (this.FIRE_IMG_NUM >= 3){
            // якщо умова правдива - задаємо картинку за умовчанням тобто під номером 4
            this.FIRE_IMG_NUM = 1
        }

        this.FIRE_IMG_NUM++;

        document.getElementById("fire-image-animation1").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation1").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation1").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`

        document.getElementById("fire-image-animation2").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation2").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation2").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`

        document.getElementById("fire-image-animation3").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation3").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation3").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`


        document.getElementById("fire-image-animation4").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation4").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation4").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
    
        document.getElementById("fire-image-animation5").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation5").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`
        document.getElementById("fire-image-animation5").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`

        this.BULLET1_A = document.getElementById("bullet1")
        this.BULLET2_A = document.getElementById("bullet2")

        this.BULLET1_COMPUTED_STYLE = window.getComputedStyle(this.BULLET1_A)
        this.BULLET2_COMPUTED_STYLE = window.getComputedStyle(this.BULLET2_A)
        // this.ELEMENT_COMPUTED_STYLE = window.getComputedStyle(this.ELEMENT)
        
        this.B1_LEFT = this.BULLET1_COMPUTED_STYLE.getPropertyValue('left')
        this.B2_LEFT = this.BULLET2_COMPUTED_STYLE.getPropertyValue('left')
        this.B1_TOP = this.BULLET1_COMPUTED_STYLE.getPropertyValue('top')
        this.B2_TOP = this.BULLET2_COMPUTED_STYLE.getPropertyValue('top')
        
        // this.E_LEFT = this.ELEMENT_COMPUTED_STYLE.getPropertyValue('left')

        this.BULLET1_LEFT = parseInt(parseFloat(this.B1_LEFT))
        this.BULLET2_LEFT = parseInt(parseFloat(this.B2_LEFT))
        this.BULLET1_TOP = parseFloat(this.B1_TOP)
        this.BULLET2_TOP = parseFloat(this.B2_TOP)

        if (this.BULLET1_LEFT == this.X && this.Y == 1396 || this.BULLET1_LEFT == this.X - 1 && this.Y == 1396 || this.BULLET1_LEFT == this.X + 1 && this.Y == 1396) {
            this.BULLET_HP_FLAG = true
            if (this.BULLET_HP_FLAG) {
                this.HP_BAR = document.querySelector("#hpbarimg")
                this.ELEMENT.remove()
                console.log(this.BULLET_LEFT1)
                console.log(this.X)
                this.HP_BAR.src = "./images/hp/0.png"
                this.ELEMENT.remove()
                document.getElementById("p1game").textContent = "Game over!"
            }
        }

        if (this.BULLET2_LEFT == this.X && this.Y == 1478 || this.BULLET2_LEFT == this.X - 1 && this.Y == 1478 || this.BULLET2_LEFT == this.X + 1 && this.Y == 1478) {
            this.BULLET_HP_FLAG = true
            if (this.BULLET_HP_FLAG) {
                this.HP_BAR = document.querySelector("#hpbarimg")
                this.ELEMENT.remove()
                console.log(this.BULLET_LEFT2)
                console.log(this.X)
                this.HP_BAR.src = "./images/hp/0.png"
                this.ELEMENT.remove()
                document.getElementById("p1game").textContent = "Game over!"
            }
        }

        // console.log(this.BULLET1_LEFT)
    } 
    
    // bulletMove() {

    // }
}

export default Hero