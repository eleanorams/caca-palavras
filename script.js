const arrayWords = ["LARANJA", "PERA", "GOIABA", "UVA", "MANGA"];
let wordSelected = "";

const paintCell = (e) => {
  wordSelected += e.target.innerText;
  e.target.classList.add("selected");
  const li = document.querySelectorAll("li");
  for (let index = 0; index < li.length; index += 1) {
    if (wordSelected == li[index].innerText) {
      const selected = document.querySelectorAll(".selected");
      for (let index2 = 0; index2 < selected.length; index2 += 1) {
        selected[index2].classList.remove("selected");
        selected[index2].classList.add("found");
      }
      li[index].classList.add("liFound");
      wordSelected = "";
    }
  }
  saveGame();
};

const saveGame = () => {
  const matriz = document.querySelector(".matriz");
  localStorage.setItem("matrizKey", matriz.innerHTML);

  const listItens = document.querySelector("ul");
  localStorage.setItem("listKey", listItens.innerHTML);
};

const loadGame = () => {
  const matriz = document.querySelector(".matriz");
  matriz.innerHTML = localStorage.getItem("matrizKey");

  const listItens = document.querySelector("ul");
  listItens.innerHTML = localStorage.getItem("listKey");

  const cells = document.querySelectorAll(".cell");
  for (let index = 0; index < cells.length; index += 1) {
    cells[index].addEventListener("click", paintCell);
  }
};

//gera as linhas e preenche elas com células
const generateCells = () => {
  const matriz = document.querySelector(".matriz");
  for (let index = 0; index < 10; index += 1) {
    const line = document.createElement("div");
    line.className = "line";
    for (let index1 = 0; index1 < 10; index1 += 1) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.addEventListener("click", paintCell);
      line.appendChild(cell);
    }
    matriz.appendChild(line);
  }
};

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
  const ul = document.querySelector("ul");
  for (let index = 0; index < arrayWords.length; index += 1) {
    const li = document.createElement("li");
    li.innerText = arrayWords[index];
    ul.appendChild(li);
  }
};

const clear = () => {
  const btnClear = document.querySelector(".btn-clear");
  btnClear.addEventListener("click", () => {
    const selected = document.querySelectorAll(".cell");
    for (let index = 0; index < selected.length; index += 1) {
      selected[index].classList.remove("selected");
    }
    wordSelected = "";
  });
};
clear();

const restart = () => {
  const btnRestart = document.querySelector(".btn-restart");
  btnRestart.addEventListener("click", () => {
    localStorage.clear();
    document.location.reload();
  });
};

restart();

const startGame = () => {
  if (localStorage.getItem("matrizKey")) {
    loadGame();
  } else {
    generateCells();
    addList();
    //remove as palavras ja sorteadas, para que nao se repitam;
    for (let index = arrayWords.length; index > 0; index -= 1) {
      addWords();
    }
    randomLetters();
  }
};

startGame();
