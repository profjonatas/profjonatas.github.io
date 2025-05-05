// Mensagem de carregamento no console
document.addEventListener("DOMContentLoaded", () => {
  console.log("Site carregado com sucesso!");
});

// ====== CARROSSEL DE FOTOS (TURMA 2B) ======

// Seleciona todas as imagens do carrossel
const fotos = document.querySelectorAll(".carrossel3d .foto");
const total = fotos.length;
let posicao = 0;

// Parâmetros de estilo reutilizáveis
const OFFSET = 300;       // Distância entre as fotos lateralmente
const SCALE = 0.8;        // Escala das fotos laterais
const ROTATE_Y = 30;      // Ângulo de rotação das fotos laterais

// Atualiza o carrossel com base na posição atual
function atualizarCarrossel() {
  fotos.forEach((foto, i) => {
    // Calcula a posição relativa de cada foto
    const index = (i - posicao + total) % total;

    // Reseta estilos da foto
    foto.style.opacity = "0";
    foto.style.transform = "translate(-50%, -50%) scale(0.5)";
    foto.classList.remove("ativa");

    // Define estilo para a foto principal
    if (index === 0) {
      foto.style.transform = "translate(-50%, -50%) scale(1.2)";
      foto.style.opacity = "1";
      foto.classList.add("ativa");

    // Define estilo para a próxima foto (direita)
    } else if (index === 1) {
      foto.style.transform = `translate(calc(-50% + ${OFFSET}px), -50%) scale(${SCALE}) rotateY(-${ROTATE_Y}deg)`;
      foto.style.opacity = "0.5";

    // Define estilo para a anterior (esquerda)
    } else if (index === total - 1) {
      foto.style.transform = `translate(calc(-50% - ${OFFSET}px), -50%) scale(${
