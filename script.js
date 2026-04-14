// ===========================
// DADOS DINÂMICOS
// ===========================

// Dados dos cards de impactos
const impactos = [
    {
        titulo: "Perda de Biodiversidade",
        descricao: "O desmatamento destrói habitats naturais, ameaçando inúmeras espécies de animais e plantas."
    },
    {
        titulo: "Mudanças Climáticas",
        descricao: "A redução das florestas aumenta a emissão de CO₂ e contribui para o aquecimento global."
    },
    {
        titulo: "Erosão do Solo",
        descricao: "Sem árvores, o solo fica exposto, aumentando a erosão e a desertificação."
    }
];

// Dados do carrossel (galeria)
const galerias = [
    { imagem: "https://source.unsplash.com/800x400/?forest", alt: "Floresta Verde" },
    { imagem: "https://source.unsplash.com/800x400/?deforestation", alt: "Desmatamento" },
    { imagem: "https://source.unsplash.com/800x400/?tree", alt: "Árvores" }
];

// Dados do FAQ (acordeão)
const faqs = [
    { pergunta: "O que é desmatamento?", resposta: "Desmatamento é a remoção total ou parcial de vegetação nativa de uma área." },
    { pergunta: "Quais os principais impactos?", resposta: "Impactos incluem perda de biodiversidade, mudanças climáticas e erosão do solo." },
    { pergunta: "Como podemos ajudar?", resposta: "Apoiar reflorestamento, reduzir consumo de produtos ligados ao desmatamento e conscientizar outros." }
];

// ===========================
// FUNÇÃO DE RENDERIZAÇÃO
// ===========================

// Renderizar cards de impactos
function renderImpactos() {
    const container = document.getElementById('impact-cards');
    impactos.forEach(impacto => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h3>${impacto.titulo}</h3><p>${impacto.descricao}</p>`;
        container.appendChild(card);
    });
}

// Renderizar carrossel
function renderGaleria() {
    const track = document.querySelector('.carousel-track');
    galerias.forEach(item => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = `<img src="${item.imagem}" alt="${item.alt}">`;
        track.appendChild(slide);
    });
}

// Renderizar FAQ
function renderFAQ() {
    const container = document.getElementById('faq-container');
    faqs.forEach((faq, index) => {
        const item = document.createElement('div');
        item.classList.add('accordion-item');
        item.innerHTML = `
            <button class="accordion-header" aria-expanded="false" aria-controls="faq${index}">${faq.pergunta}</button>
            <div class="accordion-content" id="faq${index}"><p>${faq.resposta}</p></div>
        `;
        container.appendChild(item);
    });
}

// ===========================
// ACESSIBILIDADE
// ===========================

// Alternar alto contraste
document.getElementById('contrast-toggle').addEventListener('click', () => {
    document.body.classList.toggle('high-contrast');
});

// Ajustar tamanho da fonte
function ajustarFonte(delta) {
    const html = document.documentElement;
    const current = parseFloat(getComputedStyle(html).fontSize);
    html.style.fontSize = `${current + delta}px`;
}

document.getElementById('increase-font').addEventListener('click', () => ajustarFonte(2));
document.getElementById('decrease-font').addEventListener('click', () => ajustarFonte(-2));

// ===========================
// ACORDEÃO (FAQ)
// ===========================
function setupAccordion() {
    const headers = document.querySelectorAll('.accordion-header');
    headers.forEach(header => {
        header.addEventListener('click', () => {
            const expanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !expanded);
            const content = header.nextElementSibling;
            if (!expanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = null;
            }
        });
    });
}

// ===========================
// CARROSSEL
// ===========================
function setupCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let index = 0;

    function updateCarousel() {
        const width = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * width}px)`;
    }

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        updateCarousel();
    });

    // Responsivo
    window.addEventListener('resize', updateCarousel);
}

// ===========================
// SCROLL REVEAL SIMPLES
// ===========================
function scrollReveal() {
    const sections = document.querySelectorAll('main section');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));
}

// ===========================
// INICIALIZAÇÃO
// ===========================
function init() {
    renderImpactos();
    renderGaleria();
    renderFAQ();
    setupAccordion();
    setupCarousel();
    scrollReveal();
}

document.addEventListener('DOMContentLoaded', init);
