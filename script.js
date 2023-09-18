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

let themeCounter = 0;

let users = {};

let listMap = [
    "00000000000000000000000".split(""),
    "00000000000000000000000".split(""),
    "88222111222122222211188".split(""),
    "800e0000000000000000078".split(""),
    "20060000000000000000h02".split(""),
    "20020000000000100200221".split(""),
    "20002000000000000000001".split(""),
    "20000010000000020000001".split(""),
    "20000000000000000000002".split(""),
    "20000001000000000010012".split(""),
    "20000000000000000012201".split(""),
    "20000000200000000200002".split(""),
    "20000200002b00200100001".split(""),
    "2020000210000001220000d".split(""),
    "20000000100000000000000".split(""),
    "20022112221222211222288".split(""),
    "20200000005000000000008".split(""),
    "20000000000000000000001".split(""),
    "88222112188000002000001".split(""),
    "80000000008002000000002".split(""),
    "20003000002000000002002".split(""),
    "2000200000200000200e002".split(""),
    "1000000000100000000t001".split(""),
    "20000020001000200022001".split(""),
    "22020000001200002000002".split(""),
    "20010000022000000000002".split(""),
    "20110000000000200300001".split(""),
    "10020002000200000200002".split(""),
    "2208fff20302ffffffffff8".split(""),
    "20088221122222111212188".split(""),
    "2020000d000000000000008".split(""),
    "80000000000000000000002".split(""),
    "88211222000000200000c01".split(""),
    "80000e00000200000000202".split(""),
    "20000n00000000000200002".split(""),
    "2000010000000020000e002".split(""),
    "1000000020000000000m002".split(""),
    "d0000200000010020002001".split(""),
    "00000000000000000000008".split(""),
    "88122222211122221122288".split(""),
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

                    document.getElementById("tab2").remove("active");
                    document.getElementById("tab3").style.display = "block";
                    document.getElementById("button1").style.display = "none";
                    document.getElementById("button2").style.display = "none";
                    document.getElementById("button3").style.display = "none";
                    document.querySelector("body").style.backgroundImage = "url(images/bg1.png)";
                    document.querySelector("body").style.backgroundAttachment = "fixed";
                    
                    let [listElem, hero] = createMap(listMap);

                    function gameLoop(){
                        hero.gravity(listElem); // Вызываем метод который отвечает за гравитацию
                        hero.moveLoop(listElem); // Вызываем метод который отвечает за движения персонажа
                        hero.fireAnimation(); // Вызывем метод который отвечает за анимацию огня
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
            }
            alert("Неправильний логін або пароль");
        })

}) 

changeThemeButton.addEventListener("click", () => {
    themeCounter++; // Добавляем в themeCounter 1 при каждом клике для дальнейшей смены тем

    if (themeCounter % 2) {
        // Смена темы на светлую
        // меняем стили фона, размещение, высоты, задаём анимацию смены градиента на светлые цвета
        document.getElementById("all").style.backgroundImage = "linear-gradient(to left,  rgb(118, 118, 118), rgb(128, 122, 122), rgb(177, 172, 172))";
        document.getElementById("all").style.textAlign = "text-align: center";
        document.getElementById("all").style.height = "inherit";
        document.getElementById("all").style.animation = "changeSun 3s ease-out";

        // Меняем символ текста на кнопке смены темы под соответствующую тему (светлую)
        document.getElementById("button3").textContent = "☼";

    }
    else{
        // Смена темы на тёмную
        // меняем стили, фона, размещение, высоты, задаём анимацию смены градиента до тёмные цвета
        document.getElementById("all").style.backgroundImage = "linear-gradient(to left,  rgb(40, 39, 39), rgb(21, 17, 17), rgb(16, 13, 13))";
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
