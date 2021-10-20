let order = []; //ordens do jogo
let clickedOrder = []; //ordem dos cliques
let score = 0;

//0 = green, 1 = red, 2 = yellow, 3 = blue

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');

//Cria ordem aleatoria
let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    //Atribuir a cor
    order[order.length] = colorOrder;
    clickedOrder = [];

    //Acender a cor correspondente
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1); //Faz pegar o número + 1 para ele existir na lista de cores
    }
}

//Acende a proxima cor
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);

    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//Checa se os botoes sao os mesmos da ordem gerada no jogo
let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOVer();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível.`);
        nextLevel();
    }
}

//Funcao para o clique do usuario
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, (10));
}

//Funcao de criacao de elemento, retorna a cor
let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

//Avança para o proximo nivel
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//Game over
let gameOVer = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo.\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//Iniciar jogo
let playGame = () => {
    alert(`Bem vindo ao Memory Game! Iniciando novo jogo.`);
    score = 0;

    nextLevel();
}

//Eventos de click para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

//Inicio do jogo
playGame();