class Rect {
    constructor(x, y, width, height, element){
        this.X = x;
        this.Y = y;
        this.WIDTH = width;
        this.HEIGHT = height;
        this.ELEMENT = element;
        this.OPEN_DOOR_FLAG = false; // Флаг открытия двери на 2-ой уровень
        this.NPS1_DEATH_FLAG = false; // Флаг смерти первого NPS
        this.NPS2_DEATH_FLAG = false; // Флаг смерти второго NPS
        this.LEVEL2_FLAG = false; //
        this.FULL_SCORE_RIGHT = false; //
        this.FULL_SCORE_LEFT = false; //
        this.FULL_SCORE_TOP = false; //
        this.FULL_SCORE_BOTTOM = false; //
        this.BUTTONLVL3_RIGHT = false; //
        this.BOSS_DEATH_FLAG1 = false;
        this.BOSS_DEATH_FLAG2 = false;
        this.SECRET_DOOR_FLAG = false;
        
        this.COIN_SOUND = new Audio("sounds/coin.wav");
        this.DOOR_OPEN_SOUND = new Audio("sounds/door_open.wav");
        this.HAIRPINS_BUYING_SOUND = new Audio("sounds/hairpin_buying.wav");
        this.BOSS_DEATH_SOUND = new Audio("sounds/boss_death.wav");
        
        // 1 = 0
        
        this.RECT = this.getRect(this.ELEMENT);
    };  

    // Метод который получает информации об элементе
    getRect(element){
        const box = element.getBoundingClientRect();
        // Возвращаем данные которые касаются элемента
        return {
            left: box.left,
            right: box.right,
            bottom: box.bottom,
            top: box.top
        };
    };

    scroll(x, y){
        window.scrollTo({
            top: y,
            left: x,
            behavior: "smooth",
        });
    };

    // Проверка коллизии с правой стороны от персонажа
    collisionRight(listElem, rect, key){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT);
            if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10) {
                if(rect.right > rectElem.left && rect.right < rectElem.right){
                    const score = document.getElementById("counter");
                    // Условие убийства первого NPS (NPS с левой стороны)
                    if (elem.IMG_PATH.includes("nps1") && key == "KeyE") {
                        // Убираем самого NPS
                        elem.ELEMENT.remove();
                        // Убираем пулю первого NPS
                        document.getElementById("bullet1").style.display = "none";
                        document.getElementById("bullet1").style.animation = "none";
                        document.getElementById("bullet1").style.left = "0px";
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2") && key == "KeyE") {
                        elem.ELEMENT.remove();
                        // Убираем пулю второго NPS
                        document.getElementById("bullet2").style.display = "none";
                        document.getElementById("bullet2").style.animation = "none";
                        document.getElementById("bullet2").style.left = "0px";
                        this.NPS2_DEATH_FLAG = true;

                    // Условие освобождения пленника,
                    // и смена флага открытия двери на 2-ой уровень
                    } else if (elem.IMG_PATH.includes("captive")) {
                        elem.ELEMENT.remove();
                        this.OPEN_DOOR_FLAG = true;
                    
                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();

                        this.COIN_SOUND.play();
                        // 1++

                        // Получаем сам счётчик из HTML
                        const score = document.getElementById("counter");
                        // Прибавляем к счётчику 1-у
                        score.textContent = parseInt(score.textContent) + 1;
                        // console.log(parseInt(score.textContent))

                    } else if (elem.IMG_PATH.includes("buttonlvl3")) {
                        if (key == "KeyE"){
                            this.BOSS_DEATH_FLAG1 = true;
                            return "pressbuttonlvl3";
                        };
                    //
                    } else if (elem.IMG_PATH.includes("seller") && key == "KeyE") {
                        if (document.getElementById("counter").textContent == 3) {
                            this.OPEN_DOOR_FLAG = true;
                            this.LEVEL2_FLAG = true;
                            this.HAIRPINS_BUYING_SOUND.play()
                            document.getElementById("counter").textContent = 0;
                            document.getElementById("hairpin-counter").textContent = 3;
                            document.getElementById("modal-window-3").style.display = "block";
                        };
                    //
                    } else if (elem.IMG_PATH.includes("secret_door")) {
                        elem.ELEMENT.src = "./images/buttonlvl3_right.png";
                        elem.ELEMENT.style.height = "41px";
                        elem.ELEMENT.style.top = "165px";
                        this.BUTTONLVL3_RIGHT = true;
                        if (this.SECRET_DOOR_FLAG != true) {
                            this.DOOR_OPEN_SOUND.play();
                            this.SECRET_DOOR_FLAG = true;
                        };
                        if (this.BUTTONLVL3_RIGHT && key == "KeyE") {
                            if (document.getElementById("fire1").style.marginTop != "481px") {
                                this.BOSS_DEATH_FLAG2 = true;
                                if (this.BOSS_DEATH_FLAG1 && this.BOSS_DEATH_FLAG2) {
                                    document.getElementById("fire1").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire2").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire3").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire4").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire5").style.animation = "fireGoDown 2s ease-out";

                                    
                                    setTimeout(() => {
                                        document.getElementById("fire1").style.marginLeft = "360px";


                                        document.getElementById("fire1").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire2").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire3").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire4").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire5").style.animation = "fireGoUp 2s ease-out";

                                        document.getElementById("fire1").style.marginTop = "481px";
                                        document.getElementById("fire2").style.marginTop = "481px";
                                        document.getElementById("fire3").style.marginTop = "481px";
                                        document.getElementById("fire4").style.marginTop = "481px";
                                        document.getElementById("fire5").style.marginTop = "481px";

                                        this.BUTTONLVL3_RIGHT = false;
                                        setTimeout(() => {
                                            // console.log(21222222)
                                            this.MAIN_BOSS_IMG = document.getElementById("boss");

                                            this.MAIN_BOSS_IMG.style.backgroundImage = "url(images/boss_die.png)";
                                            this.MAIN_BOSS_IMG.style.animation = "none";

                                            document.getElementById("p_story").textContent = `
                                            Передмова: Йтиметься про маг, який під час битви перемістився в інший світ, 
                                            і що б повернуться в рідний світ йому потрібно буде піднятися на верхній поверх вежі повної загадок і супротивників, 
                                            і на останньому поверсі вам доведеться битися з могутнім обличчям, здолавши якого ви зможете повернуться. у свій світ
                                            У героя є хп бар 10 сердець, після отримання втрат віднімається 1 серця, якщо сердечок (0% хп) немає герой вмирає.

                                            ...........................................
                                            Поверх 1 (полонений)
                                            На другому поверсі 2 скелета (оскільки лич за фактом скелет ) противника захищають бранця, цих противників треба вбити і після їх вбивства
                                            Звільнити бранця (він пов'язаний)
                                            За що той нам дасть ключ від дверей, що ведуть на лісницю 2 поверх.

                                            .......................................................
                                            2 поверх (платформер джампер)
                                            Підлоги немає, є тільки дощечки по яких треба дострибати до магазину попутно отримуючи монетки, 
                                            всього їх на поверсі 3, 
                                            за монетки можна купити шпильки(1 монета одна шпилька) 
                                            після покупки шпильок ми зможуть відчиняться двері на наступний рівень.
                                            
                                            .......................................................
                                            3 поверх (бос)
                                            Ви піднялися до 3 поверху, останнього поверху, ви побачили Ліча, 
                                            ви почали стрибати по платформах нагору щоб натиснути кнопку яка випустити стрілу по Личу знизу, 
                                            що завдяки своїм розмірам не може піднятися до верху,
                                            але стріла випускається лише 1 раз тому ви шукаєте іншу можливість вбити на самій вершині в одному з кутів потаємні двері які відчиняються без ключа, 
                                            там знаходиться кнопка після натискання котрої знизу починається вогонь, від якого Ліч вмирає.`;

                                            document.getElementById("modal-window-5").style.display = "block";

                                            this.BOSS_DEATH_SOUND.play();

                                        }, 3000);
                                    }, 2000);

                                    document.getElementById("fire1").style.marginTop = "1081px";
                                    document.getElementById("fire2").style.marginTop = "1081px";
                                    document.getElementById("fire3").style.marginTop = "1081px";
                                    document.getElementById("fire4").style.marginTop = "1081px";
                                    document.getElementById("fire5").style.marginTop = "1081px";

                                    document.getElementById("fire1").style.marginTop = "505px";
                                    document.getElementById("fire2").style.marginTop = "505px";
                                    document.getElementById("fire3").style.marginTop = "505px";
                                    document.getElementById("fire4").style.marginTop = "505px";
                                    document.getElementById("fire5").style.marginTop = "505px";

                                    return "hero_win";
                                };
                            };
                        };
                    //
                    } else if (elem.IMG_PATH.includes("buttonlvl3")) {
                        if (key == "KeyE"){
                            this.BOSS_DEATH_FLAG1 = true;
                            return "pressbuttonlvl3";
                        };
                    } else if (elem.IMG_PATH.includes("boss_box")) {
                        return "death";
                    } else if (elem.IMG_PATH.includes("E_clue")) {
                        
                    } else if (elem.IMG_PATH.includes("E_clue_right")) {
                        
                    } else if (elem.IMG_PATH.includes("spikes")) {
                        return "death";
                    // Условия попадания в огонь и возвращения значения смерти
                    } else if (elem.IMG_PATH.includes("fire_box")) {
                        return "death";
                    } else {
                        return "right"; // Возвращаем коллизию справо персонажа
                    };
                        
                };
            };
        };
    };

    // Проверка коллизии с левой стороны от персонажа
    collisionLeft(listElem, rect, key){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT);
            if (rect.bottom > rectElem.top + 10 && rect.top < rectElem.bottom - 10) {
                if(rect.left < rectElem.right && rect.left > rectElem.left){
                    // Условие убийства первого NPS (NPS с левой стороны)
                    if (elem.IMG_PATH.includes("nps1") && key == "KeyE") {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet1").style.display = "none";
                        document.getElementById("bullet1").style.animation = "none";
                        document.getElementById("bullet1").style.left = "0px";
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2") && key == "KeyE") {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet2").style.display = "none";
                        document.getElementById("bullet2").style.animation = "none";
                        document.getElementById("bullet2").style.left = "0px";
                        this.NPS2_DEATH_FLAG = true;
                    
                    // Условия открытия двери на 2-ой уровень при условии если
                    // двое NPS убиты а пленник освобождён
                    } else if (elem.IMG_PATH.includes("door1") && this.OPEN_DOOR_FLAG && this.NPS1_DEATH_FLAG && this.NPS2_DEATH_FLAG) {
                        elem.ELEMENT.remove();

                        this.DOOR_OPEN_SOUND.play();

                        this.scroll(0, 400);

                        document.getElementById("bat").style.left = "865px";
                        document.getElementById("bat").style.animation = "batMove 5s infinite linear";
                        
                        document.getElementById("modal-window-2").style.display = "block";

                        document.getElementById("coin-counter-image").style.display = "block";
                        document.getElementById("counter").style.display = "block";
                        document.getElementById("hairpin-counter-image").style.display = "block";
                        document.getElementById("hairpin-counter").style.display = "block";

                        document.getElementById("p_story").textContent = `Передмова: Йтиметься про маг, який під час битви перемістився в інший світ, 
                        і що б повернуться в рідний світ йому потрібно буде піднятися на верхній поверх вежі повної загадок і супротивників, 
                        і на останньому поверсі вам доведеться битися з могутнім обличчям, здолавши якого ви зможете повернуться. у свій світ
                        У героя є хп бар 10 сердець, після отримання втрат віднімається 1 серця, якщо сердечок (0% хп) немає герой вмирає.
                        
                        ...........................................
                        Поверх 1 (полонений)
                        На другому поверсі 2 скелета (оскільки лич за фактом скелет ) противника захищають бранця, цих противників треба вбити і після їх вбивства
                        Звільнити бранця (він пов'язаний)
                        За що той нам дасть ключ від дверей, що ведуть на лісницю 2 поверх.`;

                        this.OPEN_DOOR_FLAG = false;

                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();

                        this.COIN_SOUND.play();
                        // 1++
                        
                        // Получаем сам счётчик из HTML
                        const score = document.getElementById("counter");
                        // Прибавляем к счётчику 1-у
                        score.textContent = parseInt(score.textContent) + 1;

                    //
                    } else if (elem.IMG_PATH.includes("door2") && this.OPEN_DOOR_FLAG) {
                        elem.ELEMENT.remove();

                        this.DOOR_OPEN_SOUND.play();

                        this.scroll(0, 0);
                        
                        setTimeout(() => {
                            document.getElementById("bat").style.left = "902px";
                            document.getElementById("bat").style.animation = "none";
                            document.getElementById("bat").style.display = "none";
                        }, 1000);

                        document.getElementById("modal-window-4").style.display = "block";

                        document.getElementById("hairpin-counter").textContent = 0;
                        
                        setTimeout(() => {
                            document.getElementById("hairpin-counter-image").style.display = "none";
                            document.getElementById("hairpin-counter").style.display = "none";
                            document.getElementById("coin-counter-image").style.display = "none";
                            document.getElementById("counter").style.display = "none";
                        }, 1000);

                        document.getElementById("p_story").textContent = `Передмова: Йтиметься про маг, який під час битви перемістився в інший світ, 
                        і що б повернуться в рідний світ йому потрібно буде піднятися на верхній поверх вежі повної загадок і супротивників, 
                        і на останньому поверсі вам доведеться битися з могутнім обличчям, здолавши якого ви зможете повернуться. у свій світ
                        У героя є хп бар 10 сердець, після отримання втрат віднімається 1 серця, якщо сердечок (0% хп) немає герой вмирає.
                        
                        ...........................................
                        Поверх 1 (полонений)
                        На другому поверсі 2 скелета (оскільки лич за фактом скелет ) противника захищають бранця, цих противників треба вбити і після їх вбивства
                        Звільнити бранця (він пов'язаний)
                        За що той нам дасть ключ від дверей, що ведуть на лісницю 2 поверх.
                        
                        .......................................................
                        2 поверх (платформер джампер)
                        Підлоги немає, є тільки дощечки по яких треба дострибати до магазину попутно отримуючи монетки, 
                        всього їх на поверсі 3, 
                        за монетки можна купити шпильки(1 монета одна шпилька) 
                        після покупки шпильок ми зможуть відчиняться двері на наступний рівень.`;

                        this.OPEN_DOOR_FLAG = false;
                    
                    
                    } else if (elem.IMG_PATH.includes("buttonlvl3")) {
                        if (key == "KeyE"){
                            this.BOSS_DEATH_FLAG1 = true;
                            return "pressbuttonlvl3";
                        };
                    //
                    } else if (elem.IMG_PATH.includes("secret_door")) {
                        elem.ELEMENT.src = "./images/buttonlvl3_right.png";
                        elem.ELEMENT.style.height = "41px";
                        elem.ELEMENT.style.top = "165px";
                        this.BUTTONLVL3_RIGHT = true;
                        if (this.SECRET_DOOR_FLAG != true) {
                            this.DOOR_OPEN_SOUND.play();
                            this.SECRET_DOOR_FLAG = true;
                        };
                        if (this.BUTTONLVL3_RIGHT && key == "KeyE") {
                            if (document.getElementById("fire1").style.marginTop != "481px") {
                                this.BOSS_DEATH_FLAG2 = true;
                                if (this.BOSS_DEATH_FLAG1 && this.BOSS_DEATH_FLAG2) {
                                    document.getElementById("fire1").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire2").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire3").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire4").style.animation = "fireGoDown 2s ease-out";
                                    document.getElementById("fire5").style.animation = "fireGoDown 2s ease-out";
                                    
                                    
                                    setTimeout(() => {
                                        document.getElementById("fire1").style.marginLeft = "360px";
                                    
                                    
                                        document.getElementById("fire1").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire2").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire3").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire4").style.animation = "fireGoUp 2s ease-out";
                                        document.getElementById("fire5").style.animation = "fireGoUp 2s ease-out";
                                    
                                        document.getElementById("fire1").style.marginTop = "481px";
                                        document.getElementById("fire2").style.marginTop = "481px";
                                        document.getElementById("fire3").style.marginTop = "481px";
                                        document.getElementById("fire4").style.marginTop = "481px";
                                        document.getElementById("fire5").style.marginTop = "481px";

                                        this.BUTTONLVL3_RIGHT = false;
                                        setTimeout(() => {
                                            // console.log(21222222)
                                            this.MAIN_BOSS_IMG = document.getElementById("boss");

                                            this.MAIN_BOSS_IMG.style.backgroundImage = "url(images/boss_die.png)";
                                            this.MAIN_BOSS_IMG.style.animation = "none";

                                            document.getElementById("p_story").textContent = `
                                            Передмова: Йтиметься про маг, який під час битви перемістився в інший світ, 
                                            і що б повернуться в рідний світ йому потрібно буде піднятися на верхній поверх вежі повної загадок і супротивників, 
                                            і на останньому поверсі вам доведеться битися з могутнім обличчям, здолавши якого ви зможете повернуться. у свій світ
                                            У героя є хп бар 10 сердець, після отримання втрат віднімається 1 серця, якщо сердечок (0% хп) немає герой вмирає.

                                            ...........................................
                                            Поверх 1 (полонений)
                                            На другому поверсі 2 скелета (оскільки лич за фактом скелет ) противника захищають бранця, цих противників треба вбити і після їх вбивства
                                            Звільнити бранця (він пов'язаний)
                                            За що той нам дасть ключ від дверей, що ведуть на лісницю 2 поверх.

                                            .......................................................
                                            2 поверх (платформер джампер)
                                            Підлоги немає, є тільки дощечки по яких треба дострибати до магазину попутно отримуючи монетки, 
                                            всього їх на поверсі 3, 
                                            за монетки можна купити шпильки(1 монета одна шпилька) 
                                            після покупки шпильок ми зможуть відчиняться двері на наступний рівень.
                                            
                                            .......................................................
                                            3 поверх (бос)
                                            Ви піднялися до 3 поверху, останнього поверху, ви побачили Ліча, 
                                            ви почали стрибати по платформах нагору щоб натиснути кнопку яка випустити стрілу по Личу знизу, 
                                            що завдяки своїм розмірам не може піднятися до верху, але й з часом втрачаєте здоров'я, 
                                            тому вам потрібно перемогти Ліча швидше ніж ви помрете, 
                                            але стріла випускається лише 1 раз тому ви шукаєте іншу можливість вбити на самій вершині в одному з кутів потаємні двері які відчиняються без ключа, 
                                            там знаходиться кнопка після натискання котрої знизу починається вогонь, від якого Ліч вмирає.`;

                                            document.getElementById("modal-window-5").style.display = "block";

                                            this.BOSS_DEATH_SOUND.play();
                                        }, 3000);
                                    }, 2000);
                                
                                    document.getElementById("fire1").style.marginTop = "1081px";
                                    document.getElementById("fire2").style.marginTop = "1081px";
                                    document.getElementById("fire3").style.marginTop = "1081px";
                                    document.getElementById("fire4").style.marginTop = "1081px";
                                    document.getElementById("fire5").style.marginTop = "1081px";
                                
                                    document.getElementById("fire1").style.marginTop = "505px";
                                    document.getElementById("fire2").style.marginTop = "505px";
                                    document.getElementById("fire3").style.marginTop = "505px";
                                    document.getElementById("fire4").style.marginTop = "505px";
                                    document.getElementById("fire5").style.marginTop = "505px";

                                    return "hero_win";
                                };
                            };
    
                        };
                    // 
                    } else if (elem.IMG_PATH.includes("buttonlvl3")) {
                        if (key == "KeyE"){
                            this.BOSS_DEATH_FLAG1 = true;
                            return "pressbuttonlvl3";
                        };
                    } else if (elem.IMG_PATH.includes("boss_box")) {
                        return "death";
                    } else if (elem.IMG_PATH.includes("E_clue")) {
                        
                    } else if (elem.IMG_PATH.includes("E_clue_right")) {
                        
                    } else if (elem.IMG_PATH.includes("spikes")) {
                        return "death";
                    // Условия попадания в огонь и возвращения значения смерти
                    } else if (elem.IMG_PATH.includes("fire_box")) {
                        return "death";
                    } else {
                        return "left"; // Возвращаем коллизию слево персонажа
                    };
                };
            };
        };
    };

    // Проверка коллизии с нижней стороны от персонажа
    collisionTop(listElem, rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT);
            if (rect.right > rectElem.left + 10 && rect.left < rectElem.right - 10) { 
                if(rect.bottom > rectElem.top && rect.bottom < rectElem.bottom){
                    // Условие убийства первого NPS (NPS с левой стороны)
                    if (elem.IMG_PATH.includes("nps1")) {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet1").style.display = "none";
                        document.getElementById("bullet1").style.animation = "none";
                        document.getElementById("bullet1").style.left = "0px";
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2")) {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet2").style.display = "none";
                        document.getElementById("bullet2").style.animation = "none";
                        document.getElementById("bullet2").style.left = "0px";
                        this.NPS2_DEATH_FLAG = true;

                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();

                        this.COIN_SOUND.play();
                        // 1++
                        
                        // Получаем сам счётчик из HTML
                        const score = document.getElementById("counter")
                        // Прибавляем к счётчику 1-у
                        score.textContent = parseInt(score.textContent) + 1;

                    } else if (elem.IMG_PATH.includes("buttonlvl3")) {
                        
                    } else if (elem.IMG_PATH.includes("secret_door")) {
                    
                    //
                    } else if (elem.IMG_PATH.includes("boss_box")) {
                        return "death";
                    } else if (elem.IMG_PATH.includes("E_clue")){
                        
                    } else if (elem.IMG_PATH.includes("E_clue_right")){
                        
                    } else if (elem.IMG_PATH.includes("spikes")) {
                        return "death";
                    // Условия попадания в огонь и возвращения значения смерти
                    } else if (elem.IMG_PATH.includes("fire_box")) {
                        return "death";
                    } else {
                        return "top"; // Возвращаем коллизию снизу персонажа
                    }  ;
                };
            };
        };
    };

    // Проверка коллизии с верхней стороны от персонажа
    collisionBottom(listElem, rect){
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT);
            if (rect.right > rectElem.left + 10 && rect.left < rectElem.right - 10) { 
                if(rect.top < rectElem.bottom && rect.top > rectElem.top){
                    // Условие убийства первого NPS (NPS с левой стороны)
                    if (elem.IMG_PATH.includes("nps1")) {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet1").style.display = "none";
                        document.getElementById("bullet1").style.animation = "none";
                        document.getElementById("bullet1").style.left = "0px";
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2")) {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet2").style.display = "none";
                        document.getElementById("bullet2").style.animation = "none";
                        document.getElementById("bullet2").style.left = "0px";
                        this.NPS2_DEATH_FLAG = true;

                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();

                        this.COIN_SOUND.play();
                        // 1++

                        // Получаем сам счётчик из HTML
                        const score = document.getElementById("counter");
                        // Прибавляем к счётчику 1-у
                        score.textContent = parseInt(score.textContent) + 1;

                    } else if (elem.IMG_PATH.includes("buttonlvl3")) {
                       
                    } else if (elem.IMG_PATH.includes("secret_door")) {
                    
                    } else if (elem.IMG_PATH.includes("boss_box")) {
                        return "death";
                    } else if (elem.IMG_PATH.includes("E_clue")) {
                        
                    } else if (elem.IMG_PATH.includes("E_clue_right")) {
                        
                    } else if (elem.IMG_PATH.includes("spikes")) {
                        return "death";
                    // Условия попадания в огонь и возвращения значения смерти
                    } else if (elem.IMG_PATH.includes("fire_box")) {
                        return "death";
                    } else {
                        return "bottom"; // Возвращаем коллизию сверху персонажа
                    }
                };
            };
        };
    } ; 
};


export default Rect;