import Sprite from "/modules/sprite.js";
import Rect from '/modules/rect.js';

class Hero extends Sprite {
    // Создаём метод конструктор класса
    constructor(x, y, width, height, imgPath = undefined, color = undefined, tagName = "div") {
        // Вызываем родительский класс (Наследуем параметры из класса Sprite)
        super(x, y, width, height, imgPath, color, tagName);
        // Задаём ширину и высоту к элементу через стили
        this.ELEMENT.style.width = `${this.WIDTH}px`;
        this.ELEMENT.style.height = `${this.HEIGHT}px`;
        this.ELEMENT.style.left = `${this.X}px`;
        this.ELEMENT.style.top = `${this.Y}px`;

        this.RECT = new Rect(x,y,width,height,this.ELEMENT); // Создаём RECT обьект
        // Создаём условие если изображение задано к элементу, то оно задаётся
        if (this.IMG_PATH != undefined){
            this.ELEMENT.src = this.IMG_PATH;
        };

        // Добавляем элемент в тег body
        document.body.append(this.ELEMENT);
        // Задаём элементу абсолютный стиль позиции
        this.ELEMENT.style.position = 'absolute';
        // Создаём свойствие this.IMG_NUM для анимации персонажа
        // (а точнее это является кадром изображения, изначальная картинка 4, 
        // потому что index изначальной картинки 4)
        this.IMG_NUM = 4;
        // Создаём свойствие this.FIRE_IMG_NUM для анимации огня
        // (изначальный кадр 1, потому что index изначальной картинки 1)
        this.FIRE_IMG_NUM = 1;
        // Задаём скорость гравитации, 
        // это та скорость с которой будет падать персонаж
        this.GRAVITY_SPEED = 2;
        // Создаём флаги движения вправо и влево,
        // которые ответственны за остановку персонажа из-за чего,
        // через что нельзя пройти на карте
        this.MOVE_RIGHT = false;
        this.MOVE_LEFT = false;
        // Счётчик здоровья который соответствует картинке с сердечками персонажа
        this.HP_COUNTER = 10;
        // Флаг отвечающий за смерть персонажа от пули
        this.BULLET_HP_FLAG = false;
    };

    // Метод гравитации
    gravity(listElem){
        let collisionTop = this.RECT.collisionTop(listElem, this.RECT.getRect(this.ELEMENT));
        // let collisionTop = 'top'
        if (collisionTop != 'top' || this.GRAVITY_SPEED < 0){
            if (this.GRAVITY_SPEED < 0 ){
                let collisionBottom = this.RECT.collisionBottom(listElem, this.RECT.getRect(this.ELEMENT));
                if (collisionBottom == 'bottom'){
                    this.GRAVITY_SPEED  = 2;
                };
            };
            // Прибавляем к Y персонажа гравитацию,
            // так как метод работает в цикле то это повторяется
            this.Y += this.GRAVITY_SPEED;
            // Задаём новые координаты в стили элемента
            this.ELEMENT.style.top = `${this.Y}px`;
        };
    };
    

    // Создание метода анимации
    animation(){
        // Если анимация дошла до конца переходим к первому кадру
        if (this.IMG_NUM >= 8){
            // Если условие правдивое - задаём номер картинки на изначальный
            // то есть 4
            this.IMG_NUM = 4;
        };
        // Добавляем по единице в свойство this.IMG_NUM, для смены картинки
        // в анимации
        this.IMG_NUM++;
      
        // Создаём путь к изображению
        this.IMG_PATH = `/images/player/${this.IMG_NUM}.png`;
        // Передаём к элементу изображение которое должно быть у персонажа
        // в данный момент анимации
        this.ELEMENT.src = this.IMG_PATH;
    };

    // Метод движения влево и вправо, который дополнительно обрабатывает
    // коллизию
    moveLoop (listElem) {
        // Создаём переменные коллизии
        let collisionTop = this.RECT.collisionTop(listElem, this.RECT.getRect(this.ELEMENT));
        let collisionRight = this.RECT.collisionRight(listElem, this.RECT.getRect(this.ELEMENT));
        let collisionLeft = this.RECT.collisionLeft(listElem,this.RECT.getRect(this.ELEMENT));
        
        // Условие движения персонажа вправо
        if (this.MOVE_RIGHT && collisionRight != "right") {
            this.ELEMENT.classList.remove("left");
            // Добавляем соответствующий класс движения в соответствующую
            // движения персонажа
            this.ELEMENT.classList.add("right");
            // Добавляем 2 к X персонажа, чтоб он перемещался вправо
            this.X += 2;
            // Задаём новые координаты X персонажа в стилях
            this.ELEMENT.style.left = `${this.X}px`;
            // Вызов метода animation, ответственного за анимацию движения 
            // (в этом случае бег вправо)
            this.animation();
        };

        // Условие движения персонажа влево
        if (this.MOVE_LEFT && collisionLeft != "left") {
            this.ELEMENT.classList.remove("right");
            // Добавляем к списку классов left
            this.ELEMENT.classList.add("left");
            // Отнимаем 2 от X персонажа, чтоб он перемещался влево
            this.X -= 2;
            // Задаём новые координаты X персонажа в стилях
            this.ELEMENT.style.left = `${this.X}px`;
            // Вызов метода animation, ответственного за анимацию движения 
            // (в этом случае бег влево)
            this.animation();
        };
    };

    // Создаём метод который отвечает за движение
    move(key, listElem) {
        // Создаём переменные коллизии
        let collisionTop = this.RECT.collisionTop(listElem, this.RECT.getRect(this.ELEMENT));
        let collisionRight = this.RECT.collisionRight(listElem, this.RECT.getRect(this.ELEMENT), key);
        let collisionLeft = this.RECT.collisionLeft(listElem, this.RECT.getRect(this.ELEMENT), key);
        let collisionBottom = this.RECT.collisionBottom(listElem, this.RECT.getRect(this.ELEMENT));
        // Проверяем кнопку на которую нажал пользователь, 
        // чтоб дать понять персонажу куда двигаться
        if (key == "KeyD" && collisionRight != 'right') {
         // Удаляем класс HTML элемента для движения персонажа вправо
             this.MOVE_RIGHT = true;
        }; 
        // Проверяем на какую кнопку нажал пользователь, чтоб Sprite понимал куда двигаться
        if (key == "KeyA" && collisionLeft != "left" ) {
             this.MOVE_LEFT = true;
        // Удаляем из списка классов класс right, при выполнении условия
        };
        // Условие прыжка
        if (key == 'KeyW' && collisionTop){
             // Вызов метода прыжка
             this.jump(listElem);
        };

        // Условие отнимания сердец, и смерти персонажа
        if (collisionBottom == "death") {
            // Получаем id тега картинки с хп баром
            this.HP_BAR = document.querySelector("#hpbarimg");
            // Отнимаем от счётчика хп единицу при попадании в огонь
            this.HP_COUNTER -= 1;

            // 9 хп
            if (this.HP_COUNTER == 9) {
                this.HP_BAR.src = "./images/hp/9.png";
            };

            // 8 хп
            if (this.HP_COUNTER == 8) {
                this.HP_BAR.src = "./images/hp/8.png";
            };

            // 7 хп
            if (this.HP_COUNTER == 7) {
                this.HP_BAR.src = "./images/hp/7.png";
            };

            // 6 хп
            if (this.HP_COUNTER == 6) {
                this.HP_BAR.src = "./images/hp/6.png";
            };

            // 5 хп
            if (this.HP_COUNTER == 5) {
                this.HP_BAR.src = "./images/hp/5.png";
            };

            // 4 хп
            if (this.HP_COUNTER == 4) {
                this.HP_BAR.src = "./images/hp/4.png";
            };
            
            // 3 хп
            if (this.HP_COUNTER == 3) {
                this.HP_BAR.src = "./images/hp/3.png";
            };

            // 2 хп
            if (this.HP_COUNTER == 2) {
                this.HP_BAR.src = "./images/hp/2.png";
            };

            // 1 хп
            if (this.HP_COUNTER == 1) {
                this.HP_BAR.src = "./images/hp/1.png";
            };

            // 0 хп
            if (this.HP_COUNTER == 0) {
                this.HP_BAR.src = "./images/hp/0.png";
                // Убираем персонажа
                this.ELEMENT.remove();
                // Изменяем текст главного параграфа игры на текст поражения
                document.getElementById("p1game").textContent = "Game over!";
            };
        };

        if (collisionLeft == "pressbuttonlvl3" || collisionRight == "pressbuttonlvl3") {
            
            document.getElementById("arrowlvl3").style.animation = "arrowRightMove 1s ease-out";
        };


    //    if (.style.left >= this.ELEMENT.left) {
            // this.ELEMENT.remove()
    //    }
    };
    // gravityJump() {
    //     this.GRAVITY_SPEED += 0.05
    // }

    // Метод прыжка
    jump(listElem){
        // Ставим значение гравитации на ноль при прыжке
        this.GRAVITY_SPEED = -2;
        // В течении 4 секунд и 25 миллисекунд
        // возвращаем значение гравитации на 2
        setTimeout(() => this.GRAVITY_SPEED = 2, 425);
    };
    
    // Метод анимации огня
    fireAnimation() {
        // Если анимация дошла до конца переходим к первому кадру
        if (this.FIRE_IMG_NUM >= 3){
            // Если условие правдивое - задаём номер картинки на изначальный
            // то есть 1
            this.FIRE_IMG_NUM = 1;
        };

        // Добавляем по единице в свойство this.FIRE_IMG_NUM, для смены картинки
        // в анимации
        this.FIRE_IMG_NUM++;

        // Изменяем изображение каждого огня 3 раза (сколько всего у нас
        // изображений анимации огня)
        document.getElementById("fire-image-animation1").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation1").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation1").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;

        document.getElementById("fire-image-animation2").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation2").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation2").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;

        document.getElementById("fire-image-animation3").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation3").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation3").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;


        document.getElementById("fire-image-animation4").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation4").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation4").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
    
        document.getElementById("fire-image-animation5").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation5").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;
        document.getElementById("fire-image-animation5").src = `/images/fire/fire${this.FIRE_IMG_NUM}.png`;

        // Получаем пули по id
        this.BULLET1_A = document.getElementById("bullet1");
        this.BULLET2_A = document.getElementById("bullet2");

        // Получаем вычесленные стили пуль,
        // делая это с помощью метода getComputedStyle в обьекте window
        this.BULLET1_COMPUTED_STYLE = window.getComputedStyle(this.BULLET1_A);
        this.BULLET2_COMPUTED_STYLE = window.getComputedStyle(this.BULLET2_A);
        // this.ELEMENT_COMPUTED_STYLE = window.getComputedStyle(this.ELEMENT)
        
        // Получаем значения стилей left и top каждой пули
        this.B1_LEFT = this.BULLET1_COMPUTED_STYLE.getPropertyValue('left');
        this.B2_LEFT = this.BULLET2_COMPUTED_STYLE.getPropertyValue('left');
        this.B1_TOP = this.BULLET1_COMPUTED_STYLE.getPropertyValue('top');
        this.B2_TOP = this.BULLET2_COMPUTED_STYLE.getPropertyValue('top');
        
        // this.E_LEFT = this.ELEMENT_COMPUTED_STYLE.getPropertyValue('left')

        // Преобразуем координаты пулей по X из строки в дробь,
        // а потом из дроби в число
        this.BULLET1_LEFT = parseInt(parseFloat(this.B1_LEFT));
        this.BULLET2_LEFT = parseInt(parseFloat(this.B2_LEFT));
        // Преобразуем координаты пулей по Y из строки в дробь,
        this.BULLET1_TOP = parseFloat(this.B1_TOP);
        this.BULLET2_TOP = parseFloat(this.B2_TOP);

        // Блок условий коллизии первой пули с персонажем
        if (this.BULLET1_LEFT == this.X && this.Y == 1396 
            || this.BULLET1_LEFT == this.X - 1 && this.Y == 1396 
            || this.BULLET1_LEFT == this.X + 1 && this.Y == 1396
            || this.BULLET1_LEFT == this.X - 2 && this.Y == 1396
            || this.BULLET1_LEFT == this.X + 2 && this.Y == 1396
            || this.BULLET1_LEFT == this.X - 3 && this.Y == 1396
            || this.BULLET1_LEFT == this.X + 3 && this.Y == 1396
            || this.BULLET1_LEFT == this.X - 4 && this.Y == 1396
            || this.BULLET1_LEFT == this.X + 4 && this.Y == 1396
            || this.BULLET1_LEFT == this.X - 5 && this.Y == 1396
            || this.BULLET1_LEFT == this.X + 5 && this.Y == 1396
            
            || this.BULLET1_LEFT == this.X && this.Y == 1395
            || this.BULLET1_LEFT == this.X && this.Y == 1397
            || this.BULLET1_LEFT == this.X && this.Y == 1394
            || this.BULLET1_LEFT == this.X && this.Y == 1398
            || this.BULLET1_LEFT == this.X && this.Y == 1393
            || this.BULLET1_LEFT == this.X && this.Y == 1399
            || this.BULLET1_LEFT == this.X && this.Y == 1392
            || this.BULLET1_LEFT == this.X && this.Y == 1400
            || this.BULLET1_LEFT == this.X && this.Y == 1391
            || this.BULLET1_LEFT == this.X && this.Y == 1401
            
            || this.BULLET1_LEFT == this.X - 1 && this.Y == 1395
            || this.BULLET1_LEFT == this.X + 1 && this.Y == 1397
            || this.BULLET1_LEFT == this.X - 2 && this.Y == 1394
            || this.BULLET1_LEFT == this.X + 2 && this.Y == 1398
            || this.BULLET1_LEFT == this.X - 3 && this.Y == 1393
            || this.BULLET1_LEFT == this.X + 3 && this.Y == 1399
            || this.BULLET1_LEFT == this.X - 4 && this.Y == 1392
            || this.BULLET1_LEFT == this.X + 4 && this.Y == 1400
            || this.BULLET1_LEFT == this.X - 5 && this.Y == 1391
            || this.BULLET1_LEFT == this.X + 5 && this.Y == 1401) {
            this.BULLET_HP_FLAG = true;
            // Условие смерти персонажа
            if (this.BULLET_HP_FLAG) {
                // Получаем id тега картинки с хп баром
                this.HP_BAR = document.querySelector("#hpbarimg");
                // console.log(this.BULLET_LEFT1);
                // console.log(this.X);
                this.HP_BAR.src = "./images/hp/0.png";
                // Убираем персонажа
                this.ELEMENT.remove();
                // Изменяем текст главного параграфа игры на текст поражения
                document.getElementById("p1game").textContent = "Game over!";
            };
        };

        // Блок условий коллизии второй пули с персонажем
        if (this.BULLET2_LEFT == this.X && this.Y == 1478
            || this.BULLET2_LEFT == this.X - 1 && this.Y == 1478 
            || this.BULLET2_LEFT == this.X + 1 && this.Y == 1478
            || this.BULLET2_LEFT == this.X - 2 && this.Y == 1478
            || this.BULLET2_LEFT == this.X + 2 && this.Y == 1478
            || this.BULLET2_LEFT == this.X - 3 && this.Y == 1478
            || this.BULLET2_LEFT == this.X + 3 && this.Y == 1478
            || this.BULLET2_LEFT == this.X - 4 && this.Y == 1478
            || this.BULLET2_LEFT == this.X + 4 && this.Y == 1478
            || this.BULLET2_LEFT == this.X - 5 && this.Y == 1478
            || this.BULLET2_LEFT == this.X + 5 && this.Y == 1478
            
            || this.BULLET2_LEFT == this.X && this.Y == 1477
            || this.BULLET2_LEFT == this.X && this.Y == 1479
            || this.BULLET2_LEFT == this.X && this.Y == 1476
            || this.BULLET2_LEFT == this.X && this.Y == 1480
            || this.BULLET2_LEFT == this.X && this.Y == 1475
            || this.BULLET2_LEFT == this.X && this.Y == 1481

            || this.BULLET2_LEFT == this.X && this.Y == 1474
            || this.BULLET2_LEFT == this.X && this.Y == 1482
            || this.BULLET2_LEFT == this.X && this.Y == 1473
            || this.BULLET2_LEFT == this.X && this.Y == 1483
            
            || this.BULLET2_LEFT == this.X - 1 && this.Y == 1477
            || this.BULLET2_LEFT == this.X + 1 && this.Y == 1479
            || this.BULLET2_LEFT == this.X - 2 && this.Y == 1476
            || this.BULLET2_LEFT == this.X + 2 && this.Y == 1480
            || this.BULLET2_LEFT == this.X - 3 && this.Y == 1475
            || this.BULLET2_LEFT == this.X + 3 && this.Y == 1481
            || this.BULLET2_LEFT == this.X - 4 && this.Y == 1474
            || this.BULLET2_LEFT == this.X + 4 && this.Y == 1482
            || this.BULLET2_LEFT == this.X - 5 && this.Y == 1473
            || this.BULLET2_LEFT == this.X + 5 && this.Y == 1483) {
            this.BULLET_HP_FLAG = true;
            // Условие смерти персонажа
            if (this.BULLET_HP_FLAG) {
                // Получаем id тега картинки с хп баром
                this.HP_BAR = document.querySelector("#hpbarimg");
                // console.log(this.BULLET_LEFT2);
                // console.log(this.X);
                this.HP_BAR.src = "./images/hp/0.png";
                // Убираем персонажа
                this.ELEMENT.remove();
                // Изменяем текст главного параграфа игры на текст поражения
                document.getElementById("p1game").textContent = "Game over!";
            };
        };
        // console.log(this.BULLET1_LEFT)
    };
    // bulletMove() {

    // }
};

export default Hero;