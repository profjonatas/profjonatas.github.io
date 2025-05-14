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
  // Mostrar o modal quando uma foto for clicada
fotos.forEach(foto => {
  foto.addEventListener("click", (e) => {
    fotoAtual = parseInt(e.target.getAttribute("data-index"));
    const modal = document.getElementById("modal");
    const imgModal = document.getElementById("img-modal");
    
    // Resetar estilos da imagem para mobile
    imgModal.style.maxWidth = '';
    imgModal.style.maxHeight = '';
    
    imgModal.src = e.target.src;
    modal.style.display = "block";
    
    // Forçar redimensionamento após carregamento
    imgModal.onload = function() {
      ajustarImagemModal(imgModal);
    };
    
    // Verificar se já está carregada (cache)
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
  
  // Ajustar baseado na orientação da imagem
  if (imgRatio > 1) {
    // Imagem horizontal
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '';
  } else {
    // Imagem vertical
    img.style.maxHeight = '80vh';
    img.style.maxWidth = '';
  }
}

// Adicionar evento de redimensionamento da janela
window.addEventListener('resize', function() {
  const imgModal = document.getElementById("img-modal");
  if (imgModal && document.getElementById("modal").style.display === "block") {
    ajustarImagemModal(imgModal);
  }
});

  // Fechar o modal
  document.querySelector(".fechar").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";

    // Mostra o cabeçalho novamente
   // document.body.classList.remove("modal-ativa");
  });

  // Navegar entre as fotos no modal
  document.getElementById("proximo").addEventListener("click", () => {
    fotoAtual = (fotoAtual + 1) % total;
    document.getElementById("img-modal").src = fotos[fotoAtual].src;
  });

  document.getElementById("anterior").addEventListener("click", () => {
    fotoAtual = (fotoAtual - 1 + total) % total;
    document.getElementById("img-modal").src = fotos[fotoAtual].src;
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
    if (event.key === "ArrowLeft") {
      if (document.getElementById("modal").style.display === "block") {
        fotoAtual = (fotoAtual - 1 + total) % total;
        document.getElementById("img-modal").src = fotos[fotoAtual].src;
      } else {
        posicao = (posicao - 1 + total) % total;
        atualizarCarrossel();
      }
    } else if (event.key === "ArrowRight") {
      if (document.getElementById("modal").style.display === "block") {
        fotoAtual = (fotoAtual + 1) % total;
        document.getElementById("img-modal").src = fotos[fotoAtual].src;
      } else {
        posicao = (posicao + 1) % total;
        atualizarCarrossel();
      }
    } else if (event.key === "Escape") {
      document.getElementById("modal").style.display = "none";

      // Também reexibe o cabeçalho ao fechar com ESC
      document.body.classList.remove("modal-ativa");
    }
  });

  atualizarCarrossel();
});
