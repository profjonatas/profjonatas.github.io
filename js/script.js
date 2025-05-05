document.addEventListener("DOMContentLoaded", () => {
  console.log("Site carregado com sucesso!");

  const fotos = document.querySelectorAll(".carrossel3d .foto");
  const total = fotos.length;
  let posicao = 0;

  // Modal e imagem do modal
  const modal = document.getElementById("modal");
  const modalImagem = document.getElementById("img-modal");

  function atualizarCarrossel() {
    fotos.forEach((foto, i) => {
      const index = (i - posicao + total) % total;

      foto.classList.remove("ativa");
      foto.style.opacity = "0";
      foto.style.zIndex = "0";
      foto.style.transform = "translate(-50%, -50%) scale(0.6)";

      if (index === 0) {
        // Central (ativa)
        foto.style.transform = "translate(-50%, -50%) scale(1.2)";
        foto.style.opacity = "1";
        foto.classList.add("ativa");
        foto.style.zIndex = "2";
      } else if (index === 1) {
        // Primeira à direita
        foto.style.transform = "translate(calc(-50% + 250px), -50%) scale(0.8) rotateY(-20deg)";
        foto.style.opacity = "0.6";
        foto.style.zIndex = "1";
      } else if (index === 2) {
        // Segunda à direita
        foto.style.transform = "translate(calc(-50% + 450px), -50%) scale(0.7) rotateY(-30deg)";
        foto.style.opacity = "0.4";
        foto.style.zIndex = "0";
      } else if (index === total - 1) {
        // Primeira à esquerda
        foto.style.transform = "translate(calc(-50% - 250px), -50%) scale(0.8) rotateY(20deg)";
        foto.style.opacity = "0.6";
        foto.style.zIndex = "1";
      } else if (index === total - 2) {
        // Segunda à esquerda
        foto.style.transform = "translate(calc(-50% - 450px), -50%) scale(0.7) rotateY(30deg)";
        foto.style.opacity = "0.4";
        foto.style.zIndex = "0";
      }
    });
  }

  // Função para abrir o modal com a imagem clicada
  function abrirModal(imagem) {
    modal.style.display = "block";
    modalImagem.src = imagem.src; // Atribui a imagem clicada ao modal
  }

  // Função para fechar o modal
  function fecharModal() {
    modal.style.display = "none";
  }

  // Evento de clique nas fotos para abrir o modal
  fotos.forEach(foto => {
    foto.addEventListener("click", () => {
      abrirModal(foto);
    });
  });

  // Evento de fechar o modal
  document.querySelector(".fechar").addEventListener("click", fecharModal);

  // Navegação do carrossel
  document.querySelector(".seta-direita").addEventListener("click", () => {
    posicao = (posicao + 1) % total;
    atualizarCarrossel();
  });

  document.querySelector(".seta-esquerda").addEventListener("click", () => {
    posicao = (posicao - 1 + total) % total;
    atualizarCarrossel();
  });

  atualizarCarrossel(); // ← IMPORTANTE: precisa ser chamado no carregamento
});
