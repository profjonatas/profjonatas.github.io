// Exemplo: exibir mensagem ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    console.log("Site carregado com sucesso!");
  });
  
// ====== CARROSSEL DE FOTOS (TURMA 2B) ======
const fotos = document.querySelectorAll('.foto');
const setaEsq = document.querySelector('.seta.esquerda');
const setaDir = document.querySelector('.seta.direita');
let index = 0;

function atualizarCarrossel() {
  fotos.forEach((foto, i) => {
    foto.classList.remove('destaque');
    foto.style.order = (i - index + fotos.length) % fotos.length;
  });
  fotos[index].classList.add('destaque');
}

setaDir.addEventListener('click', () => {
  index = (index + 1) % fotos.length;
  atualizarCarrossel();
});

setaEsq.addEventListener('click', () => {
  index = (index - 1 + fotos.length) % fotos.length;
  atualizarCarrossel();
});

atualizarCarrossel();

// ====== MODAL DE TELA CHEIA ======
const modal = document.getElementById("modal");
const modalImg = document.getElementById("img-modal");
const fechar = document.querySelector(".fechar");
const btnAnterior = document.getElementById("anterior");
const btnProximo = document.getElementById("proximo");

function abrirModal(i) {
  index = i;
  modal.style.display = "flex";
  modalImg.src = fotos[index].src;
}

fotos.forEach((foto, i) => {
  foto.addEventListener("click", () => abrirModal(i));
});

fechar.onclick = () => {
  modal.style.display = "none";
};

btnAnterior.onclick = () => {
  index = (index - 1 + fotos.length) % fotos.length;
  modalImg.src = fotos[index].src;
};

btnProximo.onclick = () => {
  index = (index + 1) % fotos.length;
  modalImg.src = fotos[index].src;
};
