document.addEventListener("DOMContentLoaded", () => {
  console.log("Site carregado com sucesso!");

  const fotos = document.querySelectorAll(".carrossel3d .foto");
  const total = fotos.length;
  let posicao = 0;

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("img-modal");
  const fechar = document.querySelector(".fechar");
  const anterior = document.getElementById("anterior");
  const proximo = document.getElementById("proximo");

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
      } else if (index === 2) {
        foto.style.transform = "translate(calc(-50% + 450px), -50%) scale(0.7) rotateY(-30deg)";
        foto.style.opacity = "0.4";
        foto.style.zIndex = "0";
      } else if (index === total - 1) {
        foto.style.transform = "translate(calc(-50% - 250px), -50%) scale(0.8) rotateY(20deg)";
        foto.style.opacity = "0.6";
        foto.style.zIndex = "1";
      } else if (index === total - 2) {
        foto.style.transform = "translate(calc(-50% - 450px), -50%) scale(0.7) rotateY(30deg)";
        foto.style.opacity = "0.4";
        foto.style.zIndex = "0";
      }
    });
  }

  // Ação para abrir o modal ao clicar na foto
  fotos.forEach((foto, index) => {
    foto.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = foto.src; // Exibe a foto no modal
    });
  });

  // Fecha o modal
  fechar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Navegação no modal: imagem anterior
  anterior.addEventListener("click", () => {
    posicao = (posicao - 1 + total) % total;
    modalImg.src = fotos[posicao].src;
  });

  // Navegação no modal: próxima imagem
  proximo.addEventListener("click", () => {
    posicao = (posicao + 1) % total;
    modalImg.src = fotos[posicao].src;
  });

  // Atualiza o carrossel ao clicar nas setas
  document.querySelector(".seta-direita").addEventListener("click", () => {
    posicao = (posicao + 1) % total;
    atualizarCarrossel();
  });

  document.querySelector(".seta-esquerda").addEventListener("click", () => {
    posicao = (posicao - 1 + total) % total;
    atualizarCarrossel();
  });

  atualizarCarrossel(); 
});
