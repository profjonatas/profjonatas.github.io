document.addEventListener("DOMContentLoaded", () => {
  console.log("Site carregado com sucesso!");

  // ====== CARROSSEL DE FOTOS (TURMA 2B) ======
  const fotos = document.querySelectorAll(".carrossel3d .foto");
  const total = fotos.length;
  let posicao = 0;

  function atualizarCarrossel() {
    fotos.forEach((foto, i) => {
      const index = (i - posicao + total) % total;

      const offset = 300;
      const scale = 0.8;
      const rotateY = 30;

      foto.style.opacity = "0";
      foto.style.transform = "translate(-50%, -50%) scale(0.5)";
      foto.classList.remove("ativa");

      if (index === 0) {
        foto.style.transform = "translate(-50%, -50%) scale(1.2)";
        foto.style.opacity = "1";
        foto.classList.add("ativa");
      } else if (index === 1) {
        foto.style.transform = `translate(calc(-50% + ${offset}px), -50%) scale(${scale}) rotateY(-${rotateY}deg)`;
        foto.style.opacity = "0.5";
      } else if (index === total - 1) {
        foto.style.transform = `translate(calc(-50% - ${offset}px), -50%) scale(${scale}) rotateY(${rotateY}deg)`;
        foto.style.opacity = "0.5";
      }
    });
  }

  document.querySelector(".seta-direita").addEventListener("click", () => {
    posicao = (posicao + 1) % total;
    atualizarCarrossel();
  });

  document.querySelector(".seta-esquerda").addEventListener("click", () => {
    posicao = (posicao - 1 + total) % total;
    atualizarCarrossel();
  });

  atualizarCarrossel();

  // ====== MODAL DE IMAGEM EM TELA CHEIA ======
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("img-modal");
  const btnFechar = document.querySelector(".fechar");
  const btnAnterior = document.getElementById("anterior");
  const btnProximo = document.getElementById("proximo");

  let indiceAtual = 0;

  function abrirModal(indice) {
    indiceAtual = indice;
    modal.style.display = "block";
    modalImg.src = fotos[indiceAtual].src;
  }

  function fecharModal() {
    modal.style.display = "none";
  }

  function mostrarAnterior() {
    indiceAtual = (indiceAtual - 1 + total) % total;
    modalImg.src = fotos[indiceAtual].src;
  }

  function mostrarProximo() {
    indiceAtual = (indiceAtual + 1) % total;
    modalImg.src = fotos[indiceAtual].src;
  }

  fotos.forEach((foto, index) => {
    foto.addEventListener("click", () => {
      abrirModal(index);
    });
  });

  btnFechar.addEventListener("click", fecharModal);
  btnAnterior.addEventListener("click", mostrarAnterior);
  btnProximo.addEventListener("click", mostrarProximo);

  window.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") mostrarAnterior();
      if (e.key === "ArrowRight") mostrarProximo();
      if (e.key === "Escape") fecharModal();
    }
  });
});
