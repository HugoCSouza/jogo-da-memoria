const emojis = [
    "😁",
    "😁",
    "👍",
    "👍",
    "👌",
    "👌",
    "😎",
    "😎",
    "😤",
    "😤",
    "🐽",
    "🐽",
    "🐳",
    "🐳",
    "🧌",
    "🧌",
];

let openCards = [];

let shuffleEmojis =  emojis.sort(() => (Math.random() > 0.5) ? 2 : -1);

for(let i = 0; i < emojis.length; i++){ //nesse for cria um elemento div chamado box que é a card que contem os emojis
    let box = document.createElement("div"); 
    box.className = "card";
    box.innerHTML = shuffleEmojis[i]; //então vai pegar os valores aletório dos emojis e colocar em cada caixa
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box); //e por fim, colocar como filho da div .game
}

function handleClick(){
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }

}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    }else{
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }
    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length){
        alert("Parabéns!")
    }
}