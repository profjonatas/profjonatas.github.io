document.addEventListener("DOMContentLoaded", () => {
  console.log("Site carregado com sucesso!");

  const fotos = document.querySelectorAll(".carrossel3d .foto");
  const total = fotos.length;
  let posicao = 0;

  function atualizarCarrossel() {
    fotos.forEach((foto, i) => {
      const index = (i - posicao + total) % total;

      foto.classList.remove("ativa");
      foto.style.opacity = "0";
      foto.style.zIndex = "0";
      foto.style.transform = "translate(-50%, -50%) scale(0.6)";

      if (index === 0) {
        foto.style.transform = "translate(-50%, -50%) scale(1.2)";
        foto.style.opacity = "1";
        foto.classList.add("ativa");
        foto.style.zIndex = "2";
      } else if (index === 1) {
        foto.style.transform = "translate(calc(-50% + 250px), -50%) scale(0.8) rotateY(-20deg)";
        foto.style.opacity = "0.6";
        foto.style.zIndex = "1";
      } else if (index === total - 1) {
        foto.style.transform = "translate(calc(-50% - 250px), -50%) scale(0.8) rotateY(20deg)";
        foto.style.opacity = "0.6";
        foto.style.zIndex = "1";
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

  // ====== MODAL ======
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("img-modal");
  const btnFechar = document.querySelector(".fechar");
  const btnAnterior = document.getElementById("anterior");
  const btnProximo = document.getElementById("proximo");
  let indiceAtual = 0;

  fotos.forEach((foto, index) => {
    foto.addEventListener("click", () => {
      indiceAtual = index;
      modal.style.display = "block";
      modalImg.src = fotos[indiceAtual].src;
    });
  });

  btnFechar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  btnAnterior.addEventListener("click", () => {
    indiceAtual = (indiceAtual - 1 + total) % total;
    modalImg.src = fotos[indiceAtual].src;
  });

  btnProximo.addEventListener("click", () => {
    indiceAtual = (indiceAtual + 1) % total;
    modalImg.src = fotos[indiceAtual].src;
  });

  window.addEventListener("keydown", (e) => {
    if (modal.style.display === "block") {
      if (e.key === "ArrowLeft") btnAnterior.click();
      if (e.key === "ArrowRight") btnProximo.click();
      if (e.key === "Escape") modal.style.display = "none";
    }
  });
});
