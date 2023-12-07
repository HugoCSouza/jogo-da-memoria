const state = {
    view: {
        squares: document.querySelectorAll(".square"), //busca no documento seletores css 
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000, //milisegundos
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        restantLife: 3,
    },
    actions: {
        countDownTimerId: setInterval(countTime, 1000),
    },
};

function randomSquare(){
    state.view.squares.forEach((square) => { //itera sobre o array pra cada valor
        square.classList.remove("enemy");  //exclui o seletor enemy
    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber]; //seleciona o quadrado aleatório
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id // pegando o id do elemento css
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity); //utiliza o valor da velocidade para mover o bonequinho
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {            
        square.addEventListener("mousedown", () => {    //verifica se o quadrado foi clicado do mouse ("mousedown")
            if(square.id === state.values.hitPosition){ //verifca se o id do quadrado que estou clicando é igual no hitposition
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playsound();
            }else{
                countLife();
            }
        })
    })
}

function countTime(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){  
        gameover();
    }
}

function playsound(){
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.4;
    audio.play();
}

function countLife(){
    state.values.restantLife--;
    state.view.life.textContent = state.values.restantLife;
    if(state.values.restantLife <= 0){
        gameover();
    }
}

function gameover(){
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.values.timerId)
    alert(`Caboooo! Você fez ${state.values.result} pontos!`);
}

function main(){
    moveEnemy();
    addListenerHitBox();
};

main();