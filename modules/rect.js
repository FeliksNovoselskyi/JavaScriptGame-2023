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
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2") && key == "KeyE") {
                        elem.ELEMENT.remove();
                        // Убираем пулю второго NPS
                        document.getElementById("bullet2").style.display = "none";
                        this.NPS2_DEATH_FLAG = true;

                    // Условие освобождения пленника,
                    // и смена флага открытия двери на 2-ой уровень
                    } else if (elem.IMG_PATH.includes("captive")) {
                        elem.ELEMENT.remove();
                        this.OPEN_DOOR_FLAG = true;
                    
                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();
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
                    } else if (elem.IMG_PATH.includes("seller") && key == "KeyE" && parseInt(score.textContent) == 3) {
                        this.OPEN_DOOR_FLAG = true;
                        this.LEVEL2_FLAG = true;
                        document.getElementById("counter").textContent = 0;
                    //
                    } else if (elem.IMG_PATH.includes("secret_door")) {
                        elem.ELEMENT.src = "./images/buttonlvl3_right.png";
                        elem.ELEMENT.style.height = "41px";
                        elem.ELEMENT.style.top = "165px";
                        this.BUTTONLVL3_RIGHT = true;
                        if (this.BUTTONLVL3_RIGHT && key == "KeyE") {
                            if (document.getElementById("fire1").style.marginTop != "481px") {
                                console.log(1);
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
                                    
                                    this.BOSS_DEATH_FLAG2 = true;
                                    this.BUTTONLVL3_RIGHT = false;
                                    setTimeout(() => {
                                        if (this.BOSS_DEATH_FLAG1 && this.BOSS_DEATH_FLAG2) {
                                            // console.log(21222222)
                                            this.MAIN_BOSS_IMG = document.querySelector("#main-bossimg");

                                            this.MAIN_BOSS_IMG.src = "./images/boss_die.png";
                                        }
                                    }, 3000)
                                }, 2000)

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
                            };
                        };
                    //
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
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2") && key == "KeyE") {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet2").style.display = "none";
                        this.NPS2_DEATH_FLAG = true;
                    
                    // Условия открытия двери на 2-ой уровень при условии если
                    // двое NPS убиты а пленник освобождён
                    } else if (elem.IMG_PATH.includes("door1") && this.OPEN_DOOR_FLAG && this.NPS1_DEATH_FLAG && this.NPS2_DEATH_FLAG) {
                        elem.ELEMENT.remove();
                        this.OPEN_DOOR_FLAG = false;

                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();
                        // 1++
                        
                        // Получаем сам счётчик из HTML
                        const score = document.getElementById("counter");
                        // Прибавляем к счётчику 1-у
                        score.textContent = parseInt(score.textContent) + 1;

                    //
                    } else if (elem.IMG_PATH.includes("door2") && this.OPEN_DOOR_FLAG) {
                        elem.ELEMENT.remove();
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
                        if (this.BUTTONLVL3_RIGHT && key == "KeyE") {
                            if (document.getElementById("fire1").style.marginTop != "481px") {
                                console.log(1);
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
                                    
                                    this.BOSS_DEATH_FLAG2 = true;
                                    this.BUTTONLVL3_RIGHT = false;
                                    setTimeout(() => {
                                        if (this.BOSS_DEATH_FLAG1 && this.BOSS_DEATH_FLAG2) {
                                            // console.log(21222222)
                                            this.MAIN_BOSS_IMG = document.querySelector("#main-bossimg");

                                            this.MAIN_BOSS_IMG.src = "./images/boss_die.png";
                                        }
                                    }, 3000)
                                }, 2000)
                            
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
                            };
    
                        };
                    // 
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
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2")) {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet2").style.display = "none";
                        this.NPS2_DEATH_FLAG = true;

                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();
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
                        this.NPS1_DEATH_FLAG = true;

                    // Условие убийства второго NPS (NPS с правой стороны)
                    } else if (elem.IMG_PATH.includes("nps2")) {
                        elem.ELEMENT.remove();
                        document.getElementById("bullet2").style.display = "none";
                        this.NPS2_DEATH_FLAG = true;

                    // Условие взятия монет и прибавления к счётчику 1-ы
                    } else if (elem.IMG_PATH.includes("coin")) {
                        elem.ELEMENT.remove();
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