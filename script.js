let signUpName = document.querySelector("#signupname");
let signUpLogin = document.querySelector("#signuplogin");
let signUpPassword = document.querySelector("#signuppassword");
let signInLogin = document.querySelector("#signinlogin");
let signInPassword = document.querySelector("#signinpassword");

let signUpButton = document.querySelector("#signup");
let signInButton = document.querySelector("#signin");

let users = {};

let listMap = [
    "0000000000000000000000000000000000".split(""),
    "0000000000000000000000000000000000".split(""),
    "1111111111111111111111111111111111".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1111111111111111111111111111111111".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1111111111111111111111111111111111".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000000000000000000000000000001".split(""),
    "1000000100000000h00000100000000001".split(""),
    "1111111111111111111111111111111111".split(""),
]

class User {
    constructor(name, login, password) {
      this.NAME = name;
      this.LOGIN = login;
      this.PASSWORD = password;
    }
};

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

    
    collisionRight(listElem, rect) {
        for (let elem of listElem){
            let rectElem = this.getRect(elem.ELEMENT)
            if (rect.bottom > rectElem.top && rect.top < rectElem.bottom) {
                if(rect.right > rectElem.left && rect.right < rectElem.right){
                    return "right"
                    // rect это персонаж, rectElem это блок, а felixElem это тим лид
                }
            }
            if (rect.bottom > rectElem.top && rect.top < rectElem.bottom) {
                if(rect.left < rectElem.right && rect.left > rectElem.left){
                    return "left"
                }
            }
        }
    }
}

class Hero extends Sprite {
    constructor(x, y, width, height, imgPath = undefined, color = undefined, tagName = "div") {
        super(x, y, width, height, imgPath, color, tagName) // главное не писать никаких undefined после наследуемых параметров в super
        
        this.ELEMENT.style.width = `${this.WIDTH}px`;
        this.ELEMENT.style.height = `${this.HEIGHT}px`;
        this.ELEMENT.style.left = `${this.X}px`;
        this.ELEMENT.style.top = `${this.Y}px`;
        
        this.RECT = new Rect(x, y, width, height, this.ELEMENT);

        // console.log(this.IMG_PATH)

        if (this.IMG_PATH != undefined) {
            this.ELEMENT.src = this.IMG_PATH
        }

        document.body.append(this.ELEMENT)

        this.ELEMENT.style.position = 'absolute'

        this.ELEMENT.src = this.IMG_PATH
        
        this.IMG_NUM = 4

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
    
    animation(){
        if (this.IMG_NUM >= 8){
            this.IMG_NUM = 4
        }
        this.IMG_NUM++;
        this.IMG_PATH = `/images/player/${this.IMG_NUM}.png` 
        this.ELEMENT.src = this.IMG_PATH

    }
   
    move(key, listElem) {
        let collision = this.RECT.collisionRight(listElem, this.RECT.getRect(this.ELEMENT))
        
        if (key == "KeyD" && collision != 'right') {
            this.ELEMENT.classList.remove("left")  
            this.ELEMENT.classList.add("right")
            this.X += 10;
            this.ELEMENT.style.left = `${this.X}px`;
            this.animation()
        }; 
        
        if (key == "KeyA" && collision != 'left') { 
            this.ELEMENT.classList.remove("right")
            this.ELEMENT.classList.add("left")
            
            this.X -= 10;
            
            this.ELEMENT.style.left = `${this.X}px`;
            this.animation()
        };

        if (key == "KeyW" && this.COUNT_JUMP < 15 && collision != "up") {
            this.ELEMENT.classList.remove("right")
            this.ELEMENT.classList.remove("left")

            this.ELEMENT.classList.add("up")

            this.Y -= 10;
            this.COUNT_JUMP += 1;

            this.ELEMENT.style.top = `${this.Y}px`;

            if (this.COUNT_JUMP == 15) {
                // console.log(1)
                this.Y += 150;
                this.COUNT_JUMP = 0;

                this.ELEMENT.style.top = `${this.Y}px`;
            };


        }
    }
}

function createMap(listMap) {
    const listElem = new Array()
    
    let x = 0
    let y = 0

    let hero

    for (let row of listMap) {
        for (let cell of row) {
            if (cell == "1") {
                let block = new Sprite(
                    x, y,
                    25, 25,
                    "../images/block.png",
                    undefined,
                    "img"
                )
                listElem.push(block)

            } else if (cell == "h") {
                hero = new Hero(
                    x, y,
                    25, 25,
                    "../images/player/1.png",
                    undefined,
                    "img"
                )              
            };
            x += 25

        }
        x = 0
        y += 25
    }

    return [listElem, hero]
}


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
                    let [listElem, hero] = createMap(listMap)

                    function gameLoop(){
                        setTimeout(gameLoop, 16)
                    }
                    gameLoop();

                    document.addEventListener("keydown", (event) => {
                        hero.move(event.code, listElem)
                    })

                    document.addEventListener('keyup',(event) => {
                        hero.IMG_PATH = "/images/player/1.png"
                        hero.ELEMENT.src = hero.IMG_PATH
                    });


                    alert("Успішна авторизація")
                    return
                };
            }
            alert("Неправильний логін або пароль")
        })

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
