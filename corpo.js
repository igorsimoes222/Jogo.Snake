let canvas = document.getElementById('snake');
let pontosTela = document.querySelector('.pontuacao');
let finalJogo = document.querySelector('.fim');
let pontos = 0;
let context = canvas.getContext('2d');
let box = 32;
let snake = [];
var hh = 0;
var mm = 0;
var ss = 0;

let tempo = 120;//Quantos milésimos valem 1 segundo?

var cron;



snake[0] = {
  x: 4 * box,

  y: 8 * box
};
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
};
let direction = 'center ';


// criar o mapa 
function criarBG() {

  context.fillStyle = 'black';
  context.fillRect(0, 0, 16.5 * box, 16.5 * box);

}
// placar
function placar() {
  pontos++;
  pontosTela.innerHTML = pontos;
  pontos.innerHTML = pontos;
  placar + pontosTela;

}
// mensagem de pontuaçao


// criando a cobra
function criarCobrinha() {
  for (i = 0; i < snake.length; i++) {
    if (i % 2 == 0) {
      context.fillStyle = 'red';
    } else {
      context.fillStyle = 'white';
    }

    context.fillRect(snake[i].x, snake[i].y, box, box);
  }
}
// quando ele bater na sua propia calda
function choque() {
  for (i = 0; i < snake.length; i++) {
    if (i % 2 == 0) {
      context.fillStyle = 'red';
    } else {
      context.fillStyle = 'darkred';

    }
    context.fillRect(snake[i].x, snake[i].y, box, box);

    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  document.getElementById('counter').innerText = '00:00:00';
}
function msgFinal() {


  alert("SUA PONTUAÇAO FOI DE  " + pontos);
  alert("SEU RECORDE FOI DE " + hh + " " + "horas" + " " + mm + " " + "minutos" + "  " + ss + " " + "segundos");



}



//Faz a contagem do tempo e exibição
function timer() {
  ss++; //Incrementa +1 na variável ss

  if (ss == 59) { //Verifica se deu 59 segundos
    ss = 0; //Volta os segundos para 0
    mm++; //Adiciona +1 na variável mm

  } if (mm == 59) {
    mm = 0;
    hh++;

  }

  //Cria uma variável com o valor tratado HH:MM:SS
  var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

  //Insere o valor tratado no elemento counter
  document.getElementById('counter').innerText = format;

  //Retorna o valor tratado
  return format;
}
// desenho da comida começa aqui
function desenhaComida() {

  context.fillStyle = 'darkgreen';
  context.fillRect(food.x, food.y, box, box);

}

document.addEventListener('keydown', update)
  ;
// declarando as direçoes no teclado
function update(event) {
  if (event.key == 'ArrowLeft' && direction !== 'right') direction = 'left';
  if (event.key == 'ArrowUp' && direction !== 'down') direction = 'up';
  if (event.key == 'ArrowRight' && direction !== 'left') direction = 'right';
  if (event.key == 'ArrowDown' && direction !== 'up') direction = 'down';
}
// funcoes para inico de jogo
function iniciarJogo() {
  if (snake[0].x > 15 * box && direction == 'center') snake[0].x = 0;
  if (snake[0].y > 15 * box && direction == 'down') snake[0].y = 0;
  if (snake[0].x < 0 * box && direction == 'left') snake[0].x = 15 * box;
  if (snake[0].y < 0 * box && direction == 'up') snake[0].y = 15 * box;

  criarBG();

  criarCobrinha();
  desenhaComida();

  for (i = 1; i < snake.length; i++) {
    if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
      msgFinal();
      choque();
      clearInterval(jogo);
      watch();

      cron();

    }
    timer();
  }
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if (direction == 'right') snakeX += box;
  if (direction == 'left') snakeX -= box;
  if (direction == 'up') snakeY -= box;
  if (direction == 'down') snakeY += box;

  if (snakeX != food.x || snakeY != food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 15 + 1) * box;
    food.y = Math.floor(Math.random() * 15 + 1) * box;
    placar();

  } if (placar <= snakeX && snakeY) {


  }

  let newHead = {
    x: snakeX,
    y: snakeY
  };
  snake.unshift(newHead);
}






//Inicia o temporizador
let jogo = setInterval(iniciarJogo, 100);