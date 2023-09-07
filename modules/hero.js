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
        this.GRAVITY_SPEED = 2
        this.MOVE_RIGHT = false
        this.MOVE_LEFT = false
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
        let collisionLeft = this.RECT.collisionLeft(listElem,this.RECT.getRect(this.ELEMENT), key)
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
    }
    // gravityJump() {
    //     this.GRAVITY_SPEED += 0.05
    // }
    jump(listElem){
        this.GRAVITY_SPEED = -2
        setTimeout(() => this.GRAVITY_SPEED = 2, 400)
    }
    
    
    
}

export default Hero