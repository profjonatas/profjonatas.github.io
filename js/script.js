document.addEventListener("DOMContentLoaded", () => {
  console.log("Site carregado com sucesso!");
  alert("meu nome e leo")
  const fotos = document.querySelectorAll(".carrossel3d .foto");
  const total = fotos.length;
  let posicao = 0;
  let fotoAtual = 0;
  const isMobile = window.innerWidth <= 768;

  function atualizarCarrossel() {
    fotos.forEach((foto, i) => {
      const index = (i - posicao + total) % total;

      if (isMobile) {
        // Modo mobile - apenas mostra/oculta
        foto.classList.remove("ativa");
        foto.style.opacity = "0";
        foto.style.transform = "translate(-50%, -50%) scale(0.9)";
        
        if (index === 0) {
          foto.classList.add("ativa");
          foto.style.opacity = "1";
          foto.style.transform = "translate(-50%, -50%) scale(1)";
        }
      } else {
        // Modo desktop - efeito 3D completo
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
      }
    });
  }

  // Mostrar o modal quando uma foto for clicada
  fotos.forEach(foto => {
    foto.addEventListener("click", (e) => {
      fotoAtual = parseInt(e.target.getAttribute("data-index"));
      const modal = document.getElementById("modal");
      const imgModal = document.getElementById("img-modal");
      
      // Resetar estilos
      imgModal.style.maxWidth = 'none';
      imgModal.style.maxHeight = 'none';
      imgModal.style.width = 'auto';
      imgModal.style.height = 'auto';
      
      imgModal.src = e.target.src;
      modal.style.display = "block";
      document.body.style.overflow = 'hidden';
      
      // Ajustar após carregamento
      imgModal.onload = function() {
        ajustarImagemModal(imgModal);
      };
      
      if (imgModal.complete) ajustarImagemModal(imgModal);
    });
  });

  // Função para ajustar a imagem no modal
  function ajustarImagemModal(img) {
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const windowRatio = windowWidth / windowHeight;
    
    // Resetar estilos primeiro
    img.style.maxWidth = 'none';
    img.style.maxHeight = 'none';
    img.style.width = 'auto';
    img.style.height = 'auto';
    
    if (imgRatio > windowRatio) {
      // Imagem mais larga que a tela
      img.style.width = '95vw';
      img.style.height = 'auto';
      img.style.margin = '5vh auto';
    } else {
      // Imagem mais alta que a tela
      img.style.height = '90vh';
      img.style.width = 'auto';
      img.style.margin = '5vh auto';
    }
  }

  // Fechar o modal
  document.querySelector(".fechar").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = '';
  });

  // Fechar ao clicar fora
  document.getElementById("modal").addEventListener("click", function(e) {
    if (e.target === this) {
      this.style.display = "none";
      document.body.style.overflow = '';
    }
  });

  // Navegação entre fotos no modal
  document.getElementById("proximo").addEventListener("click", (e) => {
    e.stopPropagation();
    fotoAtual = (fotoAtual + 1) % total;
    const imgModal = document.getElementById("img-modal");
    imgModal.src = fotos[fotoAtual].src;
    imgModal.onload = function() {
      ajustarImagemModal(imgModal);
    };
    if (imgModal.complete) ajustarImagemModal(imgModal);
  });

  document.getElementById("anterior").addEventListener("click", (e) => {
    e.stopPropagation();
    fotoAtual = (fotoAtual - 1 + total) % total;
    const imgModal = document.getElementById("img-modal");
    imgModal.src = fotos[fotoAtual].src;
    imgModal.onload = function() {
      ajustarImagemModal(imgModal);
    };
    if (imgModal.complete) ajustarImagemModal(imgModal);
  });

  // Navegação do carrossel
  document.querySelector(".seta-direita").addEventListener("click", () => {
    posicao = (posicao + 1) % total;
    atualizarCarrossel();
  });

  document.querySelector(".seta-esquerda").addEventListener("click", () => {
    posicao = (posicao - 1 + total) % total;
    atualizarCarrossel();
  });

  // Teclado
  document.addEventListener("keydown", (event) => {
    const modal = document.getElementById("modal");
    
    if (event.key === "ArrowLeft") {
      if (modal.style.display === "block") {
        document.getElementById("anterior").click();
      } else {
        posicao = (posicao - 1 + total) % total;
        atualizarCarrossel();
      }
    } else if (event.key === "ArrowRight") {
      if (modal.style.display === "block") {
        document.getElementById("proximo").click();
      } else {
        posicao = (posicao + 1) % total;
        atualizarCarrossel();
      }
    } else if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = '';
    }
  });

  // Redimensionamento
  window.addEventListener('resize', function() {
    const imgModal = document.getElementById("img-modal");
    if (imgModal && document.getElementById("modal").style.display === "block") {
      ajustarImagemModal(imgModal);
    }
  });

  // Inicialização
  atualizarCarrossel();
});