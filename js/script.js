// Exemplo: exibir mensagem ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    console.log("Site carregado com sucesso!");
  });
  
// ====== CARROSSEL DE FOTOS (TURMA 2B) ======
const carrossel = document.querySelector(".carrossel");
const setaEsquerda = document.querySelector(".seta-esquerda");
const setaDireita = document.querySelector(".seta-direita");
let fotos = Array.from(carrossel.querySelectorAll(".foto"));

let destaqueIndex = 0; // imagem inicial em destaque

function atualizarCarrossel() {
  fotos.forEach((foto, i) => {
    foto.classList.remove("esquerda", "destaque", "direita", "invisivel");

    // Cálculo circular dos índices
    const total = fotos.length;
    const idxEsq = (destaqueIndex - 1 + total) % total;
    const idxCentro = destaqueIndex;
    const idxDir = (destaqueIndex + 1) % total;

    if (i === idxCentro) {
      foto.classList.add("destaque");
    } else if (i === idxEsq) {
      foto.classList.add("esquerda");
    } else if (i === idxDir) {
      foto.classList.add("direita");
    } else {
      foto.classList.add("invisivel");
    }
  });
}

// Setas para girar o carrossel
setaDireita.addEventListener("click", () => {
  destaqueIndex = (destaqueIndex + 1) % fotos.length;
  atualizarCarrossel();
});

setaEsquerda.addEventListener("click", () => {
  destaqueIndex = (destaqueIndex - 1 + fotos.length) % fotos.length;
  atualizarCarrossel();
});

// Modal de imagem em destaque
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

// Inicializar
atualizarCarrossel();
