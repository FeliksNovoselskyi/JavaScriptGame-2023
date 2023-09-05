import createMap from './utils/createMap.js';

let signUpName = document.querySelector("#signupname");
let signUpLogin = document.querySelector("#signuplogin");
let signUpPassword = document.querySelector("#signuppassword");
let signInLogin = document.querySelector("#signinlogin");
let signInPassword = document.querySelector("#signinpassword");

let signUpButton = document.querySelector("#signup");
let signInButton = document.querySelector("#signin");
let changeThemeButton = document.getElementById("button3")
let registrationTab = document.getElementById("button1")
let authorizationTab = document.getElementById("button2")
let hpBarButton = document.querySelector("#hpbar")

let themeCounter = 0

let users = {};

let listMap = [
    "00000000000000000000000".split(""),
    "00000000000000000000000".split(""),
    "11111111111111111111111".split(""),
    "10010000000000000100001".split(""),
    "10010000000000000100001".split(""),
    "10000000000000100000001".split(""),
    "10001000000000000000001".split(""),
    "10000010000000010000001".split(""),
    "10000000000000000000001".split(""),
    "10000001000000000010001".split(""),
    "10000000000000000000001".split(""),
    "10000000100000000100001".split(""),
    "10000100001000100000001".split(""),
    "1010000110000000000000d".split(""),
    "10000000000000000000000".split(""),
    "10011111111111111111111".split(""),
    "1010000000d000000000001".split(""),
    "10000000000000000000001".split(""),
    "11111111111000001000001".split(""),
    "10000000001001000000001".split(""),
    "10001000001000000001001".split(""),
    "10001000001000001000001".split(""),
    "10000000001000000001001".split(""),
    "10000010001000100011001".split(""),
    "11010000001100001000001".split(""),
    "10010000011000000000001".split(""),
    "10110000000000100100001".split(""),
    "10010001000100000100001".split(""),
    "11010001010100000000001".split(""),
    "10011111111111111111111".split(""),
    "1010000d0000000000000001".split(""),
    "10000000000000000000001".split(""),
    "11111111000000100000101".split(""),
    "10000000000100000000101".split(""),
    "10000100000000000100001".split(""),
    "10000100000000100000001".split(""),
    "10000000100000000001001".split(""),
    "d0000100000010010001001".split(""),
    "0h000000000000000000001".split(""),
    "11111111111111111111111".split(""),
]

class User {
    constructor(name, login, password) {
      this.NAME = name;
      this.LOGIN = login;
      this.PASSWORD = password;
    }
};

function createId(users) {
    return Object.keys(users).length;
}

signUpButton.addEventListener("click", () => {
    const signUpNameUser = signUpName.value 
    const signUpLoginUser = signUpLogin.value
    const signUpPasswordUser = signUpPassword.value
    
    const signUpNewUser = new User(signUpNameUser, signUpLoginUser, signUpPasswordUser)

    const userId = "User" + createId(users)
    users[userId] = signUpNewUser

    fetch("users.json")
        .then(response => response.json())
        .then(existingUsers => {
            const userId = "User" + createId(existingUsers)
            existingUsers[userId] = signUpNewUser

            const updatedUsersJSON = JSON.stringify(existingUsers)
            const blob = new Blob([updatedUsersJSON], { type: "application/json" });
            const a = document.createElement('a')
            a.href = URL.createObjectURL(blob) 
            a.download = "users.json"
            a.style.display = "none"

            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a) // убираем детей в 3х смыслах по нашей мере испорченности.

        })
});

signInButton.addEventListener("click", () => {
    const signInLoginUser = signInLogin.value
    const signInPasswordUser = signInPassword.value

    fetch("users.json")
        .then(response => response.json())
        .then(data => {
            for (const userId in data) {
                const user = data[userId]
                if (user.LOGIN === signInLoginUser && user.PASSWORD === signInPasswordUser){ 

                    document.getElementById("tab2").remove("active")
                    document.getElementById("tab3").style.display = "block"
                    document.getElementById("button1").style.display = "none"
                    document.getElementById("button2").style.display = "none"
                    document.getElementById("button3").style.display = "none"
                    let [listElem, hero] = createMap(listMap)

                    function gameLoop(){
                        hero.gravity(listElem)
                        hero.moveLoop(listElem)
                        setTimeout(gameLoop, 1) // Метод, який викликає функцію кожні 16 міллісекунд
                    }
                    // Запускаемо функцію gameLoop
                    gameLoop();
                    //  створюємо подію натискання на кнопки руху
                    document.addEventListener("keydown", (event) => {
                        // Викликаемо метод руху героя с класу Hero
                        hero.move(event.code, listElem)
                    })
                    // створюємо  подію відпускання кнопки (зупинка персонажа)
                    document.addEventListener('keyup',(event) => {
                        
                        if (event.code == 'KeyA') {
                            hero.MOVE_LEFT = false
                        }
                        if (event.code == 'KeyD') {
                            hero.MOVE_RIGHT = false
                        }
                        // Міняємо картинку на нерухаючусь у класі Hero 
                        // коли герой перестає рухатись (Відпущена кнопка на клавіатурі)
                        hero.IMG_PATH = "/images/player/1.png"
                        // Задаємо нову картинку в HTML елемент
                        hero.ELEMENT.src = hero.IMG_PATH
                    });


                    alert("Успішна авторизація")
                    return
                };
            }
            alert("Неправильний логін або пароль")
        })

}) 

changeThemeButton.addEventListener("click", () => {
    themeCounter++;

    if (themeCounter % 2) {
        document.getElementById("all").style.backgroundImage = "linear-gradient(to left,  rgb(118, 118, 118), rgb(128, 122, 122), rgb(177, 172, 172))";
        document.getElementById("all").style.textAlign = "text-align: center"
        document.getElementById("all").style.height = "inherit"
        document.getElementById("all").style.animation = "changeSun 3s ease-out"

        document.getElementById("button3").textContent = "☼";

    }
    else{
        document.getElementById("all").style.backgroundImage = "linear-gradient(to left,  rgb(40, 39, 39), rgb(21, 17, 17), rgb(16, 13, 13))";
        document.getElementById("all").style.textAlign = "text-align: center"
        document.getElementById("all").style.height = "inherit"
        document.getElementById("all").style.animation = "changeMoon 3s ease-out"

        document.getElementById("button3").textContent = "☽";
    }
})


registrationTab.addEventListener("click", (event) => {
    openTab(event, "tab1")
})

authorizationTab.addEventListener("click", (event) => {
    openTab(event, "tab2") 
})

function openTab(event, tabName){
    const tabContents = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none"
    }
    
    const tabLinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tabLinks.length; i++){
      tabLinks[i].classList.remove("active")
    };

    document.getElementById(tabName).style.display = "block";

    event.currentTarget.classList.add("active");

};

document.getElementById("tab1").style.display = "block";
document.querySelector(".tablinks").classList.add("active");
