const arrayWords = ["LARANJA", "PERA", "GOIABA", "UVA", "MANGA"];
let wordSelected = '';

const paintCell = (e) => {
  wordSelected += e.target.innerText;
  e.target.classList.add('selected');
  const li = document.querySelectorAll('li');
  for (let index = 0; index < li.length; index += 1) {
    if (wordSelected == li[index].innerText) {
      li[index].style.color = 'palevioletred'
      wordSelected = '';
    }
  }
}

//gera as linhas e preenche elas com células
const generateCells = () => {
  const matriz = document.querySelector(".matriz");
  for (let index = 0; index < 10; index += 1) {
    const line = document.createElement("div");
    line.className = "line";
    for (let index = 0; index < 10; index += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener('click', paintCell)
      line.appendChild(cell);
    }
    matriz.appendChild(line);
  }
};
generateCells();


const addWords = () => {
  //sorteando a linha
  const lines = document.querySelectorAll(".line");
  const indexLine = Math.floor(Math.random() * lines.length);

  //sorteando a palavra. indexword é o index da palavra sorteada
  const indexWord = Math.floor(Math.random() * arrayWords.length);
  const word = arrayWords[indexWord];

  //sorteando a posição da célula, sem ultrapassar
  const cells = lines[indexLine].querySelectorAll(".cell");
  const indexCell = Math.floor(
    Math.random() * (cells.length - word.length + 1)
  );

  //celula na posição que cabe ela(indexCell).innerText = palavra; preenche as celulas com as palavras;
  for (let index = 0; index < word.length; index += 1) {
    cells[indexCell + index].innerText = word[index];
  }
  //sobrescreve a classe
  lines[indexLine].className = "lineOk";
  //splice remove a partir do index selecionado
  arrayWords.splice(indexWord, 1);
};

//preencher com letras aleatórias. charAt retorna o caracter num indice especifico de uma string. retorna pra baixo um valor que ele sorteou de um total de letras.gera um valor aleatorio que envia pro charAt
const randomLetters = () => {
  const cell = document.querySelectorAll(".cell");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let index = 0; index < cell.length; index += 1) {
    if (cell[index].innerText == "") {
      const letter = letters.charAt(Math.floor(Math.random() * letters.length));
      cell[index].innerText = letter;
    }
  }
};

//cria lis com as frutas
const addList = () => {
  const ul = document.querySelector('ul');
  for(let index = 0; index < arrayWords.length; index += 1){
    const li = document.createElement('li');
    li.innerText = arrayWords[index];
    ul.appendChild(li);
  }
}

addList();

//remove as palavras ja sorteadas, para que nao se repitam;
for (let index = arrayWords.length; index > 0; index -= 1) {
  addWords();
}

randomLetters();
