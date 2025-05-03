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
const carrossel = document.querySelector(".carrossel");
const setaEsquerda = document.querySelector(".seta-esquerda");
const setaDireita = document.querySelector(".seta-direita");
let fotos = Array.from(carrossel.querySelectorAll(".foto"));

let destaqueIndex = 1; // a imagem do meio (padrão 1) é o destaque inicial

function atualizarCarrossel() {
  fotos.forEach((foto, i) => {
    foto.classList.remove("esquerda", "destaque", "direita");

    // Cálculo circular
    const esquerdaIndex = (destaqueIndex - 1 + fotos.length) % fotos.length;
    const direitaIndex = (destaqueIndex + 1) % fotos.length;

    if (i === esquerdaIndex) {
      foto.classList.add("esquerda");
    } else if (i === destaqueIndex) {
      foto.classList.add("destaque");
    } else if (i === direitaIndex) {
      foto.classList.add("direita");
    }
  });
}

// Avançar destaque
setaDireita.addEventListener("click", () => {
  destaqueIndex = (destaqueIndex + 1) % fotos.length;
  atualizarCarrossel();
});

// Voltar destaque
setaEsquerda.addEventListener("click", () => {
  destaqueIndex = (destaqueIndex - 1 + fotos.length) % fotos.length;
  atualizarCarrossel();
});

// Modal para visualização em tela cheia
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImagem");
const fecharModal = document.getElementById("fecharModal");

carrossel.addEventListener("click", (e) => {
  if (e.target.classList.contains("destaque")) {
    modal.style.display = "flex";
    modalImg.src = e.target.src;
  }
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

document.getElementById("anteriorModal").addEventListener("click", () => {
  destaqueIndex = (destaqueIndex - 1 + fotos.length) % fotos.length;
  atualizarCarrossel();
  modalImg.src = fotos[destaqueIndex].src;
});

document.getElementById("proximoModal").addEventListener("click", () => {
  destaqueIndex = (destaqueIndex + 1) % fotos.length;
  atualizarCarrossel();
  modalImg.src = fotos[destaqueIndex].src;
});

// Iniciar carrossel
atualizarCarrossel();
