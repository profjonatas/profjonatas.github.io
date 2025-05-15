document.addEventListener("DOMContentLoaded", () => {
  console.log("Site carregado com sucesso!");

  const fotos = document.querySelectorAll(".carrossel3d .foto");
  const total = fotos.length;
  let posicao = 0;
  let fotoAtual = 0;

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

  // Mostrar o modal quando uma foto for clicada
  fotos.forEach(foto => {
    foto.addEventListener("click", (e) => {
      fotoAtual = parseInt(e.target.getAttribute("data-index"));
      const modal = document.getElementById("modal");
      const imgModal = document.getElementById("img-modal");
      
      // Bloquear scroll do body quando o modal estiver aberto
      document.body.style.overflow = 'hidden';
      
      imgModal.src = e.target.src;
      modal.style.display = "block";
      
      // Ajustar imagem após carregamento
      imgModal.onload = function() {
        ajustarImagemModal(imgModal);
      };
      
      // Se a imagem já estiver em cache
      if (imgModal.complete) {
        ajustarImagemModal(imgModal);
      }
    });
  });

  // Função para ajustar a imagem no modal
  function ajustarImagemModal(img) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const windowRatio = windowWidth / windowHeight;
    
    // Ajustar baseado na orientação da imagem
    if (imgRatio > windowRatio) {
      // Imagem mais larga que a janela
      img.style.maxWidth = '95vw';
      img.style.maxHeight = 'auto';
    } else {
      // Imagem mais alta que a janela
      img.style.maxHeight = '90vh';
      img.style.maxWidth = 'auto';
    }
  }

  // Fechar o modal
  document.querySelector(".fechar").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = ''; // Restaurar scroll do body
  });

  // Fechar modal ao clicar fora da imagem
  document.getElementById("modal").addEventListener("click", function(e) {
    if (e.target === this) {
      this.style.display = "none";
      document.body.style.overflow = '';
    }
  });

  // Navegar entre as fotos no modal
  document.getElementById("proximo").addEventListener("click", () => {
    fotoAtual = (fotoAtual + 1) % total;
    const imgModal = document.getElementById("img-modal");
    imgModal.src = fotos[fotoAtual].src;
    ajustarImagemModal(imgModal);
  });

  document.getElementById("anterior").addEventListener("click", () => {
    fotoAtual = (fotoAtual - 1 + total) % total;
    const imgModal = document.getElementById("img-modal");
    imgModal.src = fotos[fotoAtual].src;
    ajustarImagemModal(imgModal);
  });

  // Navegar nas setas do carrossel
  document.querySelector(".seta-direita").addEventListener("click", () => {
    posicao = (posicao + 1) % total;
    atualizarCarrossel();
  });

  document.querySelector(".seta-esquerda").addEventListener("click", () => {
    posicao = (posicao - 1 + total) % total;
    atualizarCarrossel();
  });

  // Navegação com teclado
  document.addEventListener("keydown", (event) => {
    const modal = document.getElementById("modal");
    const imgModal = document.getElementById("img-modal");
    
    if (event.key === "ArrowLeft") {
      if (modal.style.display === "block") {
        fotoAtual = (fotoAtual - 1 + total) % total;
        imgModal.src = fotos[fotoAtual].src;
        ajustarImagemModal(imgModal);
      } else {
        posicao = (posicao - 1 + total) % total;
        atualizarCarrossel();
      }
    } else if (event.key === "ArrowRight") {
      if (modal.style.display === "block") {
        fotoAtual = (fotoAtual + 1) % total;
        imgModal.src = fotos[fotoAtual].src;
        ajustarImagemModal(imgModal);
      } else {
        posicao = (posicao + 1) % total;
        atualizarCarrossel();
      }
    } else if (event.key === "Escape") {
      if (modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = '';
      }
    }
  });

  // Redimensionar a imagem quando a janela for redimensionada
  window.addEventListener('resize', function() {
    const modal = document.getElementById("modal");
    const imgModal = document.getElementById("img-modal");
    
    if (modal.style.display === "block" && imgModal) {
      ajustarImagemModal(imgModal);
    }
  });

  atualizarCarrossel();
});