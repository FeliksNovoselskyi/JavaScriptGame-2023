import createMap from './utils/createMap.js';

let signUpName = document.querySelector("#signupname");
let signUpLogin = document.querySelector("#signuplogin");
let signUpPassword = document.querySelector("#signuppassword");
let signInLogin = document.querySelector("#signinlogin");
let signInPassword = document.querySelector("#signinpassword");

let signUpButton = document.querySelector("#signup");
let signInButton = document.querySelector("#signin");
let changeThemeButton = document.getElementById("button3");
let registrationTab = document.getElementById("button1");
let authorizationTab = document.getElementById("button2");
let hpBarButton = document.querySelector("#hpbar");

let buttonXModalWindow2 = document.querySelector("#button-x-modal-window-2");
let buttonXModalWindow3 = document.querySelector("#button-x-modal-window-3");
let buttonXModalWindow4 = document.querySelector("#button-x-modal-window-4");
let buttonXModalWindow5 = document.querySelector("#button-x-modal-window-5");

let backgroundMusic = new Audio("sounds/background_music.wav");

let themeCounter = 0;

let users = {};

let listMap = [
    "00000000000000000000000".split(""),
    "00000000000000000000000".split(""),
    "84444444444444444444448".split(""),
    "200e0000000000000000072".split(""),
    "20060000000000000000x02".split(""),
    "200~0000000000100~00848".split(""),
    "20001000010000000000002".split(""),
    "200000100008000~0000002".split(""),
    "20000000000200000000002".split(""),
    "2000000~0008000000~ss12".split(""),
    "20000000000000800084482".split(""),
    "20000000108000200800002".split(""),
    "20000~000s2b002ss200008".split(""),
    "20~0000844800084480000d".split(""),
    "2000000q000000000000000".split(""),
    "80084448448444444444448".split(""),
    "20100000005000000000002".split(""),
    "20000000000000000000002".split(""),
    "8444444444800000~000002".split(""),
    "2000000000200~000000002".split(""),
    "20003000002000000001002".split(""),
    "2000~00000200000~00e002".split(""),
    "2000000000200000000t002".split(""),
    "200000~0002000100084802".split(""),
    "8108000000210000~000002".split(""),
    "20020000018000000000002".split(""),
    "20~80000000000~00300002".split(""),
    "20020008000800000100002".split(""),
    "8102fff20302ffffffffff2".split(""),
    "20084448444844444444448".split(""),
    "2010000d000000000000002".split(""),
    "20000000000000000000002".split(""),
    "84444448000000~00000c02".split(""),
    "20000e000001000000s0102".split(""),
    "20000n00000000000110002".split(""),
    "20000~00000000~0000e002".split(""),
    "8000000010000ss0000m002".split(""),
    "9000010000008448000~002".split(""),
    "0h000000000000000000002".split(""),
    "84444444444444444444448".split(""),
];

class User {
    constructor(name, login, password) {
      this.NAME = name;
      this.LOGIN = login;
      this.PASSWORD = password;
    }
};

function createId(users) {
    return Object.keys(users).length;
};

signUpButton.addEventListener("click", () => {
    const signUpNameUser = signUpName.value;
    const signUpLoginUser = signUpLogin.value;
    const signUpPasswordUser = signUpPassword.value;
    
    const signUpNewUser = new User(signUpNameUser, signUpLoginUser, signUpPasswordUser);

    const userId = "User" + createId(users);
    users[userId] = signUpNewUser;
    
    // загружаем существующих пользователей из users.json, если файл существует
    fetch("users.json")
        .then(response => response.json()) // Анализируем данные полученные из файла users.json в формате json
        .then(existingUsers => { // продолжаем выполнение кода когда успешно разобрали json
            // создаём id для нового пользователя бъединяем старых пользователей с новым пользователем
            const userId = "User" + createId(existingUsers);
            // добавляем нового пользователя в один обьект с уже существующими
            existingUsers[userId] = signUpNewUser;
            
            // делаем ввсех пользователей в json строку
            const updatedUsersJSON = JSON.stringify(existingUsers);

            // создаём blob обьект который хранит бинарные данные, в нашем случае json в файле users.json
            const blob = new Blob([updatedUsersJSON], { type: "application/json" });
            const a = document.createElement('a'); // создаём а в котором сохраняем ссылку на blob
            a.href = URL.createObjectURL(blob); // создаём ссылку для а
            a.download = "users.json"; // указываем в какой файл загружать а
            a.style.display = "none"; // делаем а невидимым что бы скачать данные пользователей в users.json без отображения а на странице, то есть создаём временную ссылку

            document.body.appendChild(a);
            a.click(); // имитируем клик на а чтобы пользователю не нужно было это делать самому
            document.body.removeChild(a); // 

        });
});

signInButton.addEventListener("click", () => {
    const signInLoginUser = signInLogin.value;
    const signInPasswordUser = signInPassword.value;

    // загружаем существующих пользователей из users.json, если файл существует
    fetch("users.json")
        .then(response => response.json()) // Анализируем данные полученные из файла users.json в формате json
        .then(data => { // продолжаем выполнение кода когда успешно разобрали json
            // проверяем полученый логин и пароль на то соответствует ли он с одним из пользователей
            for (const userId in data) {
                const user = data[userId];
                if (user.LOGIN === signInLoginUser && user.PASSWORD === signInPasswordUser){ 

                    document.querySelector("body").style.backgroundImage = "url(images/bg1.png)";
                    document.querySelector("#all").style.background = "none";
                    document.querySelector("body").style.backgroundAttachment = "fixed";
                    document.getElementById("tab2").remove("active");
                    document.getElementById("tab3").style.display = "block";
                    document.getElementById("button1").style.display = "none";
                    document.getElementById("button2").style.display = "none";
                    document.getElementById("button3").style.display = "none";
                    
                    let [listElem, hero] = createMap(listMap);

                    backgroundMusic.loop = true;
                    backgroundMusic.value = 0.1;

                    backgroundMusic.play();

                    window.scrollTo({
                        top: 700,
                        left: 0,
                        behavior: "smooth",
                    });

                    function gameLoop(){
                        hero.gravity(listElem); // Вызываем метод который отвечает за гравитацию
                        hero.moveLoop(listElem); // Вызываем метод который отвечает за движения персонажа
                        hero.bulletCollisionAnimation(); // Вызывем метод который отвечает за анимацию огня
                        setTimeout(gameLoop, 1); // Метод, который вызывает функцию каждую миллисекунду
                    };
                    
                    // Запускаем функцию gameLoop которая имеет внутри бесконечный цикл и выполняет работу персонажа, анимации огня, гравитации, и много чего остального
                    gameLoop();
                    // Создаём событие нажатия на кнопку, потом передаем какую кнопку было нажато (key) в метод move и уже там определяем в какую сторону двигается персонаж
                    document.addEventListener("keydown", (event) => {
                        // Вызываем метод движения из класса Hero
                        hero.move(event.code, listElem);
                    });
                    // Создаём событие когда клавиша отжимается, 
                    // исходя из того была отжата клавиша или нет и какая была отжата клавиша,
                    // останавливаем какое-то действие персонажа (в основном остановка персонажа)
                    document.addEventListener('keyup',(event) => {
                        
                        if (event.code == 'KeyA') {
                            hero.MOVE_LEFT = false;
                        };
                        if (event.code == 'KeyD') {
                            hero.MOVE_RIGHT = false;
                        };
                        // Меняем картинку персонажа на картинку когда он не подвижен в классе Hero 
                        // когда герой перестаёт двигатся (клавиша отпущена на клавиатуре)
                        hero.IMG_PATH = "/images/player/1.png";
                        // Задаём новую картинку в HTML элемент
                        hero.ELEMENT.src = hero.IMG_PATH;
                    });


                    alert("Успішна авторизація"); 
                    return; // Возращаем произошедшее в условии
                };
            };
            alert("Неправильний логін або пароль");
        });

});

changeThemeButton.addEventListener("click", () => {
    themeCounter++; // Добавляем в themeCounter 1 при каждом клике для дальнейшей смены тем

    if (themeCounter % 2) {
        // Смена темы на светлую
        // меняем стили фона, размещение, высоты, задаём анимацию смены градиента на светлые цвета
        document.getElementById("all").style.background = "linear-gradient(to left,  rgb(118, 118, 118), rgb(128, 122, 122), rgb(177, 172, 172))";
        document.getElementById("all").style.textAlign = "text-align: center";
        document.getElementById("all").style.height = "inherit";
        document.getElementById("all").style.animation = "changeSun 3s ease-out";

        // Меняем символ текста на кнопке смены темы под соответствующую тему (светлую)
        document.getElementById("button3").textContent = "☼";

    }
    else{
        // Смена темы на тёмную
        // меняем стили, фона, размещение, высоты, задаём анимацию смены градиента до тёмные цвета
        document.getElementById("all").style.background = "linear-gradient(to left,  rgb(40, 39, 39), rgb(21, 17, 17), rgb(16, 13, 13))";
        document.getElementById("all").style.textAlign = "text-align: center";
        document.getElementById("all").style.height = "inherit";
        document.getElementById("all").style.animation = "changeMoon 3s ease-out";
        
        // Меняем символ текста на кнопке смены темы под соответствующую тему (тёмную)
        document.getElementById("button3").textContent = "☽";
    };
});

// Добавляем событие клика на таб регистрации, и вызываем функцию смены таба, передав нужный id таба
registrationTab.addEventListener("click", (event) => {
    openTab(event, "tab1");
});

// Добавляем события клика на таб авторизации, и вызываем функцию смены таба, передав нужный id таба
authorizationTab.addEventListener("click", (event) => {
    openTab(event, "tab2");
});


buttonXModalWindow2.addEventListener("click", () => {
    document.getElementById("modal-window-2").style.display = "none";
})

buttonXModalWindow3.addEventListener("click", () => {
    document.getElementById("modal-window-3").style.display = "none";
})

buttonXModalWindow4.addEventListener("click", () => {
    document.getElementById("modal-window-4").style.display = "none";
})

buttonXModalWindow5.addEventListener("click", () => {
    document.getElementById("modal-window-5").style.display = "none";
})


// Функция открытия вкладки
function openTab(event, tabName){
    const tabContents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContents.length; i++) { // цикл который при переходе на новый таб по кнопке делает контент таба на котором мы были до этого не активным
        tabContents[i].style.display = "none"; // очищаем дисплей от контента прошлого таба
    };
    
    const tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++){ // цикл который при переходе на новый таб по кнопке делает кнопку таба на котором мы были до этого не активной
      tabLinks[i].classList.remove("active");
    };

    // Отображаем выбранную вкладку
    document.getElementById(tabName).style.display = "block";

    // Делаем текущую кнопку активной
    // currentTarget содержит ссылку на элемент, на котором
    // был замечен обработчик события, то есть на кнопку tab
    // currentTarget это свойство обьекта события event
    event.currentTarget.classList.add("active");

};

// По умолчанию открываем первую вкладку с регистрацией
document.getElementById("tab1").style.display = "block";
document.querySelector(".tablinks").classList.add("active"); // querySelector автоматически просматривает только первый элемент по этому лишнего кода тут не нужно потому что он и так на первом табе
